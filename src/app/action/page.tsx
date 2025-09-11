'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import RegistrationForm from '@/components/RegistrationForm';
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

function ActionPageContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get('action'); // 'cancel', 'confirm', or 'register'
  const token = searchParams.get('token');
  
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [actionCompleted, setActionCompleted] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [inviteEmail, setInviteEmail] = useState<string>('');

  useEffect(() => {
    if (token && action) {
      if (action === 'register') {
        validateInviteToken();
      } else {
        loadRegistration();
      }
    }
  }, [token, action]);

  const validateInviteToken = async () => {
    if (!token) {
      setIsValidToken(false);
      setMessage('❌ Missing invitation token.');
      setLoading(false);
      return;
    }

    try {
      const { data: inviteLinks } = await client.models.InviteLink.list({
        filter: { token: { eq: token } }
      });

      if (inviteLinks && inviteLinks.length > 0) {
        const invite = inviteLinks[0];
        setInviteEmail(invite.email || '');
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
        setMessage('❌ Invalid or expired invitation link.');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setIsValidToken(false);
      setMessage('❌ Error validating invitation link.');
    } finally {
      setLoading(false);
    }
  };

  const loadRegistration = async () => {
    if (!token) {
      setMessage('❌ Missing confirmation token.');
      setLoading(false);
      return;
    }

    try {
      const { data: registrations } = await client.models.Registration.list({
        filter: { confirmationToken: { eq: token } }
      });

      if (registrations && registrations.length > 0) {
        const reg = registrations[0] as Registration;
        setRegistration(reg);
        
        if (action === 'cancel' && reg.isCancelled) {
          setActionCompleted(true);
          setMessage('❌ This registration has already been cancelled.');
        } else if (action === 'confirm' && reg.attendanceConfirmed) {
          setActionCompleted(true);
          setMessage('✅ Your attendance has already been confirmed.');
        } else if (action === 'cancel' && reg.attendanceConfirmed) {
          setMessage('✅ You previously confirmed your attendance. Are you sure you want to cancel?');
        }
      } else {
        setMessage(`❌ Invalid ${action} link. Please check your email or contact us.`);
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

      setActionCompleted(true);
      setMessage('✅ Your registration has been cancelled. We understand that plans change!');
    } catch (error) {
      console.error('Error cancelling registration:', error);
      setMessage('❌ Error cancelling registration. Please try again or contact us.');
    } finally {
      setProcessing(false);
    }
  };

  const confirmAttendance = async () => {
    if (!registration) return;

    setProcessing(true);
    try {
      await client.models.Registration.update({
        id: registration.id,
        attendanceConfirmed: true,
        attendanceConfirmedAt: new Date().toISOString()
      });

      setActionCompleted(true);
      setMessage('🎉 Thank you! Your attendance has been confirmed. We look forward to seeing you!');
    } catch (error) {
      console.error('Error confirming attendance:', error);
      setMessage('❌ Error confirming attendance. Please try again or contact us.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!action || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">Invalid Link</h1>
            <p className="text-gray-600">This link is missing required parameters.</p>
          </div>
        </div>
      </div>
    );
  }

  // Register action
  if (action === 'register') {
    if (isValidToken === false) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-red-800 mb-4">Invalid Invitation</h1>
              <p className="text-gray-600">{message}</p>
            </div>
          </div>
        </div>
      );
    }

    return <RegistrationForm inviteToken={token} prefillEmail={inviteEmail} />;
  }

  // Cancel/Confirm actions
  const actionTitle = action === 'cancel' ? 'Registration Cancellation' : 'Attendance Confirmation';
  const actionEmoji = action === 'cancel' ? '❌' : '✅';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎄</div>
            <h1 className="text-3xl font-bold text-red-800">Christmas Store</h1>
            <p className="text-gray-600 mt-2">{actionTitle}</p>
          </div>

          {message && actionCompleted ? (
            <div className="text-center p-6 rounded-xl mb-6 bg-orange-100 text-orange-800">
              <div className="text-3xl mb-2">{action === 'cancel' ? '😔' : '🎉'}</div>
              <p className="text-lg font-semibold">{message}</p>
              {action === 'cancel' && (
                <p className="text-sm mt-4 text-orange-700">
                  If you change your mind, please contact us and we'll help you get back on the list if there's space available.
                </p>
              )}
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

              {action === 'cancel' ? (
                <>
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
                      href={`/action?action=confirm&token=${token}`}
                      className="text-green-600 hover:text-green-700 underline font-medium"
                    >
                      Click here to confirm your attendance instead
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-50 p-6 rounded-xl mb-6 border-l-4 border-green-400">
                    <p className="text-lg text-green-800 font-semibold mb-2">🎉 Confirm Your Attendance</p>
                    <p className="text-green-700">
                      Please confirm that you will be attending the Christmas Store at your scheduled time. 
                      This helps us prepare for your visit!
                    </p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={confirmAttendance}
                      disabled={processing}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 font-bold text-lg shadow-lg transition-all mb-4"
                    >
                      {processing ? '⏳ Confirming...' : '✅ Yes, I Will Attend'}
                    </button>
                  </div>

                  <div className="text-center mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      Can't make it? 
                    </p>
                    <a
                      href={`/action?action=cancel&token=${token}`}
                      className="text-red-600 hover:text-red-700 underline font-medium"
                    >
                      Click here to cancel your registration
                    </a>
                  </div>
                </>
              )}
            </div>
          ) : null}

          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">🎅 Questions? Contact us and we'll be happy to help! 🤶</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    }>
      <ActionPageContent />
    </Suspense>
  );
}