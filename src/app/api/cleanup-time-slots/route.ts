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
    console.log('🧹 [Gray Branch] Cleaning up invalid time slots...');

    const amplifyClient = await getClient();

    // Get all existing time slots
    const { data: existingSlots } = await amplifyClient.models.TimeSlotConfig.list();
    console.log('📋 [Gray Branch] Found time slots:', existingSlots?.length || 0);
    
    const invalidSlots = [];
    const validSlots = [];
    
    for (const slot of existingSlots || []) {
      if (!slot || !slot.timeSlot || typeof slot.timeSlot !== 'string' || slot.timeSlot.trim() === '') {
        console.log(`❌ Invalid slot found:`, slot);
        invalidSlots.push(slot);
      } else {
        console.log(`✅ Valid slot: ${slot.timeSlot} (isActive: ${slot.isActive})`);
        validSlots.push(slot);
      }
    }

    console.log(`📊 Found ${validSlots.length} valid slots and ${invalidSlots.length} invalid slots`);

    // Delete invalid slots
    const deletedSlots = [];
    for (const invalidSlot of invalidSlots) {
      if (invalidSlot?.id) {
        try {
          console.log(`🗑️ Deleting invalid slot with ID: ${invalidSlot.id}`);
          const result = await amplifyClient.models.TimeSlotConfig.delete({ id: invalidSlot.id });
          
          if (result.errors) {
            console.error(`❌ Error deleting invalid slot:`, result.errors);
          } else {
            console.log(`✅ Deleted invalid slot successfully`);
            deletedSlots.push(invalidSlot);
          }
        } catch (error) {
          console.error(`❌ Exception deleting slot:`, error);
        }
      }
    }

    console.log('🎉 [Gray Branch] Cleanup complete!');

    return NextResponse.json({
      success: true,
      message: `Cleanup complete - deleted ${deletedSlots.length} invalid slots, ${validSlots.length} valid slots remain`,
      validSlots: validSlots.length,
      invalidSlotsDeleted: deletedSlots.length,
      remainingSlots: validSlots.map(slot => ({ timeSlot: slot.timeSlot, isActive: slot.isActive, maxCapacity: slot.maxCapacity })),
      environment: 'gray'
    });

  } catch (error) {
    console.error('❌ [Gray Branch] Error cleaning up time slots:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: 'gray'
    }, { status: 500 });
  }
}