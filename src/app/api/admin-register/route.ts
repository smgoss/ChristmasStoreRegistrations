import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { z } from 'zod';
import { ensureAmplifyConfigured } from '@/lib/amplify';

// Validation schema for admin registration
const AdminRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be 50 characters or less'),
  email: z.string().email('Valid email is required').max(100, 'Email must be 100 characters or less'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number must be 20 characters or less'),
  streetAddress: z.string().min(1, 'Street address is required').max(100, 'Street address must be 100 characters or less'),
  city: z.string().min(1, 'City is required').max(50, 'City must be 50 characters or less'),
  state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 digits').max(10, 'Zip code must be 10 characters or less'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  numberOfKids: z.number().min(0, 'Number of kids must be 0 or more').max(20, 'Number of kids must be 20 or less'),
  children: z.array(z.object({
    age: z.string().min(1, 'Child age is required'),
    gender: z.enum(['boy', 'girl'], { required_error: 'Child gender is required' })
  })).optional(),
  referredBy: z.string().max(100, 'Referred by must be 100 characters or less').optional()
});

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Admin registration request received');
    
    const body = await request.json();
    console.log('📝 Request body:', { ...body, phone: '***REDACTED***' });

    // Validate request data
    let validatedData;
    try {
      validatedData = AdminRegistrationSchema.parse(body);
    } catch (error) {
      console.error('❌ Validation failed:', error);
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Request validation failed', 
            errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Initialize Amplify client
    await ensureAmplifyConfigured();
    const client = generateClient<Schema>({ authMode: 'apiKey' });

    // Check for duplicate email
    console.log('🔍 Checking for duplicate email...');
    const { data: existingRegistrations } = await client.models.Registration.list({
      filter: { email: { eq: validatedData.email } }
    });

    if (existingRegistrations && existingRegistrations.length > 0) {
      return NextResponse.json(
        { success: false, message: 'A registration with this email already exists' },
        { status: 409 }
      );
    }

    // Check for duplicate phone in registrations
    const { data: existingPhoneRegs } = await client.models.Registration.list({
      filter: { phone: { eq: validatedData.phone } }
    });

    if (existingPhoneRegs && existingPhoneRegs.length > 0) {
      return NextResponse.json(
        { success: false, message: 'A registration with this phone number already exists' },
        { status: 409 }
      );
    }

    // Check waitlist for duplicate email/phone
    try {
      const { data: waitlistData } = await client.models.Waitlist.list();
      
      if (waitlistData) {
        const duplicateEmail = waitlistData.find(entry => entry.email === validatedData.email);
        const duplicatePhone = waitlistData.find(entry => entry.phone === validatedData.phone);
        
        if (duplicateEmail) {
          return NextResponse.json(
            { success: false, message: 'This email is already on the waitlist' },
            { status: 409 }
          );
        }
        
        if (duplicatePhone) {
          return NextResponse.json(
            { success: false, message: 'This phone number is already on the waitlist' },
            { status: 409 }
          );
        }
      }
    } catch (waitlistError) {
      console.log('ℹ️ Waitlist model not available for duplicate checking:', waitlistError);
    }

    // Get current time slot configuration
    const { data: timeSlotData } = await client.models.TimeSlotConfig.list({
      filter: { timeSlot: { eq: validatedData.timeSlot } }
    });

    const timeSlotConfig = timeSlotData?.[0];
    
    if (!timeSlotConfig) {
      return NextResponse.json(
        { success: false, message: 'Selected time slot not found' },
        { status: 400 }
      );
    }

    // Check if time slot is at capacity and increase if needed
    const currentRegistrations = timeSlotConfig.currentRegistrations || 0;
    const maxCapacity = timeSlotConfig.maxCapacity || 0;
    
    if (currentRegistrations >= maxCapacity) {
      console.log(`📈 Time slot ${validatedData.timeSlot} is at capacity (${currentRegistrations}/${maxCapacity}). Increasing capacity by 1.`);
      
      // Increase capacity by 1
      await client.models.TimeSlotConfig.update({
        id: timeSlotConfig.id,
        maxCapacity: maxCapacity + 1
      });
    }

    // Create the registration
    console.log('✅ Creating registration...');
    const { data: newRegistration } = await client.models.Registration.create({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      streetAddress: validatedData.streetAddress,
      city: validatedData.city,
      state: validatedData.state,
      zipCode: validatedData.zipCode,
      timeSlot: validatedData.timeSlot,
      numberOfKids: validatedData.numberOfKids,
      referredBy: validatedData.referredBy || undefined,
      registrationStatus: 'registered',
      isConfirmed: true, // Admin registrations are automatically confirmed
      registrationDate: new Date().toISOString()
    });

    if (!newRegistration) {
      throw new Error('Failed to create registration');
    }

    // Create children records
    if (validatedData.children && validatedData.children.length > 0) {
      console.log('👶 Creating child records...');
      for (const child of validatedData.children) {
        await client.models.Child.create({
          registrationId: newRegistration.id,
          age: child.age,
          gender: child.gender
        });
      }
    }

    // Update time slot current registrations count
    await client.models.TimeSlotConfig.update({
      id: timeSlotConfig.id,
      currentRegistrations: currentRegistrations + 1
    });

    // Send confirmation email
    console.log('📧 Sending confirmation email...');
    try {
      const emailResult = await client.mutations.sendConfirmationEmail({
        registration: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          streetAddress: validatedData.streetAddress,
          zipCode: validatedData.zipCode,
          city: validatedData.city,
          state: validatedData.state,
          timeSlot: validatedData.timeSlot,
          numberOfKids: validatedData.numberOfKids,
          referredBy: validatedData.referredBy,
          children: JSON.stringify(validatedData.children || [])
        }
      });
      console.log('✅ Email sent result:', emailResult);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
    }

    // Send SMS confirmation
    console.log('📱 Sending SMS confirmation...');
    try {
      const smsResult = await client.mutations.sendSmsConfirmation({
        registration: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          streetAddress: validatedData.streetAddress,
          zipCode: validatedData.zipCode,
          city: validatedData.city,
          state: validatedData.state,
          timeSlot: validatedData.timeSlot,
          numberOfKids: validatedData.numberOfKids,
          referredBy: validatedData.referredBy,
          registrationDate: new Date().toISOString()
        }
      });
      console.log('✅ SMS sent result:', smsResult);
    } catch (smsError) {
      console.error('❌ SMS sending failed:', smsError);
    }

    console.log('🎉 Admin registration completed successfully');
    return NextResponse.json({
      success: true,
      message: 'Registration created successfully',
      registrationId: newRegistration.id
    });

  } catch (error) {
    console.error('❌ Admin registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create registration', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}