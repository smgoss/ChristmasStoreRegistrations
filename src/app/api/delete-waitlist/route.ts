import { NextRequest } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, validateRequestBody, applyRateLimit } from '@/lib/api-utils';

let client: ReturnType<typeof generateClient<Schema>> | null = null;

const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

const DeleteWaitlistSchema = z.object({
  waitlistId: z.string().min(1, 'Waitlist ID is required')
});

async function reorderWaitlistPositions(): Promise<void> {
  try {
    // Get all active waitlist entries ordered by position
    const client = await getClient();
    if (!client.models.Waitlist) {
      console.log('Waitlist model not available for reordering');
      return;
    }

    const { data: waitlistEntries } = await client.models.Waitlist.list({
      filter: { isActive: { eq: true } }
    });
    
    if (!waitlistEntries || waitlistEntries.length === 0) {
      return;
    }

    // Sort by position and reorder
    const sortedEntries = waitlistEntries.sort((a, b) => (a.position || 0) - (b.position || 0));
    
    // Update positions to be sequential (1, 2, 3, ...)
    for (let i = 0; i < sortedEntries.length; i++) {
      const entry = sortedEntries[i];
      if (entry.position !== i + 1) {
        await client.models.Waitlist.update({
          id: entry.id,
          position: i + 1
        });
      }
    }
    
    console.log(`✅ Reordered ${sortedEntries.length} waitlist positions`);
  } catch (error) {
    console.error('Error reordering waitlist positions:', error);
    throw error;
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 10, 60000); // 10 requests per minute
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, DeleteWaitlistSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { waitlistId } = validation.data;
    console.log('🗑️ Deleting waitlist entry:', waitlistId);

    // Check if Waitlist model is available
    const client = await getClient();
    if (!client.models.Waitlist) {
      return createErrorResponse(
        'Waitlist feature is currently being deployed. Please try again in a few minutes.',
        'WAITLIST_NOT_AVAILABLE',
        503
      );
    }

    // Get waitlist entry to verify it exists
    const { data: waitlistEntry } = await client.models.Waitlist.get({ id: waitlistId });
    
    if (!waitlistEntry) {
      return createErrorResponse(
        'Waitlist entry not found',
        'WAITLIST_NOT_FOUND',
        404
      );
    }

    const entryPosition = waitlistEntry.position;
    const entryName = `${waitlistEntry.firstName} ${waitlistEntry.lastName}`;

    // Delete the waitlist entry
    await client.models.Waitlist.delete({ id: waitlistId });
    
    console.log(`✅ Deleted waitlist entry for ${entryName} (position ${entryPosition})`);

    // Reorder remaining waitlist positions
    try {
      await reorderWaitlistPositions();
    } catch (reorderError) {
      console.error('Warning: Failed to reorder waitlist positions:', reorderError);
      // Don't fail the deletion if reordering fails
    }

    return createSuccessResponse({
      message: `Successfully removed ${entryName} from waitlist`,
      deletedEntry: {
        id: waitlistId,
        firstName: waitlistEntry.firstName,
        lastName: waitlistEntry.lastName,
        email: waitlistEntry.email,
        position: entryPosition
      }
    });

  } catch (error) {
    console.error('❌ Error deleting waitlist entry:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}