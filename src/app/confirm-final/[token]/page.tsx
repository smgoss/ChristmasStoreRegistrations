'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { LOCATION_NAME, LOCATION_ADDRESS, CONTACT_EMAIL, CHURCH_INFO, BRANDING } from '@/config/locationConfig';

interface ConfirmationResult {
  success: boolean;
  message: string;
  registration?: {
    firstName: string;
    lastName: string;
    timeSlot: string;
    numberOfKids: number;
    status: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    confirmedAt?: string;
  };
  error?: string;
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

export default function ConfirmFinalPage() {
  const params = useParams();
  const token = params.token as string;
  const [result, setResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [appSettings, setAppSettings] = useState<RegistrationConfig | null>(null);

  useEffect(() => {
    const loadDataAndConfirm = async () => {
      try {
        // Load application settings first
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

        // Then confirm the registration
        const response = await fetch('/api/confirm-final', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        console.log('🔍 Confirmation API response:', data);

        if (response.ok) {
          console.log('✅ Registration data received:', data.data?.registration);
          setResult({
            success: true,
            message: data.data?.message || data.message,
            registration: data.data?.registration
          });
        } else {
          setResult({
            success: false,
            message: data.message || 'Failed to confirm registration',
            error: data.code
          });
        }
      } catch (error) {
        console.error('Error confirming registration:', error);
        setResult({
          success: false,
          message: 'An error occurred while confirming your registration',
          error: 'NETWORK_ERROR'
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadDataAndConfirm();
    } else {
      setResult({
        success: false,
        message: 'Invalid confirmation link',
        error: 'MISSING_TOKEN'
      });
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Confirmation</h2>
            <p className="text-gray-600">Please wait while we confirm your registration...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">Unable to process confirmation</p>
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
            <p className="text-red-100">Final Confirmation</p>
          </div>

          <div className="p-8">
            {result.success ? (
              <div>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You for Confirming!</h2>
                  <p className="text-gray-600 mb-4">Thank you for confirming your timeslot. We look forward to seeing you this weekend!</p>
                </div>

                {result.registration && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Your Confirmed Registration</h3>
                    <div className="space-y-2 text-green-700">
                      <p><strong>Name:</strong> {result.registration.firstName} {result.registration.lastName}</p>
                      <p><strong>Time Slot:</strong> {formatTimeSlot(result.registration.timeSlot)}</p>
                      <p><strong>Number of Children:</strong> {result.registration.numberOfKids}</p>
                      <p><strong>Status:</strong> <span className="font-bold text-green-600">CONFIRMED</span></p>
                      {result.registration.confirmedAt && (
                        <p><strong>Confirmed At:</strong> {new Date(result.registration.confirmedAt).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Information</h3>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>📅 <strong>Event Date:</strong> Saturday, December 13th, 2025</li>
                    <li>📍 <strong>Location:</strong> {appSettings?.eventAddress || LOCATION_ADDRESS}</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Need Help?</h3>
                  <div className="text-yellow-700 text-sm space-y-1">
                    <p>📧 Email: {appSettings?.replyToEmail || CONTACT_EMAIL}</p>
                    <p>📞 Phone: {appSettings?.contactPhone || CHURCH_INFO.phone}</p>
                    <p>🌐 Website: {CHURCH_INFO.website}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">❌</div>
                  <h2 className="text-2xl font-bold text-red-600 mb-2">Confirmation Failed</h2>
                  <p className="text-gray-600 mb-4">{result.message}</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">What happened?</h3>
                  <div className="text-red-700 text-sm space-y-2">
                    {result.error === 'INVALID_TOKEN' && (
                      <p>The confirmation link is invalid or has expired. Please check your email for the correct link or contact us for assistance.</p>
                    )}
                    {result.error === 'REGISTRATION_CANCELLED' && (
                      <p>This registration has been cancelled and cannot be confirmed.</p>
                    )}
                    {result.error === 'INVALID_STATUS' && (
                      <p>This registration is not eligible for confirmation. It may already be confirmed or in a different status.</p>
                    )}
                    {!result.error && (
                      <p>An unexpected error occurred. Please try again or contact us for assistance.</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>📧 Email: {appSettings?.replyToEmail || CONTACT_EMAIL}</p>
                    <p>📞 Phone: {appSettings?.contactPhone || CHURCH_INFO.phone}</p>
                    <p>🌐 Website: {CHURCH_INFO.website}</p>
                    <p className="mt-2 font-semibold">Please include your name and phone number when contacting us.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}