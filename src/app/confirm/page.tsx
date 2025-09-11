'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmRedirectContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fullPath = window.location.pathname;
    const match = fullPath.match(/\/confirm\/(.+)/);
    if (match) {
      const token = match[1];
      window.location.href = `/action?action=confirm&token=${token}`;
    } else {
      // Fallback for /confirm with query params
      const token = searchParams.get('token');
      if (token) {
        window.location.href = `/action?action=confirm&token=${token}`;
      } else {
        window.location.href = '/';
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <p className="text-xl text-gray-700">Redirecting...</p>
      </div>
    </div>
  );
}

export default function ConfirmRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Redirecting...</p>
        </div>
      </div>
    }>
      <ConfirmRedirectContent />
    </Suspense>
  );
}