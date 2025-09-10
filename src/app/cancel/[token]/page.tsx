'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import '@/lib/amplify';
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

export default function CancelPage({ params }: { params: { token: string } }) {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [cancelled, setCancelled] = useState(false);

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
        
        if (reg.isCancelled) {
          setCancelled(true);
          setMessage('❌ This registration has already been cancelled.');
        } else if (reg.attendanceConfirmed) {
          setMessage('✅ You previously confirmed your attendance. Are you sure you want to cancel?');
        }
      } else {
        setMessage('❌ Invalid cancellation link. Please check your email or contact us.');
      }
    } catch (error) {
      console.error('Error loading registration:', error);
      setMessage('❌ Error loading registration details.');
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async () => {
    if (!registration) return;

    setProcessing(true);
    try {
      await client.models.Registration.update({
        id: registration.id,
        isCancelled: true,
        cancelledAt: new Date().toISOString(),
        attendanceConfirmed: false
      });

      setCancelled(true);
      setMessage('✅ Your registration has been cancelled. We understand that plans change!');
    } catch (error) {
      console.error('Error cancelling registration:', error);
      setMessage('❌ Error cancelling registration. Please try again or contact us.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Loading your registration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎄</div>
            <h1 className="text-3xl font-bold text-red-800">Christmas Store</h1>
            <p className="text-gray-600 mt-2">Registration Cancellation</p>
          </div>

          {message && cancelled ? (
            <div className="text-center p-6 rounded-xl mb-6 bg-orange-100 text-orange-800">
              <div className="text-3xl mb-2">😔</div>
              <p className="text-lg font-semibold">{message}</p>
              <p className="text-sm mt-4 text-orange-700">
                If you change your mind, please contact us and we'll help you get back on the list if there's space available.
              </p>
            </div>
          ) : message && !registration ? (
            <div className="text-center p-6 rounded-xl mb-6 bg-red-100 text-red-800">
              <div className="text-3xl mb-2">❌</div>
              <p className="text-lg font-semibold">{message}</p>
            </div>
          ) : registration ? (
            <div>
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                  Hello {registration.firstName} {registration.lastName}
                </h2>
                <div className="space-y-2 text-blue-700">
                  <p><strong>Time Slot:</strong> {registration.timeSlot}</p>
                  <p><strong>Number of Children:</strong> {registration.numberOfKids}</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl mb-6 border-l-4 border-yellow-400">
                <p className="text-lg text-yellow-800 font-semibold mb-2">⚠️ Are you sure?</p>
                <p className="text-yellow-700">
                  Cancelling your registration will remove you from the Christmas Store visit for your scheduled time slot. 
                  This action cannot be undone through this link.
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={cancelRegistration}
                  disabled={processing}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50 font-bold text-lg shadow-lg transition-all mb-4"
                >
                  {processing ? '⏳ Cancelling...' : '❌ Yes, Cancel My Registration'}
                </button>
              </div>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Changed your mind? 
                </p>
                <a
                  href={`/confirm/${params.token}`}
                  className="text-green-600 hover:text-green-700 underline font-medium"
                >
                  Click here to confirm your attendance instead
                </a>
              </div>
            </div>
          )}

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              🎅 Questions? Contact us and we'll be happy to help! 🤶
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
