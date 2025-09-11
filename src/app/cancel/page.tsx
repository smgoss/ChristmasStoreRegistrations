'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CancelRedirectContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fullPath = window.location.pathname;
    const match = fullPath.match(/\/cancel\/(.+)/);
    if (match) {
      const token = match[1];
      window.location.href = `/action?action=cancel&token=${token}`;
    } else {
      // Fallback for /cancel with query params
      const token = searchParams.get('token');
      if (token) {
        window.location.href = `/action?action=cancel&token=${token}`;
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

export default function CancelRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Redirecting...</p>
        </div>
      </div>
    }>
      <CancelRedirectContent />
    </Suspense>
  );
}