'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { LOCATION_NAME, CONTACT_EMAIL, CHURCH_INFO, BRANDING } from '@/config/locationConfig';

interface Registration {
  firstName: string;
  lastName: string;
  timeSlot: string;
  numberOfKids: number;
  registrationStatus: string;
}

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
    const hour = parseInt(timeParts[0], 10);
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

export default function CancelRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appSettings, setAppSettings] = useState<RegistrationConfig | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load application settings
        console.log('🔍 Loading application settings...');
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
          console.log('✅ Application settings loaded:', config);
        }

        // Find registration by token to display details
        const { data: registrations } = await (await getClient()).models.Registration.list({
          filter: { finalConfirmationToken: { eq: token } }
        });

        const reg = registrations?.[0];
        if (!reg) {
          setError('Invalid or expired cancellation link');
          return;
        }

        setRegistration({
          firstName: reg.firstName || '',
          lastName: reg.lastName || '',
          timeSlot: reg.timeSlot || '',
          numberOfKids: reg.numberOfKids || 0,
          registrationStatus: reg.registrationStatus || ''
        });

      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load registration details');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadData();
    } else {
      setError('Invalid cancellation link');
      setLoading(false);
    }
  }, [token]);

  const handleCancel = async () => {
    if (!registration) return;
    
    setProcessing(true);
    try {
      const response = await fetch('/api/cancel-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to success page
        const params = new URLSearchParams({
          cancelled: 'true',
          firstName: registration.firstName,
          lastName: registration.lastName,
          timeSlot: registration.timeSlot
        });
        router.push(`/cancel-registration/success?${params}`);
      } else {
        setError(data.message || 'Failed to cancel registration');
      }
    } catch (error) {
      console.error('Error cancelling registration:', error);
      setError('An error occurred while cancelling your registration');
    } finally {
      setProcessing(false);
    }
  };

  const handleKeepRegistration = () => {
    // Redirect to final confirmation page
    router.push(`/confirm-final/${token}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Loading</h2>
            <p className="text-gray-600">Please wait while we load your registration details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error || 'Unable to load registration details'}</p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
              <div className="text-blue-700 text-sm space-y-1">
                <p>📧 Email: {appSettings?.replyToEmail || CONTACT_EMAIL}</p>
                <p>📞 Phone: {appSettings?.contactPhone || CHURCH_INFO.phone}</p>
              </div>
            </div>
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
            <p className="text-red-100">Cancel Registration</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Cancel Your Registration?</h2>
              <p className="text-gray-600 mb-4">
                You're about to cancel your registration for the Christmas Store. This action cannot be undone.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Your Current Registration</h3>
              <div className="space-y-2 text-yellow-700">
                <p><strong>Name:</strong> {registration.firstName} {registration.lastName}</p>
                <p><strong>Time Slot:</strong> {formatTimeSlot(registration.timeSlot)}</p>
                <p><strong>Number of Children:</strong> {registration.numberOfKids}</p>
                <p><strong>Status:</strong> <span className="font-bold">{registration.registrationStatus.toUpperCase()}</span></p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">What happens if you cancel?</h3>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Your time slot will be released for other families</li>
                <li>• You will not be able to shop at the Christmas Store</li>
                <li>• This cancellation cannot be undone</li>
                <li>• You would need to re-register if spots become available</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-center text-lg font-semibold text-gray-800 mb-4">
                What would you like to do?
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleCancel}
                  disabled={processing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    processing 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {processing ? 'Cancelling...' : '❌ Cancel My Registration'}
                </button>
                
                <button
                  onClick={handleKeepRegistration}
                  disabled={processing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    processing 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  ✅ Keep My Registration
                </button>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
              <div className="text-blue-700 text-sm space-y-1">
                <p>📧 Email: {appSettings?.replyToEmail || CONTACT_EMAIL}</p>
                <p>📞 Phone: {appSettings?.contactPhone || CHURCH_INFO.phone}</p>
                <p>🌐 Website: {CHURCH_INFO.website}</p>
                <p className="mt-2 font-semibold">Please include your name and phone number when contacting us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}