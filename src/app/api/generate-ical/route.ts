import { NextRequest } from 'next/server';
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

function formatTimeSlot(timeSlot: string): { start: string; end: string } {
  // Convert time slot like "09:00" to proper start and end times
  const [hours, minutes] = timeSlot.split(':').map(Number);
  
  // Format in local time for iCal (YYYYMMDDTHHMMSS format without Z for local time)
  const formatLocalDateTime = (hour: number, minute: number) => {
    const year = 2025;
    const month = 12; // December
    const day = 6;
    
    // Pad with zeros
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
  };
  
  return {
    start: formatLocalDateTime(hours, minutes),
    end: formatLocalDateTime(hours + 1, minutes)
  };
}

interface LocationConfig {
  locationName?: string;
  eventAddress?: string;
  replyToEmail?: string;
  contactPhone?: string;
}

async function getLocationConfig(): Promise<LocationConfig> {
  try {
    const { data: configs } = await (await getClient()).models.RegistrationConfig.list();
    const config = configs?.[0];
    if (config) {
      return {
        locationName: config.locationName || undefined,
        eventAddress: config.eventAddress || undefined,
        replyToEmail: config.replyToEmail || undefined,
        contactPhone: config.contactPhone || undefined
      };
    }
    return {};
  } catch (error) {
    console.error('Error fetching location config:', error);
    return {};
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get('id');
    
    if (!registrationId) {
      return new Response('Registration ID is required', { status: 400 });
    }
    
    // Get registration data
    const { data: registration } = await (await getClient()).models.Registration.get({ id: registrationId });
    
    if (!registration) {
      return new Response('Registration not found', { status: 404 });
    }
    
    // Get location config
    const config = await getLocationConfig();
    
    // Prepare event details
    const locationName = config.locationName || 'Pathway Christmas Store';
    const locationAddress = config.eventAddress || '1015 21st Ave, Lewiston, ID 83501';
    
    const { start, end } = formatTimeSlot(registration.timeSlot);
    
    // Generate unique UID for this event
    const uid = `christmas-store-${registration.id}@pathwayvineyard.com`;
    
    // Create iCal content
    const icalContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Pathway Vineyard//Christmas Store//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VTIMEZONE',
      'TZID:America/Boise',
      'BEGIN:STANDARD',
      'DTSTART:20241103T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
      'TZNAME:MST',
      'TZOFFSETFROM:-0600',
      'TZOFFSETTO:-0700',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:20240310T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
      'TZNAME:MDT',
      'TZOFFSETFROM:-0700',
      'TZOFFSETTO:-0600',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      `DTSTART;TZID=America/Boise:${start.replace('Z', '')}`,
      `DTEND;TZID=America/Boise:${end.replace('Z', '')}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `UID:${uid}`,
      `SUMMARY:Pathway Christmas Store`,
      `DESCRIPTION:Christmas Store registration for ${registration.firstName} ${registration.lastName}.\\n\\nTime Slot: ${registration.timeSlot}\\nNumber of Children: ${registration.numberOfKids}\\n\\nPlease arrive 10 minutes before your scheduled time slot.`,
      `LOCATION:${locationName}\\, ${locationAddress}`,
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'CATEGORIES:EVENT,CHRISTMAS',
      `ORGANIZER;CN=Pathway Vineyard:MAILTO:office@pathwayvineyard.com`,
      `ATTENDEE;CN=${registration.firstName} ${registration.lastName};RSVP=TRUE:MAILTO:${registration.email}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Christmas Store appointment in 30 minutes',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // Return iCal file
    return new Response(icalContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="christmas-store-${registration.firstName}-${registration.lastName}.ics"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Error generating iCal:', error);
    return new Response('Internal server error', { status: 500 });
  }
}