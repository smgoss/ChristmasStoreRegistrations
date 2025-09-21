'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { LOCATION_NAME, LOCATION_ADDRESS, CONTACT_EMAIL, CHURCH_INFO, BRANDING } from '@/config/locationConfig';

interface RegistrationConfig {
  locationName?: string;
  eventAddress?: string;
  replyToEmail?: string;
  contactPhone?: string;
  textingNumber?: string;
}

// Client initialization
let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

function formatTimeSlot(timeSlot: string): string {
  const timeParts = timeSlot.split(':');
  if (timeParts.length === 2) {
    let hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1];
    
    if (hour === 0) {
      return `12:${minute} AM`;
    } else if (hour < 12) {
      return `${hour}:${minute} AM`;
    } else if (hour === 12) {
      return `12:${minute} PM`;
    } else {
      return `${hour - 12}:${minute} PM`;
    }
  }
  return timeSlot;
}

function CancellationSuccessContent() {
  const searchParams = useSearchParams();
  const [appSettings, setAppSettings] = useState<RegistrationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  
  const cancelled = searchParams.get('cancelled') === 'true';
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const timeSlot = searchParams.get('timeSlot') || '';

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
        const config = configData?.[0];
        if (config) {
          setAppSettings({
            locationName: config.locationName || undefined,
            eventAddress: config.eventAddress || undefined,
            replyToEmail: config.replyToEmail || undefined,
            contactPhone: config.contactPhone || undefined,
            textingNumber: config.textingNumber || undefined
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cancelled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Request</h2>
            <p className="text-gray-600">This cancellation page is not valid.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-green-600 p-6 text-white text-center">
            <div className="text-4xl mb-2">{BRANDING.locationEmoji}</div>
            <h1 className="text-2xl font-bold">{appSettings?.locationName || LOCATION_NAME}</h1>
            <p className="text-red-100">Registration Cancelled</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Registration Cancelled Successfully</h2>
              <p className="text-gray-600 mb-4">
                Your registration has been cancelled and your time slot has been released for other families.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancelled Registration Details</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {firstName} {lastName}</p>
                <p><strong>Time Slot:</strong> {timeSlot ? formatTimeSlot(timeSlot) : 'Not specified'}</p>
                <p><strong>Status:</strong> <span className="font-bold text-red-600">CANCELLED</span></p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Your time slot is now available for other families</li>
                <li>• You will not receive any further communications about this registration</li>
                <li>• If you change your mind, you may re-register if spots become available</li>
                <li>• Contact us if you need assistance with future registrations</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Need Help?</h3>
              <div className="text-yellow-700 text-sm space-y-1">
                <p>📧 Email: {appSettings?.replyToEmail || CONTACT_EMAIL}</p>
                <p>📞 Phone: {appSettings?.contactPhone || CHURCH_INFO.phone}</p>
                <p>🌐 Website: {CHURCH_INFO.website}</p>
                <p className="mt-2 font-semibold">We're here to help if you have any questions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CancellationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    }>
      <CancellationSuccessContent />
    </Suspense>
  );
}