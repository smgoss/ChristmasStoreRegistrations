import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';

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
    console.log('🔧 [Gray Branch] Fixing time slot isActive flags...');

    const amplifyClient = await getClient();

    // Get all existing time slots
    const { data: existingSlots } = await amplifyClient.models.TimeSlotConfig.list();
    console.log('📋 [Gray Branch] Found time slots:', existingSlots?.length || 0);
    
    const results = [];
    for (const slot of existingSlots || []) {
      console.log(`🔍 Slot ${slot.timeSlot}: isActive = ${slot.isActive}, maxCapacity = ${slot.maxCapacity}`);
      
      // Update slot to be active if it's not explicitly active
      if (slot.isActive !== true) {
        console.log(`🔧 Updating ${slot.timeSlot} to isActive: true`);
        
        const result = await amplifyClient.models.TimeSlotConfig.update({
          id: slot.id,
          isActive: true
        });
        
        if (result.errors) {
          console.error(`❌ Error updating ${slot.timeSlot}:`, result.errors);
        } else {
          console.log(`✅ Updated ${slot.timeSlot} successfully`);
          results.push(result.data);
        }
      } else {
        console.log(`✅ ${slot.timeSlot} already active`);
        results.push(slot);
      }
    }

    console.log('🎉 [Gray Branch] Time slot fix complete!');

    return NextResponse.json({
      success: true,
      message: `Fixed ${results.length} time slots - all now active`,
      timeSlots: results,
      environment: 'gray'
    });

  } catch (error) {
    console.error('❌ [Gray Branch] Error fixing time slots:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: 'gray'
    }, { status: 500 });
  }
}