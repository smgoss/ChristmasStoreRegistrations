import { NextRequest, NextResponse } from 'next/server';

interface ZipCodeResult {
  zipCode: string;
  city: string;
  state: string;
  stateAbbreviation: string;
  county: string;
  latitude: number;
  longitude: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get('zip');

    if (!zipCode) {
      return NextResponse.json({ error: 'Zip code is required' }, { status: 400 });
    }

    // Validate zip code format (5 digits or 5+4 format)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      return NextResponse.json({ error: 'Invalid zip code format' }, { status: 400 });
    }

    // Use the free Zippopotam.us API for zip code lookup
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode.split('-')[0]}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Zip code not found' }, { status: 404 });
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

    return NextResponse.json({
      zipCode: data['post code'],
      country: data.country,
      results
    });

  } catch (error) {
    console.error('Zip code lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup zip code' }, 
      { status: 500 }
    );
  }
}