'use client';

import { useRouter } from 'next/navigation';
import { useLocationConfig } from '../../hooks/useLocationConfig';

export default function TestCampusesPage() {
  const router = useRouter();
  const config = useLocationConfig();

  const switchCampus = (location: string) => {
    // Store in localStorage and redirect
    localStorage.setItem('selectedLocation', location);
    window.location.reload(); // Force reload to apply new config
  };

  const campuses = [
    {
      id: 'lewiston',
      name: 'Lewiston Campus',
      fullName: 'Pathway Vineyard Lewiston Campus',
      color: '#7c3aed',
      emoji: '🟣',
      timeSlots: '09:00 - 11:30',
      capacity: '20 people per slot'
    },
    {
      id: 'brunswick', 
      name: 'Brunswick Campus',
      fullName: 'Pathway Vineyard Brunswick Campus',
      color: '#059669',
      emoji: '🟢',
      timeSlots: '10:00 - 12:30',
      capacity: '25 people per slot'
    },
    {
      id: 'gray',
      name: 'Gray-New Gloucester Campus', 
      fullName: 'Pathway Vineyard Gray-New Gloucester Campus',
      color: '#dc2626',
      emoji: '🔴',
      timeSlots: '08:30 - 11:00',
      capacity: '15 people per slot'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎄 Christmas Store Campus Tester</h1>
          <p className="text-gray-600 mb-6">Test different campus configurations</p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="font-bold text-blue-800 mb-2">Currently Active:</h2>
            <div className="text-2xl" style={{ color: config.branding.primaryColor }}>
              {config.branding.locationEmoji} {config.locationName}
            </div>
            <p className="text-blue-700">{config.locationAddress}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {campuses.map((campus) => (
            <div 
              key={campus.id}
              className="bg-white rounded-lg shadow-lg p-6 border-2 hover:shadow-xl transition-all cursor-pointer"
              style={{ 
                borderColor: campus.color,
                backgroundColor: config.locationName === campus.fullName ? `${campus.color}10` : 'white'
              }}
              onClick={() => switchCampus(campus.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{campus.emoji}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: campus.color }}>
                  {campus.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{campus.fullName}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Time Slots:</strong> {campus.timeSlots}
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Capacity:</strong> {campus.capacity}
                  </div>
                </div>

                <button 
                  className="mt-4 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: campus.color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    switchCampus(campus.id);
                  }}
                >
                  Switch to {campus.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              🏠 Test Registration Form
            </button>
            
            <button
              onClick={() => router.push('/admin')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              👑 Test Admin Panel
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              💡 <strong>Tip:</strong> Click a campus card to switch configurations, then test the registration form or admin panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}