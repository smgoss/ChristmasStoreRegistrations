'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import RegistrationForm from '@/components/RegistrationForm';
import { ensureAmplifyConfigured } from '@/lib/amplify';

let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

export default function InviteRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState<string>('');

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const validateToken = async () => {
    try {
      const { data: inviteLinks } = await (await getClient()).models.InviteLink.list({
        filter: { token: { eq: token } }
      });

      if (inviteLinks.length === 0) {
        setIsValidToken(false);
      } else {
        const invite = inviteLinks[0];

        // Check if invite is still valid
        let isValid = false;
        if (invite.isAgencyInvite) {
          // For agency invites, check usage counter
          const currentUsage = invite.currentUsageCount || 0;
          const maxUsage = invite.maxUsageCount || 1;
          isValid = currentUsage < maxUsage;
        } else {
          // For individual invites, check isUsed flag
          isValid = !invite.isUsed;
        }

        if (!isValid) {
          setIsValidToken(false);
        } else {
          setIsValidToken(true);
          // Only pre-populate email for individual invites, not agency invites
          if (!invite.isAgencyInvite) {
            setInviteEmail(invite.email || '');
          }
        }
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setIsValidToken(false);
    } finally {
      setIsLoading(false);
    }
  };

  const markTokenAsUsed = async () => {
    try {
      const { data: inviteLinks } = await (await getClient()).models.InviteLink.list({
        filter: { token: { eq: token } }
      });

      if (inviteLinks.length > 0) {
        const invite = inviteLinks[0];

        // Agency invites are handled by the registration API (usage counter)
        // Only mark individual invites as used here
        if (!invite.isAgencyInvite) {
          await (await getClient()).models.InviteLink.update({
            id: invite.id,
            isUsed: true,
            usedAt: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Error marking token as used:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.704-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid or Expired Invitation</h1>
          <p className="text-gray-600 mb-6">
            This invitation link is no longer valid. It may have already been used or has expired.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Go to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 py-12 px-4">
      <RegistrationForm 
        inviteToken={token}
        onRegistrationComplete={markTokenAsUsed}
        prefillEmail={inviteEmail}
      />
    </div>
  );
}
