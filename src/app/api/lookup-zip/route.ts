import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, applyRateLimit } from '@/lib/api-utils';

interface ZipCodeResult {
  zipCode: string;
  city: string;
  state: string;
  stateAbbreviation: string;
  county: string;
  latitude: number;
  longitude: number;
}

const ZipCodeSchema = z.object({
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format')
});

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 30, 60000); // More generous for lookups
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get('zip');

    if (!zipCode) {
      return createErrorResponse('Zip code is required', 'MISSING_ZIP', 400);
    }

    // Validate zip code format
    const validation = ZipCodeSchema.safeParse({ zip: zipCode });
    if (!validation.success) {
      return createErrorResponse('Invalid zip code format', 'INVALID_ZIP_FORMAT', 400, validation.error.flatten());
    }

    // Use the free Zippopotam.us API for zip code lookup
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode.split('-')[0]}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return createErrorResponse('Zip code not found', 'ZIP_NOT_FOUND', 404);
      }
      throw new Error(`Zip code lookup failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the response to our expected format
    const results: ZipCodeResult[] = data.places.map((place: any) => ({
      zipCode: data['post code'],
      city: place['place name'],
      state: place['state'],
      stateAbbreviation: place['state abbreviation'],
      county: place['admin name1'], // This might be empty in some responses
      latitude: parseFloat(place['latitude']),
      longitude: parseFloat(place['longitude'])
    }));

    return createSuccessResponse({
      zipCode: data['post code'],
      country: data.country,
      results
    });

  } catch (error) {
    console.error('Zip code lookup error:', error);
    return createErrorResponse('Failed to lookup zip code', 'LOOKUP_FAILED', 500, error instanceof Error ? error.message : 'Unknown error');
  }
}