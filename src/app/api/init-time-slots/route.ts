import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { TIME_SLOTS, DEFAULT_CAPACITY } from '@/config/locationConfig';

let client: ReturnType<typeof generateClient<Schema>> | null = null;

const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 [Gray Branch] Initializing time slots...');
    console.log('📋 TIME_SLOTS from config:', TIME_SLOTS);
    console.log('📊 DEFAULT_CAPACITY:', DEFAULT_CAPACITY);

    const amplifyClient = await getClient();

    // Check if time slots already exist
    const { data: existingSlots } = await amplifyClient.models.TimeSlotConfig.list();
    console.log('📋 [Gray Branch] Existing slots found:', existingSlots?.length || 0);

    // Find which time slots are missing
    const existingTimeSlots = existingSlots?.map(slot => slot.timeSlot) || [];
    const missingTimeSlots = TIME_SLOTS.filter(slot => !existingTimeSlots.includes(slot));
    
    console.log('📋 [Gray Branch] Existing time slots:', existingTimeSlots);
    console.log('🔍 [Gray Branch] Missing time slots:', missingTimeSlots);

    if (missingTimeSlots.length === 0) {
      return NextResponse.json({
        success: true,
        message: `All time slots already exist (${existingSlots?.length || 0} slots found)`,
        timeSlots: existingSlots
      });
    }

    // Create missing time slots
    const results = [];
    for (const timeSlot of missingTimeSlots) {
      console.log(`⏰ [Gray Branch] Creating time slot: ${timeSlot} with capacity ${DEFAULT_CAPACITY}`);
      
      const result = await amplifyClient.models.TimeSlotConfig.create({
        timeSlot: timeSlot,
        maxCapacity: DEFAULT_CAPACITY,
        currentRegistrations: 0,
        isActive: true
      });

      if (result.errors) {
        console.error(`❌ [Gray Branch] Error creating ${timeSlot}:`, result.errors);
      } else {
        console.log(`✅ [Gray Branch] Created ${timeSlot} successfully`);
        results.push(result.data);
      }
    }

    console.log('🎉 [Gray Branch] Time slot initialization complete!');

    return NextResponse.json({
      success: true,
      message: `Successfully initialized ${results.length} time slots for gray branch`,
      timeSlots: results,
      environment: 'gray'
    });

  } catch (error) {
    console.error('❌ [Gray Branch] Error initializing time slots:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: 'gray'
    }, { status: 500 });
  }
}