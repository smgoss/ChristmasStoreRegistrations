'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { useLocationConfig } from '../hooks/useLocationConfig';
import { ensureAmplifyConfigured } from '@/lib/amplify';

// Lazy client initialization with retry mechanism
let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  // Ensure Amplify is configured first
  await ensureAmplifyConfigured();
  
  if (!client) {
    try {
      client = generateClient<Schema>();
    } catch (error) {
      console.warn('Amplify client creation failed:', error);
      throw error;
    }
  }
  return client;
};

interface Child {
  age: number | string;
  gender: 'boy' | 'girl';
}

interface RegistrationConfig {
  id: string;
  isRegistrationOpen: boolean;
  inviteOnlyMode: boolean;
  scheduledCloseDate?: string;
  autoCloseEnabled: boolean;
  closureMessage: string;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  state: string;
  numberOfKids: number;
  timeSlot: string;
  referredBy: string;
  children: Child[];
}

// TIME_SLOTS is now imported from locationConfig

interface RegistrationFormProps {
  inviteToken?: string;
  onRegistrationComplete?: () => void;
  prefillEmail?: string;
}

export default function RegistrationForm({ 
  inviteToken, 
  onRegistrationComplete, 
  prefillEmail 
}: RegistrationFormProps = {}) {
  const locationConfig = useLocationConfig();
  const { 
    locationName: LOCATION_NAME,
    locationAddress: LOCATION_ADDRESS,
    branding: BRANDING,
    churchInfo: CHURCH_INFO,
    contactEmail: CONTACT_EMAIL 
  } = locationConfig;
  
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: prefillEmail || '',
    phone: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    state: '',
    numberOfKids: 0,
    timeSlot: '',
    referredBy: '',
    children: []
  });

  const [timeSlotCapacities, setTimeSlotCapacities] = useState<Record<string, { max: number; current: number }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [zipLookupLoading, setZipLookupLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState<Array<{city: string, state: string}>>([]);
  const [submitted, setSubmitted] = useState(false);
  const [registrationConfig, setRegistrationConfig] = useState<RegistrationConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  

  useEffect(() => {
    // Load time slot capacities and registration config
    loadTimeSlotCapacities();
    loadRegistrationConfig();
  }, []);

  const loadRegistrationConfig = async () => {
    try {
      setConfigLoading(true);
      const client = await getClient();
      const { data: configData } = await client.models.RegistrationConfig.list();
      const config = configData?.[0] as RegistrationConfig;
      setRegistrationConfig(config);
      
      // Check if we need to auto-close based on scheduled date
      if (config?.autoCloseEnabled && config.scheduledCloseDate) {
        const now = new Date();
        const scheduledDate = new Date(config.scheduledCloseDate);
        if (now >= scheduledDate && config.isRegistrationOpen) {
          // Auto-close registration
          await client.models.RegistrationConfig.update({
            id: config.id,
            isRegistrationOpen: false,
            updatedAt: new Date().toISOString()
          });
          setRegistrationConfig(prev => prev ? { ...prev, isRegistrationOpen: false } : null);
        }
      }
    } catch (error) {
      console.error('Error loading registration config:', error);
    } finally {
      setConfigLoading(false);
    }
  };

  useEffect(() => {
    // Update children array when numberOfKids changes
    const newChildren: Child[] = [];
    for (let i = 0; i < formData.numberOfKids; i++) {
      newChildren.push(formData.children[i] || { age: '', gender: 'boy' });
    }
    setFormData(prev => ({ ...prev, children: newChildren }));
  }, [formData.numberOfKids]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Load time slots from database on component mount
    loadTimeSlotCapacities();
  }, []);

  const loadTimeSlotCapacities = async () => {
    try {
      // Load time slot configurations
      const client = await getClient();
      const { data: timeSlotData } = await client.models.TimeSlotConfig.list();
      
      // Load all registrations to calculate actual counts
      const { data: registrationData } = await client.models.Registration.list();
      
      const capacities: Record<string, { max: number; current: number }> = {};
      const activeTimeSlots: string[] = [];
      
      timeSlotData.forEach(config => {
        // Only include active time slots
        if (config.isActive) {
          activeTimeSlots.push(config.timeSlot);
          
          // Calculate actual registration count for this time slot
          const actualCount = registrationData ? 
            registrationData.filter(reg => reg.timeSlot === config.timeSlot && !reg.isCancelled).length : 0;
          
          capacities[config.timeSlot] = {
            max: config.maxCapacity || 0,
            current: actualCount
          };
        }
      });
      
      // Sort time slots chronologically (earliest to latest)
      activeTimeSlots.sort((a, b) => {
        // Convert time strings like "09:00" to comparable numbers
        const timeA = a.split(':').map(Number);
        const timeB = b.split(':').map(Number);
        
        // Compare hours first, then minutes
        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }
        return timeA[1] - timeB[1];
      });
      
      setTimeSlots(activeTimeSlots);
      setTimeSlotCapacities(capacities);
    } catch (error) {
      console.error('Error loading time slot capacities:', error);
    }
  };

  const lookupZipCode = async (zipCode: string) => {
    if (!zipCode || zipCode.length < 5) {
      setCityOptions([]);
      return;
    }

    setZipLookupLoading(true);
    try {
      const response = await fetch(`/api/lookup-zip?zip=${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        const options = data.results.map((result: any) => ({
          city: result.city,
          state: result.stateAbbreviation
        }));
        setCityOptions(options);
        
        // Auto-fill if there's only one option
        if (options.length === 1) {
          setFormData(prev => ({
            ...prev,
            city: options[0].city,
            state: options[0].state
          }));
        } else {
          // Clear city/state if multiple options, let user choose
          setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
          }));
        }
      } else {
        setCityOptions([]);
        if (response.status === 404) {
          setErrors(prev => ({ ...prev, zipCode: 'Zip code not found' }));
        }
      }
    } catch (error) {
      console.error('Zip code lookup failed:', error);
      setCityOptions([]);
    } finally {
      setZipLookupLoading(false);
    }
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    // Check registration status first
    if (!registrationConfig?.isRegistrationOpen) {
      newErrors.general = registrationConfig?.closureMessage || 'Registration is currently closed.';
      setErrors(newErrors);
      return false;
    }

    // Check invite-only mode
    if (registrationConfig?.inviteOnlyMode && !inviteToken) {
      newErrors.general = 'Registration is currently invite-only. Please use the invite link you received.';
      setErrors(newErrors);
      return false;
    }

    // If in invite-only mode, validate the invite token
    if (registrationConfig?.inviteOnlyMode && inviteToken) {
      try {
        const client = await getClient();
        const { data: inviteData } = await client.models.InviteLink.list({
          filter: { token: { eq: inviteToken } }
        });
        
        const invite = inviteData?.[0];
        if (!invite) {
          newErrors.general = 'Invalid invite link. Please contact us for assistance.';
          setErrors(newErrors);
          return false;
        }
        
        if (invite.isUsed) {
          newErrors.general = 'This invite link has already been used.';
          setErrors(newErrors);
          return false;
        }
      } catch (error) {
        console.error('Error validating invite token:', error);
        newErrors.general = 'Error validating invite. Please try again.';
        setErrors(newErrors);
        return false;
      }
    }

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    
    // Validate zip code format
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code (e.g., 12345 or 12345-6789)';
    }
    
    if (formData.numberOfKids < 0) {
      newErrors.numberOfKids = 'Number of kids cannot be negative';
    }

    // Validate children info if numberOfKids > 0
    if (formData.numberOfKids > 0) {
      formData.children.forEach((child, index) => {
        if (child.age !== '<1' && (typeof child.age !== 'number' || child.age < 1 || child.age > 18)) {
          newErrors[`child_${index}_age`] = 'Please select a valid age';
        }
      });
    }

    // Check for duplicate email
    try {
      const client = await getClient();
      const { data: existingRegistrations } = await client.models.Registration.list({
        filter: { email: { eq: formData.email } }
      });
      
      if (existingRegistrations.length > 0) {
        newErrors.email = 'Someone is already registered with this email address';
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }

    // Check for duplicate phone
    try {
      const client = await getClient();
      const { data: existingRegistrations } = await client.models.Registration.list({
        filter: { phone: { eq: formData.phone } }
      });
      
      if (existingRegistrations.length > 0) {
        newErrors.phone = 'Someone is already registered with this phone number';
      }
    } catch (error) {
      console.error('Error checking phone:', error);
    }

    // Check time slot availability
    const slotCapacity = timeSlotCapacities[formData.timeSlot];
    if (slotCapacity && slotCapacity.current >= slotCapacity.max) {
      newErrors.timeSlot = 'This time slot is full';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await validateForm();
      if (!isValid) {
        setLoading(false);
        return;
      }
      // Create registration via secure server route
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inviteToken: inviteToken || undefined,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Registration failed' }));
        setErrors({ submit: error || 'An error occurred while submitting your registration.' });
        return;
      }

      setSubmitted(true);
      if (onRegistrationComplete) onRegistrationComplete();
    } catch (error) {
      console.error('Error submitting registration:', error);
      setErrors({ submit: 'An error occurred while submitting your registration. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for registering for the Christmas Store. You will receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-900"><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p className="text-gray-900"><strong>Email:</strong> {formData.email}</p>
            <p className="text-gray-900"><strong>Time Slot:</strong> {formData.timeSlot}</p>
            <p className="text-gray-900"><strong>Number of Children:</strong> {formData.numberOfKids}</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while checking registration config
  if (configLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-6xl mb-4">🔄</div>
          <p className="text-xl text-gray-700">Checking registration status...</p>
        </div>
      </div>
    );
  }

  // Show registration closed message if registration is not open
  if (!registrationConfig?.isRegistrationOpen) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Registration Closed</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-800">
              {registrationConfig?.closureMessage || 'Registration is currently closed. Please check back later.'}
            </p>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">🎅 Questions? Contact us and we\u2019ll be happy to help! 🤶</p>
          </div>
        </div>
      </div>
    );
  }

  // Show invite-only message if registration is invite-only and no token provided
  if (registrationConfig?.inviteOnlyMode && !inviteToken) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Invite Only Registration</h2>
          <div className="bg-orange-50 p-6 rounded-lg">
            <p className="text-orange-800 mb-4">
              Registration is currently limited to invited participants only.
            </p>
            <p className="text-orange-700">
              If you received an invitation email, please click the registration link in that email to continue.
            </p>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">🎅 Questions about invitations? Contact us and we\u2019ll be happy to help! 🤶</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{BRANDING.locationEmoji}</div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: BRANDING.primaryColor }}>
          Christmas Store Registration
        </h1>
        <h2 className="text-xl font-semibold mb-2" style={{ color: BRANDING.secondaryColor }}>
          {LOCATION_NAME}
        </h2>
        <p className="text-gray-600">{LOCATION_ADDRESS}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-50 p-4 rounded-lg text-red-600">{errors.submit}</div>
        )}
        
        {errors.general && (
          <div className="bg-red-50 p-4 rounded-lg text-red-600">{errors.general}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Address Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.streetAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, streetAddress: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
              placeholder="123 Main Street"
              required
            />
            {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code *
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => {
                  const zipCode = e.target.value;
                  setFormData(prev => ({ ...prev, zipCode }));
                  // Clear previous zip code error
                  if (errors.zipCode) {
                    setErrors(prev => ({ ...prev, zipCode: '' }));
                  }
                  // Trigger lookup when zip code is 5 digits
                  if (zipCode.length === 5) {
                    lookupZipCode(zipCode);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="12345"
                maxLength={10}
                required
              />
              {zipLookupLoading && (
                <p className="text-blue-500 text-sm mt-1">Looking up zip code...</p>
              )}
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              {cityOptions.length > 1 ? (
                <select
                  value={formData.city}
                  onChange={(e) => {
                    const selectedOption = cityOptions.find(opt => opt.city === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      city: e.target.value,
                      state: selectedOption?.state || prev.state
                    }));
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select city...</option>
                  {cityOptions.map((option, index) => (
                    <option key={index} value={option.city}>
                      {option.city}, {option.state}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  placeholder="City"
                  required
                />
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                placeholder="State"
                maxLength={2}
                required
                readOnly={cityOptions.length > 0}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Children (18 and under) *
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={formData.numberOfKids}
            onChange={(e) => setFormData(prev => ({ ...prev, numberOfKids: parseInt(e.target.value) || 0 }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            required
          />
          {errors.numberOfKids && <p className="text-red-500 text-sm mt-1">{errors.numberOfKids}</p>}
        </div>

        {formData.numberOfKids > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Children Information</h3>
            <div className="space-y-4">
              {formData.children.map((child, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Child {index + 1} Age
                    </label>
                    <select
                      value={child.age}
                      onChange={(e) => {
                        const newChildren = [...formData.children];
                        const value = e.target.value;
                        newChildren[index].age = value === '<1' ? '<1' : parseInt(value);
                        setFormData(prev => ({ ...prev, children: newChildren }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Select age</option>
                      <option value="<1">&lt;1</option>
                      {Array.from({ length: 18 }, (_, i) => i + 1).map(age => (
                        <option key={age} value={age}>{age}</option>
                      ))}
                    </select>
                    {errors[`child_${index}_age`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`child_${index}_age`]}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Child {index + 1} Gender
                    </label>
                    <select
                      value={child.gender}
                      onChange={(e) => {
                        const newChildren = [...formData.children];
                        newChildren[index].gender = e.target.value as 'boy' | 'girl';
                        setFormData(prev => ({ ...prev, children: newChildren }));
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="boy">Boy</option>
                      <option value="girl">Girl</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time Slot *
          </label>
          <select
            value={formData.timeSlot}
            onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map(slot => {
              const capacity = timeSlotCapacities[slot];
              const isFull = capacity && capacity.current >= capacity.max;
              const availableText = capacity ? ` (${capacity.current}/${capacity.max} registered)` : '';
              
              return (
                <option key={slot} value={slot} disabled={isFull}>
                  {slot}{availableText}{isFull ? ' - FULL' : ''}
                </option>
              );
            })}
          </select>
          {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Were you referred by any agency or person? (optional)
          </label>
          <input
            type="text"
            value={formData.referredBy}
            onChange={(e) => setFormData(prev => ({ ...prev, referredBy: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
            placeholder="Agency name or person's name"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-md font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:opacity-90"
          style={{ backgroundColor: BRANDING.primaryColor }}
        >
          {loading ? 'Submitting...' : '🎁 Register for Christmas Store'}
        </button>
        
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Questions?</h3>
            <p className="text-sm text-gray-600 mb-1">
              📧 <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              📞 {CHURCH_INFO.phone}
            </p>
            <p className="text-sm text-gray-600">
              🌐 <a href={CHURCH_INFO.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                pathwayvineyard.com
              </a>
            </p>
          </div>
          <p className="text-sm text-gray-500">
            🎅 Thank you for being part of our Christmas Store community! 🤶
          </p>
        </div>
      </form>
    </div>
  );
}

 
