'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import type { Schema } from '../../../../amplify/data/resource';
import outputs from '../../../../amplify_outputs.json';

Amplify.configure(outputs);
const client = generateClient<Schema>();

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  timeSlot: string;
  numberOfKids: number;
  attendanceConfirmed: boolean;
  isCancelled: boolean;
}

export default function ConfirmPage({ params }: { params: { token: string } }) {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    loadRegistration();
  }, []);

  const loadRegistration = async () => {
    try {
      const { data: registrations } = await client.models.Registration.list({
        filter: { confirmationToken: { eq: params.token } }
      });

      if (registrations && registrations.length > 0) {
        const reg = registrations[0] as Registration;
        setRegistration(reg);
        
        if (reg.attendanceConfirmed) {
          setConfirmed(true);
          setMessage('✅ You have already confirmed your attendance!');
        } else if (reg.isCancelled) {
          setMessage('❌ This registration has been cancelled.');
        }
      } else {
        setMessage('❌ Invalid confirmation link. Please check your email or contact us.');
      }
    } catch (error) {
      console.error('Error loading registration:', error);
      setMessage('❌ Error loading registration details.');
    } finally {
      setLoading(false);
    }
  };

  const confirmAttendance = async () => {
    if (!registration) return;

    setProcessing(true);
    try {
      await client.models.Registration.update({
        id: registration.id,
        attendanceConfirmed: true,
        attendanceConfirmedAt: new Date().toISOString(),
        isCancelled: false
      });

      setConfirmed(true);
      setMessage('🎉 Thank you! Your attendance has been confirmed.');
    } catch (error) {
      console.error('Error confirming attendance:', error);
      setMessage('❌ Error confirming attendance. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Loading your registration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-red-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎄</div>
            <h1 className="text-3xl font-bold text-green-800">Christmas Store</h1>
            <p className="text-gray-600 mt-2">Attendance Confirmation</p>
          </div>

          {message ? (
            <div className={`text-center p-6 rounded-xl mb-6 ${
              confirmed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className="text-3xl mb-2">
                {confirmed ? '🎉' : '❌'}
              </div>
              <p className="text-lg font-semibold">{message}</p>
            </div>
          ) : registration ? (
            <div>
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                  Hello {registration.firstName} {registration.lastName}!
                </h2>
                <div className="space-y-2 text-blue-700">
                  <p><strong>Time Slot:</strong> {registration.timeSlot}</p>
                  <p><strong>Number of Children:</strong> {registration.numberOfKids}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Please confirm that you plan to attend the Christmas Store at your scheduled time.
                </p>
                <button
                  onClick={confirmAttendance}
                  disabled={processing}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 font-bold text-lg shadow-lg transition-all"
                >
                  {processing ? '⏳ Confirming...' : '✅ Yes, I\'ll be there!'}
                </button>
              </div>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Can't make it? 
                </p>
                <a
                  href={`/cancel/${params.token}`}
                  className="text-red-600 hover:text-red-700 underline font-medium"
                >
                  Click here to cancel your registration
                </a>
              </div>
            </div>
          )}

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              🎅 Thank you for being part of our Christmas Store community! 🤶
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}