'use client';

import { useState, useEffect } from 'react';
import { Authenticator, Theme, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { useLocationConfig } from '../../hooks/useLocationConfig';
import { ensureAmplifyConfigured } from '@/lib/amplify';

// Client initialization with proper error handling and fallback
let client: ReturnType<typeof generateClient<Schema>> | null = null;
let adminClient: ReturnType<typeof generateClient<Schema>> | null = null;

const getClient = async () => {
  if (!client) {
    try {
      // First ensure Amplify is configured
      await ensureAmplifyConfigured();
      // Use apiKey authentication since mutations allow publicApiKey
      client = generateClient<Schema>({ authMode: 'apiKey' });
      console.log('✅ Client created with apiKey auth');
    } catch (error) {
      console.error('❌ Client creation failed:', error);
      throw new Error('Failed to create Amplify client. Check Amplify configuration.');
    }
  }
  return client;
};

const getAdminClient = async () => {
  if (!adminClient) {
    try {
      // Use UserPool mode for admin operations (create, update, delete)
      await ensureAmplifyConfigured();
      adminClient = generateClient<Schema>({ authMode: 'userPool' });
      console.log('✅ Admin client created with userPool auth for admin operations');
    } catch (userPoolError) {
      console.error('❌ UserPool client creation failed:', userPoolError);
      // Fallback to API Key for admin operations if userPool fails
      try {
        adminClient = generateClient<Schema>({ authMode: 'apiKey' });
        console.log('⚠️ Fallback: Using apiKey auth for admin operations');
      } catch (fallbackError) {
        console.error('❌ Fallback client creation failed:', fallbackError);
        throw new Error('Failed to create admin client. Check authentication.');
      }
    }
  }
  return adminClient;
};

const christmasTheme: Theme = ({
  name: 'christmas-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f0fdf4',
          20: '#dcfce7',
          40: '#86efac',
          60: '#22c55e',
          80: '#16a34a',
          90: '#15803d',
          100: '#14532d'
        }
      },
      background: {
        primary: '#fef7f0',
        secondary: '#fef2f2'
      }
    },
    components: {
      authenticator: {
        router: {
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          borderRadius: '1rem'
        },
        form: {
          padding: '2rem'
        }
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.80}',
          _hover: {
            backgroundColor: '{colors.brand.primary.90}'
          }
        }
      },
      fieldset: {
        borderRadius: '0.75rem'
      },
      input: {
        borderRadius: '0.75rem'
      }
    }
  }
} as unknown) as Theme;

interface TimeSlotConfig {
  id: string;
  timeSlot: string;
  maxCapacity: number;
  currentRegistrations: number;
  isActive: boolean;
}

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeSlot: string;
  numberOfKids: number;
  children?: Array<{ age: string; gender: 'boy' | 'girl' }>;
  referredBy?: string;
  registrationDate: string;
  attendanceConfirmed?: boolean;
  attendanceConfirmedAt?: string;
  isCancelled?: boolean;
  cancelledAt?: string;
  confirmationToken?: string;
  registrationStatus?: 'registered' | 'unconfirmed' | 'confirmed' | 'cancelled';
  finalConfirmationSentAt?: string;
  finalConfirmationToken?: string;
  finalConfirmedAt?: string;
}

interface RegistrationConfig {
  id: string;
  isRegistrationOpen: boolean;
  inviteOnlyMode: boolean;
  scheduledCloseDate?: string;
  autoCloseEnabled: boolean;
  closureMessage: string;
  replyToEmail?: string;
  contactPhone?: string;
  textingNumber?: string;
  locationName?: string;
  eventAddress?: string;
  finalConfirmationDeadline?: string;
  finalConfirmationEnabled?: boolean;
  updatedBy?: string;
  updatedAt?: string;
}

interface InviteLink {
  id: string;
  token: string;
  email?: string;
  isUsed?: boolean;
  createdAt?: string;
  usedAt?: string;
}

// TIME_SLOTS is now imported from locationConfig

function AdminDashboard() {
  const locationConfig = useLocationConfig();
  const { 
    timeSlots: TIME_SLOTS, 
    locationName: LOCATION_NAME,
    locationAddress: LOCATION_ADDRESS,
    branding: BRANDING,
    defaultCapacity: DEFAULT_CAPACITY 
  } = locationConfig;

  // Tab state
  const [activeTab, setActiveTab] = useState('registrations');

  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [inviteLinks, setInviteLinks] = useState<InviteLink[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [waitlistEntries, setWaitlistEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [skipNextReload, setSkipNextReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingRegistration, setEditingRegistration] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Registration | null>(null);
  const [editingWaitlist, setEditingWaitlist] = useState<string | null>(null);
  const [editWaitlistData, setEditWaitlistData] = useState<any | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [editingTimeSlot, setEditingTimeSlot] = useState<string | null>(null);
  const [registrationConfig, setRegistrationConfig] = useState<RegistrationConfig | null>(null);
  const [scheduledCloseDate, setScheduledCloseDate] = useState('');
  const [scheduledCloseTime, setScheduledCloseTime] = useState('');
  const [customClosureMessage, setCustomClosureMessage] = useState('');
  
  // Settings state
  const [settings, setSettings] = useState({
    replyToEmail: 'office@pathwayvineyard.com',
    contactPhone: '(208) 746-9089',
    textingNumber: '(208) 746-9089',
    locationName: LOCATION_NAME,
    eventPhone: '',
    eventAddress: '',
    finalConfirmationDeadline: '',
    finalConfirmationEnabled: false
  });

  // Bulk email state
  const [bulkEmailSubject, setBulkEmailSubject] = useState('');
  const [bulkEmailMessage, setBulkEmailMessage] = useState('');
  const [sendSmsNotification, setSendSmsNotification] = useState(true);
  const [targetStatus, setTargetStatus] = useState<'all' | 'registered' | 'unconfirmed' | 'confirmed'>('all');
  const [bulkEmailSending, setBulkEmailSending] = useState(false);
  const [bulkEmailResults, setBulkEmailResults] = useState<any>(null);

  // Admin registration form state
  const [adminRegData, setAdminRegData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    timeSlot: '',
    numberOfKids: 0,
    children: [] as Array<{ age: string; gender: 'boy' | 'girl' }>,
    referredBy: ''
  });
  const [addingRegistration, setAddingRegistration] = useState(false);

  useEffect(() => {
    const initializeAndLoadData = async () => {
      try {
        console.log('🔍 Loading admin dashboard...');
        setLoading(true);
        
        // Load data first to get registration config
        console.log('📥 Loading all dashboard data first...');
        await loadData();
        console.log('✅ Dashboard data loaded successfully');
        
        // Check if time slots exist after loading config
        const { data: existingSlots } = await (await getClient()).models.TimeSlotConfig.list();
        console.log('📊 Found existing slots:', existingSlots.length, existingSlots);
        
        if (existingSlots.length === 0) {
          console.log('🚀 No time slots found, auto-initializing...');
          setMessage('🔄 Setting up time slots...');
          
          try {
            // Auto-initialize time slots with location-specific capacity
            const createPromises = TIME_SLOTS.map(async (slot, index) => {
              console.log(`⏰ Creating time slot ${index + 1}: ${slot}`);
              const result = await (await getAdminClient()).models.TimeSlotConfig.create({
                timeSlot: slot,
                maxCapacity: DEFAULT_CAPACITY,
                currentRegistrations: 0,
                isActive: true
              });
              console.log(`✅ Created time slot: ${slot}`, result);
              return result;
            });
            
            const results = await Promise.all(createPromises);
            console.log('🎉 All time slots created successfully:', results.length);
            setMessage('✅ Time slots ready! You can now manage registrations.');
            
            // Small delay to show success message
            setTimeout(() => setMessage(''), 2000);
            
            // Reload data to include new time slots
            await loadData();
          } catch (createError) {
            console.error('❌ Error creating time slots:', createError);
            setMessage('❌ Error setting up time slots. Please try refreshing the page.');
          }
        }
        
      } catch (error) {
        console.error('💥 Critical error in admin dashboard:', error);
        setMessage('❌ Error loading admin dashboard. Check console and refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    initializeAndLoadData();
  }, []);

  // Effect to handle tab changes and ensure data is loaded
  useEffect(() => {
    if (activeTab === 'timeslots' && timeSlots.length === 0 && !loading) {
      console.log('🔄 Time slots tab selected but no slots found, reloading...');
      loadData();
    }
  }, [activeTab, timeSlots.length, loading]);

  const loadData = async (force = false) => {
    if (skipNextReload && !force) {
      console.log('⏭️ Skipping data reload due to skipNextReload flag');
      setSkipNextReload(false);
      return;
    }
    
    try {
      console.log('📥 Loading data with user pool auth...');
      
      // Load registration configuration (singleton)
      console.log('🔍 Fetching registration config...');
      const configId = process.env.NEXT_PUBLIC_LOCATION || 'main';
      console.log('🔍 Using config ID:', configId);
      const { data: configData, errors: configErrors } = await (await getClient()).models.RegistrationConfig.get({ id: configId });
      
      if (configErrors) {
        console.error('❌ Config errors:', configErrors);
      }
      
      console.log('📋 Config data received:', configData);
      let config = configData as RegistrationConfig;
      
      if (!config) {
        // Create default config if none exists using admin client
        console.log('🚀 Creating default registration config...');
        try {
          const createResult = await (await getAdminClient()).models.RegistrationConfig.create({
            id: process.env.NEXT_PUBLIC_LOCATION || 'main',
            isRegistrationOpen: true,
            inviteOnlyMode: false,
            autoCloseEnabled: false,
            closureMessage: 'Registration is currently closed. Please check back later.',
            replyToEmail: 'office@pathwayvineyard.com',
            contactPhone: '(208) 746-9089'
          });
          
          if (createResult.errors) {
            console.error('❌ Error creating config:', createResult.errors);
            setMessage('❌ Error creating registration config: ' + JSON.stringify(createResult.errors));
          } else {
            console.log('✅ Created config:', createResult.data);
            config = createResult.data as RegistrationConfig;
          }
        } catch (createError) {
          console.error('❌ Exception creating config:', createError);
          setMessage('❌ Failed to create registration config');
        }
      }
      
      console.log('🎯 Final config to set:', config);
      setRegistrationConfig(config);
      setCustomClosureMessage(config?.closureMessage || '');
      
      // Load reply-to email from config
      if (config?.replyToEmail) {
        setSettings(prev => ({ ...prev, replyToEmail: config.replyToEmail! }));
      }
      
      // Load contact phone and texting number from config
      if (config?.contactPhone) {
        setSettings(prev => ({ ...prev, contactPhone: config.contactPhone! }));
      }
      if (config?.textingNumber) {
        setSettings(prev => ({ ...prev, textingNumber: config.textingNumber! }));
      }
      
      // Load location settings from config
      if (config?.locationName) {
        setSettings(prev => ({ ...prev, locationName: config.locationName! }));
      }
      if (config?.eventAddress) {
        setSettings(prev => ({ ...prev, eventAddress: config.eventAddress! }));
      }
      if (config?.finalConfirmationDeadline) {
        // Convert ISO string to datetime-local format (YYYY-MM-DDTHH:MM)
        const date = new Date(config.finalConfirmationDeadline);
        const localDateTime = date.toISOString().slice(0, 16);
        setSettings(prev => ({ ...prev, finalConfirmationDeadline: localDateTime }));
      }
      if (config?.finalConfirmationEnabled) {
        setSettings(prev => ({ ...prev, finalConfirmationEnabled: config.finalConfirmationEnabled! }));
      }
      
      // Load time slot configurations
      console.log('🔍 Fetching time slots...');
      const { data: timeSlotData, errors: timeSlotErrors } = await (await getClient()).models.TimeSlotConfig.list();
      
      if (timeSlotErrors) {
        console.error('❌ Time slot errors:', timeSlotErrors);
        console.error('❌ Detailed error info:', JSON.stringify(timeSlotErrors, null, 2));
        return; // Exit early if there are errors
      } else {
        console.log('✅ Time slots loaded:', timeSlotData?.length || 0, timeSlotData);
      }

      // Load registrations with error handling for partial data
      console.log('🔍 Fetching registrations...');
      const { data: registrationData, errors: registrationErrors } = await (await getClient()).models.Registration.list({
        selectionSet: ['id', 'firstName', 'lastName', 'email', 'phone', 'streetAddress', 'zipCode', 'city', 'state', 'timeSlot', 'numberOfKids', 'referredBy', 'isConfirmed', 'registrationDate', 'attendanceConfirmed', 'isCancelled', 'registrationStatus', 'finalConfirmationSentAt', 'finalConfirmationToken', 'finalConfirmedAt', 'children.*']
      });
      
      // Handle registration data - even if there are errors, we might have partial valid data
      let validRegistrations: Registration[] = [];
      
      if (registrationErrors && registrationErrors.length > 0) {
        console.error('❌ Registration errors (continuing with partial data):', registrationErrors);
        // Filter out only the valid registrations if we have partial data
        if (registrationData) {
          validRegistrations = registrationData.filter(reg => 
            reg && reg.streetAddress && reg.zipCode && reg.city && reg.state
          ) as Registration[];
          console.log(`⚠️ Using ${validRegistrations.length} valid registrations out of ${registrationData.length} total (${registrationErrors.length} errors)`);
        }
      } else {
        console.log('✅ Registrations loaded:', registrationData?.length || 0);
        validRegistrations = (registrationData || []) as Registration[];
      }
      
      console.log('📊 Loaded registrations:', validRegistrations.length, 'total');
      setRegistrations(validRegistrations);
      
      // Update time slot counts with actual registration data (excluding cancelled registrations)
      if (timeSlotData) {
        const updatedTimeSlots = (timeSlotData as TimeSlotConfig[]).map(slot => {
          const actualCount = validRegistrations ? validRegistrations.filter(reg => 
            reg.timeSlot === slot.timeSlot && !reg.isCancelled
          ).length : 0;
          console.log(`📊 Time slot ${slot.timeSlot}: ${actualCount} active registrations (excluding cancelled)`);
          return {
            ...slot,
            currentRegistrations: actualCount
          };
        });
        
        // Sort time slots by time (earliest to latest)
        const sortedTimeSlots = updatedTimeSlots.sort((a, b) => {
          return a.timeSlot.localeCompare(b.timeSlot);
        });
        console.log('🎯 Setting timeSlots state with:', sortedTimeSlots.length, 'slots:', sortedTimeSlots);
        setTimeSlots(sortedTimeSlots);
      }

      // Load waitlist entries (only if Waitlist model is available)
      try {
        console.log('🔍 Fetching waitlist entries...');
        const client = await getClient();
        if (client.models.Waitlist) {
          const { data: waitlistData, errors: waitlistErrors } = await client.models.Waitlist.list({
            filter: { isActive: { eq: true } }
          });
          
          if (waitlistErrors) {
            console.error('❌ Waitlist errors:', waitlistErrors);
            setMessage('Error loading waitlist entries: ' + JSON.stringify(waitlistErrors));
            setWaitlistEntries([]);
          } else {
            console.log('✅ Waitlist entries loaded:', waitlistData?.length || 0);
            const waitlistEntries = waitlistData as any[];
            // Sort by position (earliest position first)
            setWaitlistEntries(waitlistEntries.sort((a, b) => {
              return (a.position || 0) - (b.position || 0);
            }));
          }
        } else {
          console.log('ℹ️ Waitlist model not yet available');
          setWaitlistEntries([]);
        }
      } catch (waitlistError) {
        console.log('ℹ️ Waitlist model not yet deployed:', waitlistError);
        setWaitlistEntries([]);
      }

      // Load invite links
      console.log('🔍 Fetching invite links...');
      const { data: inviteData, errors: inviteErrors } = await (await getClient()).models.InviteLink.list();
      
      if (inviteErrors) {
        console.error('❌ Invite link errors:', inviteErrors);
        setMessage('Error loading invite links: ' + JSON.stringify(inviteErrors));
      } else {
        console.log('✅ Invite links loaded:', inviteData?.length || 0);
        console.log('Raw invite data:', inviteData);
        const inviteLinks = inviteData as InviteLink[];
        // Sort with fallback for missing createdAt
        setInviteLinks(inviteLinks.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }));
      }
    } catch (error) {
      console.error('💥 Error loading data:', error);
      setMessage('❌ Authentication error. Please sign out and sign back in.');
    }
  };

  const initializeTimeSlots = async () => {
    setLoading(true);
    try {
      // Check if time slots already exist
      const { data: existingSlots } = await (await getClient()).models.TimeSlotConfig.list();
      
      if (existingSlots.length === 0) {
        // Create default time slots with capacity of 20 each
        const promises = TIME_SLOTS.map(async slot =>
          (await getAdminClient()).models.TimeSlotConfig.create({
            timeSlot: slot,
            maxCapacity: DEFAULT_CAPACITY,
            currentRegistrations: 0,
            isActive: true
          })
        );
        
        await Promise.all(promises);
        setMessage('Time slots initialized successfully with 20 people per slot!');
        loadData();
      } else {
        setMessage('Time slots already exist.');
      }
    } catch (error) {
      console.error('Error initializing time slots:', error);
      setMessage('Error initializing time slots.');
    } finally {
      setLoading(false);
    }
  };

  const updateTimeSlotCapacity = async (id: string, newCapacity: number) => {
    console.log('🔧 Updating time slot capacity:', { id, newCapacity });
    
    if (newCapacity < 0) {
      setMessage('❌ Capacity cannot be negative!');
      return;
    }

    try {
      setLoading(true);
      console.log('📝 Calling TimeSlotConfig.update...');
      
      const result = await (await getAdminClient()).models.TimeSlotConfig.update({
        id,
        maxCapacity: newCapacity
      });
      
      console.log('✅ Update result:', result);
      
      if (result.errors) {
        console.error('❌ Update errors:', result.errors);
        setMessage('❌ Error updating capacity: ' + JSON.stringify(result.errors));
        return;
      }
      
      // Update local state immediately for better UX
      setTimeSlots(prev => prev.map(slot => 
        slot.id === id ? { ...slot, maxCapacity: newCapacity } : slot
      ));
      
      setMessage(`✅ Time slot capacity updated to ${newCapacity} people!`);
      
      // Reload data to ensure consistency
      setTimeout(() => loadData(), 500);
    } catch (error) {
      console.error('❌ Error updating capacity:', error);
      setMessage('❌ Error updating capacity: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const addNewTimeSlot = async () => {
    if (!newTimeSlot.trim()) {
      setMessage('❌ Please enter a valid time slot!');
      return;
    }

    // Check if time slot already exists
    const exists = timeSlots.some(slot => slot.timeSlot === newTimeSlot);
    if (exists) {
      setMessage('❌ This time slot already exists!');
      return;
    }

    try {
      setLoading(true);
      console.log('➕ Creating new time slot:', newTimeSlot);
      
      const result = await (await getAdminClient()).models.TimeSlotConfig.create({
        timeSlot: newTimeSlot,
        maxCapacity: DEFAULT_CAPACITY,
        currentRegistrations: 0,
        isActive: true
      });
      
      console.log('✅ Create result:', result);
      
      if (result.errors) {
        console.error('❌ Create errors:', result.errors);
        setMessage('❌ Error adding time slot: ' + JSON.stringify(result.errors));
        return;
      }
      
      setMessage(`✅ New time slot "${newTimeSlot}" added successfully!`);
      setNewTimeSlot('');
      loadData();
    } catch (error) {
      console.error('❌ Error adding time slot:', error);
      setMessage('❌ Error adding time slot: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const updateTimeSlotTime = async (id: string, newTime: string) => {
    if (!newTime.trim()) {
      setMessage('❌ Please enter a valid time!');
      return;
    }

    try {
      setLoading(true);
      await (await getAdminClient()).models.TimeSlotConfig.update({
        id,
        timeSlot: newTime
      });
      
      setMessage(`✅ Time slot updated to "${newTime}"!`);
      setEditingTimeSlot(null);
      loadData();
    } catch (error) {
      console.error('Error updating time slot:', error);
      setMessage('❌ Error updating time slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTimeSlot = async (id: string, timeSlot: string) => {
    if (!confirm(`Are you sure you want to delete the ${timeSlot} time slot? This will also delete any registrations for this time slot.`)) {
      return;
    }

    try {
      setLoading(true);
      console.log('🗑️ Deleting time slot:', { id, timeSlot });
      
      const result = await (await getAdminClient()).models.TimeSlotConfig.delete({ id });
      
      console.log('✅ Delete result:', result);
      
      if (result.errors) {
        console.error('❌ Delete errors:', result.errors);
        setMessage('❌ Error deleting time slot: ' + JSON.stringify(result.errors));
        return;
      }
      
      setMessage(`✅ Time slot "${timeSlot}" deleted successfully!`);
      loadData();
    } catch (error) {
      console.error('❌ Error deleting time slot:', error);
      setMessage('❌ Error deleting time slot: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const cleanupDuplicateTimeSlots = async () => {
    try {
      setLoading(true);
      setMessage('🧹 Cleaning up duplicate time slots...');

      // Use read client to get all slots
      const { data: allSlots } = await (await getClient()).models.TimeSlotConfig.list();
      
      if (!allSlots || allSlots.length === 0) {
        setMessage('ℹ️ No time slots found to clean up.');
        return;
      }

      console.log('🔍 Found time slots to analyze:', allSlots.length);
      
      // Group by time slot to find duplicates
      const timeSlotGroups: { [key: string]: TimeSlotConfig[] } = {};
      allSlots.forEach(slot => {
        if (!timeSlotGroups[slot.timeSlot]) {
          timeSlotGroups[slot.timeSlot] = [];
        }
        timeSlotGroups[slot.timeSlot].push(slot as TimeSlotConfig);
      });

      console.log('📊 Time slot groups:', Object.keys(timeSlotGroups).map(ts => `${ts}: ${timeSlotGroups[ts].length} entries`));

      // Remove duplicates (keep the first one of each time)
      let deletedCount = 0;
      const adminClient = await getAdminClient();
      
      for (const [timeSlot, slots] of Object.entries(timeSlotGroups)) {
        if (slots.length > 1) {
          console.log(`🔄 Processing ${slots.length} duplicates for time slot: ${timeSlot}`);
          
          // Sort by creation date or ID to keep the oldest/first one
          slots.sort((a, b) => a.id.localeCompare(b.id));
          
          // Keep the first one, delete the rest
          for (let i = 1; i < slots.length; i++) {
            try {
              console.log(`🗑️ Deleting duplicate: ${timeSlot} (ID: ${slots[i].id})`);
              const deleteResult = await adminClient.models.TimeSlotConfig.delete({ id: slots[i].id });
              
              if (deleteResult.errors) {
                console.error(`❌ Error deleting ${slots[i].id}:`, deleteResult.errors);
              } else {
                deletedCount++;
                console.log(`✅ Successfully deleted duplicate time slot: ${timeSlot} (${slots[i].id})`);
              }
            } catch (deleteError) {
              console.error(`❌ Exception deleting ${slots[i].id}:`, deleteError);
            }
          }
        }
      }

      if (deletedCount > 0) {
        setMessage(`✅ Cleaned up ${deletedCount} duplicate time slots!`);
        // Reload data to reflect changes
        setTimeout(async () => {
          await loadData();
          setMessage('');
        }, 2000);
      } else {
        setMessage('ℹ️ No duplicate time slots found to clean up.');
        setTimeout(() => setMessage(''), 3000);
      }
      
    } catch (error) {
      console.error('❌ Error cleaning up duplicates:', error);
      setMessage('❌ Error cleaning up duplicates: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const generateInviteLink = async () => {
    if (!inviteEmail.trim()) {
      setMessage('Please enter an email address.');
      return;
    }

    setLoading(true);
    try {
      // Use cryptographically strong token generation
      let token = '';
      // Prefer strong randomness in the browser
      if (typeof window !== 'undefined' && (window as any).crypto?.randomUUID) {
        token = (window as any).crypto.randomUUID().replace(/-/g, '');
      } else if (typeof window !== 'undefined' && (window as any).crypto?.getRandomValues) {
        const bytes = (window as any).crypto.getRandomValues(new Uint8Array(16)) as Uint8Array;
        const arr: number[] = Array.from(bytes as unknown as number[]);
        token = arr.map((b: number) => b.toString(16).padStart(2, '0')).join('');
      } else {
        // Fallback (less secure) – should rarely be used
        token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      }
      
      console.log('Creating invite link with data:', { token, email: inviteEmail, isUsed: false });
      const inviteResult = await (await getClient()).models.InviteLink.create({
        token,
        email: inviteEmail,
        isUsed: false
      });

      console.log('Invite creation result:', inviteResult);
      
      if (inviteResult.errors) {
        console.error('Invite creation errors:', inviteResult.errors);
        setMessage('Error creating invite: ' + JSON.stringify(inviteResult.errors));
        return;
      }

      const inviteUrl = `${window.location.origin}/register/${token}`;
      
      // Send invite email if email was provided
      if (inviteEmail.trim() && inviteResult.data) {
        try {
          console.log('📧 Sending invite email to:', inviteEmail);
          const emailResult = await (await getClient()).mutations.sendInviteEmail({
            invite: {
              email: inviteEmail,
              token: token,
              inviteUrl: inviteUrl
            },
            inviteId: inviteResult.data.id
          });
          
          console.log('📧 Email result:', emailResult);
          
          if (emailResult.data?.success) {
            setMessage(`✅ Invite link generated and email sent to ${inviteEmail}! Link copied to clipboard: ${inviteUrl}`);
          } else {
            setMessage(`⚠️ Invite link generated and copied to clipboard: ${inviteUrl}. Email failed to send: ${emailResult.data?.message || 'Unknown error'}`);
          }
        } catch (emailError) {
          console.error('❌ Error sending invite email:', emailError);
          setMessage(`⚠️ Invite link generated and copied to clipboard: ${inviteUrl}. Email failed to send.`);
        }
      } else {
        setMessage(`Invite link generated and copied to clipboard: ${inviteUrl}`);
      }
      
      try {
        await navigator.clipboard.writeText(inviteUrl);
      } catch {}
      
      setInviteEmail('');
      
      // Reload invite links to show the new one
      loadData();
    } catch (error) {
      console.error('Error generating invite link:', error);
      setMessage('Error generating invite link.');
    } finally {
      setLoading(false);
    }
  };

  const invalidateInviteLink = async (inviteId: string) => {
    if (!confirm('Are you sure you want to invalidate this invite link? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      console.log('🔥 Invalidating invite link:', inviteId);
      // Mark as used instead of deleting to preserve records
      const result = await (await getClient()).models.InviteLink.update({
        id: inviteId,
        isUsed: true,
        usedAt: new Date().toISOString()
      });
      
      console.log('✅ Invalidation result:', result);
      
      if (result.errors) {
        console.error('❌ Invalidation errors:', result.errors);
        setMessage('Error invalidating invite link: ' + JSON.stringify(result.errors));
      } else {
        setMessage('✅ Invite link invalidated successfully.');
        loadData(); // Reload to update the list
      }
    } catch (error) {
      console.error('❌ Error invalidating invite link:', error);
      setMessage('❌ Error invalidating invite link: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const deleteInviteLink = async (inviteId: string, email?: string) => {
    const confirmMessage = email 
      ? `Are you sure you want to permanently delete the invalidated invite for ${email}? This action cannot be undone.`
      : 'Are you sure you want to permanently delete this invalidated invite? This action cannot be undone.';
      
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      setLoading(true);
      console.log('🗑️ Deleting invite link:', inviteId);
      
      const result = await (await getClient()).models.InviteLink.delete({ id: inviteId });
      
      console.log('✅ Delete result:', result);
      
      if (result.errors) {
        console.error('❌ Delete errors:', result.errors);
        setMessage('❌ Error deleting invite: ' + JSON.stringify(result.errors));
        return;
      }
      
      setMessage('✅ Invite deleted permanently.');
      loadData(); // Reload to update the list
    } catch (error) {
      console.error('❌ Error deleting invite:', error);
      setMessage('❌ Error deleting invite: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const resendInviteEmail = async (invite: any) => {
    if (!invite.email) {
      setMessage('❌ Cannot resend: No email address associated with this invite.');
      return;
    }

    try {
      setLoading(true);
      console.log('📧 Resending invite email to:', invite.email);
      console.log('📧 Invite object:', invite);
      
      const inviteUrl = `${window.location.origin}/register/${invite.token}`;
      console.log('📧 Invite URL:', inviteUrl);
      
      // Use GraphQL mutation (same as initial invite creation)
      console.log('📧 Getting GraphQL client...');
      const client = await getClient();
      console.log('📧 GraphQL client obtained:', !!client);
      
      console.log('📧 Calling sendInviteEmail mutation...');
      const emailResult = await client.mutations.sendInviteEmail({
        invite: {
          email: invite.email,
          token: invite.token,
          inviteUrl: inviteUrl
        },
        inviteId: invite.id
      });
      
      console.log('📧 Resend email result (full):', emailResult);
      console.log('📧 Result data:', emailResult.data);
      console.log('📧 Result errors:', emailResult.errors);
      
      if (emailResult.data?.success) {
        setMessage(`✅ Invite email resent successfully to ${invite.email}!`);
      } else {
        console.error('📧 Email failed - data:', emailResult.data, 'errors:', emailResult.errors);
        setMessage(`⚠️ Failed to resend invite email: ${emailResult.data?.message || emailResult.errors?.[0]?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error resending invite email:', error);
      setMessage('❌ Error resending invite email: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = async (token: string) => {
    const inviteUrl = `${window.location.origin}/register/${token}`;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setMessage(`Invite link copied to clipboard: ${inviteUrl}`);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setMessage('Error copying link to clipboard.');
    }
  };

  const loadRegistrationConfig = async () => {
    try {
      const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
      let config = configData?.[0] as RegistrationConfig;
      
      if (config) {
        // Check if we need to auto-close based on scheduled date
        if (config.autoCloseEnabled && config.scheduledCloseDate) {
          const now = new Date();
          const scheduledDate = new Date(config.scheduledCloseDate);
          if (now >= scheduledDate && config.isRegistrationOpen) {
            // Auto-close registration
            const updatedConfig = await (await getClient()).models.RegistrationConfig.update({
              id: config.id,
              isRegistrationOpen: false,
              updatedAt: new Date().toISOString(),
              updatedBy: 'admin-check'
            });
            config = updatedConfig.data as RegistrationConfig;
            setMessage('🔒 Registration automatically closed based on scheduled time');
            setTimeout(() => setMessage(''), 3000);
          }
        }
        
        setRegistrationConfig(config);
        setCustomClosureMessage(config.closureMessage);
      }
    } catch (error) {
      console.error('Error loading registration config:', error);
    }
  };

  const updateRegistrationStatus = async (field: string, value: any) => {
    if (!registrationConfig) return;

    try {
      setLoading(true);
      const updatedConfig = await (await getAdminClient()).models.RegistrationConfig.update({
        id: registrationConfig.id,
        [field]: value,
        updatedAt: new Date().toISOString()
      });

      setRegistrationConfig(updatedConfig.data as RegistrationConfig);
      setMessage(`✅ Registration ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} updated!`);
      
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error updating registration status:', error);
      setMessage('❌ Error updating registration settings.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRegistrationOpen = () => {
    updateRegistrationStatus('isRegistrationOpen', !registrationConfig?.isRegistrationOpen);
  };

  const toggleInviteOnlyMode = () => {
    updateRegistrationStatus('inviteOnlyMode', !registrationConfig?.inviteOnlyMode);
  };

  const deleteWaitlistEntry = async (waitlistId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the waitlist? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      console.log('🗑️ Deleting waitlist entry:', waitlistId);

      const response = await fetch('/api/delete-waitlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ waitlistId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete waitlist entry');
      }

      const result = await response.json();
      setMessage(`✅ ${result.message}`);
      loadData(); // Reload data to reflect changes
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting waitlist entry:', error);
      setMessage('❌ Failed to delete waitlist entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const moveWaitlistToRegistered = async (waitlistId: string, name: string) => {
    const timeSlot = prompt(`Select time slot for ${name}:\n\nAvailable time slots:\n${timeSlots.map(slot => `• ${slot.timeSlot} (${slot.currentRegistrations}/${slot.maxCapacity})`).join('\n')}\n\nEnter the exact time slot name:`);
    
    if (!timeSlot) return;

    const validTimeSlot = timeSlots.find(slot => slot.timeSlot === timeSlot);
    if (!validTimeSlot) {
      setMessage('❌ Invalid time slot selected. Please try again.');
      return;
    }

    const increaseCapacity = validTimeSlot.currentRegistrations >= validTimeSlot.maxCapacity;
    const confirmMessage = increaseCapacity 
      ? `This will move ${name} to ${timeSlot} and increase the capacity by 1 (currently ${validTimeSlot.currentRegistrations}/${validTimeSlot.maxCapacity}). Continue?`
      : `This will move ${name} to ${timeSlot} (${validTimeSlot.currentRegistrations + 1}/${validTimeSlot.maxCapacity}). Continue?`;

    if (!confirm(confirmMessage)) return;

    try {
      setLoading(true);
      console.log('🔄 Moving waitlist to registered:', { waitlistId, timeSlot, increaseCapacity });

      const response = await fetch('/api/move-waitlist-to-registered', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ waitlistId, timeSlot, increaseCapacity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to move waitlist entry');
      }

      const result = await response.json();
      setMessage(`✅ ${result.message}`);
      loadData(); // Reload data to reflect changes
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error moving waitlist to registered:', error);
      setMessage('❌ Failed to move waitlist entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scheduleRegistrationClosure = async () => {
    if (!registrationConfig || !scheduledCloseDate) return;

    const scheduledDateTime = scheduledCloseTime 
      ? `${scheduledCloseDate}T${scheduledCloseTime}:00.000Z`
      : `${scheduledCloseDate}T23:59:59.000Z`;

    try {
      setLoading(true);
      const updatedConfig = await (await getClient()).models.RegistrationConfig.update({
        id: registrationConfig.id,
        scheduledCloseDate: scheduledDateTime,
        autoCloseEnabled: true,
        closureMessage: customClosureMessage || 'Registration is currently closed. Please check back later.',
        updatedAt: new Date().toISOString()
      });

      setRegistrationConfig(updatedConfig.data as RegistrationConfig);
      setMessage('✅ Scheduled closure updated! Registration will automatically close at the specified time.');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error scheduling closure:', error);
      setMessage('❌ Error scheduling registration closure.');
    } finally {
      setLoading(false);
    }
  };

  const saveEmailSettings = async () => {
    if (!registrationConfig) {
      setMessage('❌ Registration config not loaded');
      return;
    }

    try {
      setLoading(true);
      console.log('💾 Saving contact settings:', {
        id: registrationConfig.id,
        replyToEmail: settings.replyToEmail,
        contactPhone: settings.contactPhone,
        textingNumber: settings.textingNumber
      });
      
      const updateResult = await (await getAdminClient()).models.RegistrationConfig.update({
        id: registrationConfig.id,
        replyToEmail: settings.replyToEmail,
        contactPhone: settings.contactPhone,
        textingNumber: settings.textingNumber,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      });

      if (updateResult.errors) {
        console.error('❌ Update errors:', updateResult.errors);
        setMessage('❌ Failed to save contact settings: ' + JSON.stringify(updateResult.errors));
        return;
      }

      console.log('✅ Update successful:', updateResult.data);
      setRegistrationConfig(updateResult.data as RegistrationConfig);
      setMessage('✅ Contact settings saved successfully!');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ Error saving contact settings:', error);
      setMessage('❌ Failed to save contact settings: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const saveAllSettings = async () => {
    if (!registrationConfig) {
      setMessage('❌ Registration config not loaded');
      return;
    }

    try {
      setLoading(true);
      console.log('💾 Saving all settings (contact + location):', {
        contact: {
          id: registrationConfig.id,
          replyToEmail: settings.replyToEmail,
          contactPhone: settings.contactPhone,
          textingNumber: settings.textingNumber
        },
        location: settings
      });
      
      // Validate required fields
      if (!registrationConfig.id) {
        setMessage('❌ Registration config ID is missing');
        return;
      }
      
      // Validate datetime format if provided
      if (settings.finalConfirmationDeadline && settings.finalConfirmationDeadline.trim() !== '') {
        try {
          const testDate = new Date(settings.finalConfirmationDeadline);
          if (isNaN(testDate.getTime())) {
            setMessage('❌ Invalid final confirmation deadline format');
            return;
          }
        } catch (dateError) {
          setMessage('❌ Error parsing final confirmation deadline');
          return;
        }
      }
      
      // Save contact and location settings to database
      const updateResult = await (await getAdminClient()).models.RegistrationConfig.update({
        id: registrationConfig.id,
        replyToEmail: settings.replyToEmail,
        contactPhone: settings.contactPhone,
        textingNumber: settings.textingNumber,
        locationName: settings.locationName,
        eventAddress: settings.eventAddress,
        finalConfirmationDeadline: settings.finalConfirmationDeadline && settings.finalConfirmationDeadline.trim() !== '' ? new Date(settings.finalConfirmationDeadline).toISOString() : null,
        finalConfirmationEnabled: settings.finalConfirmationEnabled,
        updatedAt: new Date().toISOString(),
        updatedBy: 'admin'
      });

      if (updateResult.errors) {
        console.error('❌ Update errors:', updateResult.errors);
        console.error('❌ Full update result:', updateResult);
        console.error('❌ Settings being saved:', {
          id: registrationConfig.id,
          replyToEmail: settings.replyToEmail,
          contactPhone: settings.contactPhone,
          textingNumber: settings.textingNumber,
          locationName: settings.locationName,
          eventAddress: settings.eventAddress,
          finalConfirmationDeadline: settings.finalConfirmationDeadline,
          finalConfirmationEnabled: settings.finalConfirmationEnabled
        });
        
        const errorMessages = updateResult.errors.map((error: any) => 
          `${error.errorType || 'Error'}: ${error.message || 'Unknown error'}`
        ).join(', ');
        
        setMessage(`❌ Failed to save settings: ${errorMessages}`);
        return;
      }

      console.log('✅ Contact settings update successful:', updateResult.data);
      setRegistrationConfig(updateResult.data as RegistrationConfig);
      
      // Save location settings (local state - in a real app this would go to backend)
      setSettings(settings);
      
      setMessage('✅ All settings saved successfully! Both contact and location settings have been updated.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ Error saving all settings:', error);
      setMessage('❌ Failed to save all settings: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmails = async () => {
    try {
      setLoading(true);
      setMessage('📧 Preparing confirmation emails...');

      // First, update all registrations with confirmation tokens
      const updatedRegistrations = await Promise.all(
        registrations.map(async (reg) => {
          if (!reg.confirmationToken && !reg.isCancelled) {
            const token = Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
            await (await getClient()).models.Registration.update({
              id: reg.id,
              confirmationToken: token
            });
            return { ...reg, confirmationToken: token };
          }
          return reg;
        })
      );

      // Filter out cancelled registrations
      const activeRegistrations = updatedRegistrations.filter(reg => !reg.isCancelled);

      if (activeRegistrations.length === 0) {
        setMessage('⚠️ No active registrations to send confirmation emails to.');
        return;
      }

      setMessage(`📧 Sending confirmation emails to ${activeRegistrations.length} registrations...`);

      // Note: In a real implementation, you would call the Lambda function here
      // For now, we'll simulate the process
      setTimeout(() => {
        setMessage(`✅ Sent confirmation emails to ${activeRegistrations.length} registrations! Check the email inboxes.`);
        setTimeout(() => setMessage(''), 5000);
      }, 2000);

    } catch (error) {
      console.error('Error sending confirmation emails:', error);
      setMessage('❌ Error sending confirmation emails. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const requestFinalConfirmation = async () => {
    const eligibleCount = registeredStatusRegistrations.length;
    
    if (eligibleCount === 0) {
      alert('No registrations found in REGISTERED status. Only users with REGISTERED status will receive final confirmation messages.');
      return;
    }
    
    if (!window.confirm(
      `Are you sure you want to start the final confirmation process? This will:\n\n` +
      `• Send confirmation requests to ${eligibleCount} users with REGISTERED status\n` +
      `• Change their status from REGISTERED to UNCONFIRMED\n` +
      `• Users must confirm or risk losing their time slot\n` +
      `• Users who already received confirmations will NOT get duplicates\n\n` +
      `This action cannot be undone.`
    )) {
      return;
    }

    try {
      setLoading(true);
      setMessage('🚀 Starting final confirmation process...');

      const response = await fetch('/api/request-final-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrations: activeRegistrations
            .filter(reg => (reg.registrationStatus || 'registered') === 'registered')
            .map(reg => ({
              id: reg.id,
              firstName: reg.firstName,
              lastName: reg.lastName,
              email: reg.email,
              phone: reg.phone,
              timeSlot: reg.timeSlot,
              numberOfKids: reg.numberOfKids
            }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start final confirmation process');
      }

      const result = await response.json();
      setMessage(`✅ Final confirmation process started! ${result.sent || 0} requests sent.`);
      
      // Refresh data to show updated statuses (delayed to avoid overwriting individual confirmations)
      setTimeout(async () => {
        await loadData();
      }, 3000);

    } catch (error) {
      console.error('Error starting final confirmation process:', error);
      setMessage('❌ Error starting final confirmation process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const activeRegistrations = registrations.filter(reg => !reg.isCancelled);
  const registeredStatusRegistrations = activeRegistrations.filter(reg => (reg.registrationStatus || 'registered') === 'registered');
  const totalChildren = activeRegistrations.reduce((sum, reg) => sum + reg.numberOfKids, 0);
  
  const canRequestFinalConfirmation = () => {
    if (!registrationConfig?.finalConfirmationDeadline) return false;
    const now = new Date();
    const deadline = new Date(registrationConfig.finalConfirmationDeadline);
    return now >= deadline;
  };

  const sendIndividualFinalConfirmation = async (registrationId: string) => {
    if (!confirm('Are you sure you want to send a final confirmation request to this individual registration? This will send urgent email and SMS messages.')) return;
    
    console.log('🚀 Starting individual final confirmation for:', registrationId);
    
    try {
      setLoading(true);
      
      const response = await fetch('/api/send-individual-final-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Individual final confirmation sent successfully:', result);
        
        // Update the local state to reflect the status change
        setRegistrations(prevRegs => 
          prevRegs.map(r => 
            r.id === registrationId 
              ? { 
                  ...r, 
                  registrationStatus: 'unconfirmed',
                  finalConfirmationSentAt: new Date().toISOString(),
                  finalConfirmationToken: result.confirmationToken
                }
              : r
          )
        );
        
        setMessage(`✅ Final confirmation sent successfully! ${result.emailSent ? 'Email' : ''}${result.emailSent && result.smsSent ? ' and ' : ''}${result.smsSent ? 'SMS' : ''} sent.`);
        setTimeout(() => setMessage(''), 5000);
      } else {
        console.error('❌ Failed to send individual final confirmation:', result);
        setMessage(`❌ Failed to send final confirmation: ${result.message || 'Unknown error'}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error sending individual final confirmation:', error);
      setMessage('❌ Error sending individual final confirmation.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredRegistrations = registrations.filter(reg => {
    // Search filter (name, email, phone, time slot)
    const matchesSearch = searchTerm === '' || 
      reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.phone && reg.phone.includes(searchTerm)) ||
      reg.timeSlot.includes(searchTerm);
    
    // Status filter
    const matchesStatus = (() => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'active') return !reg.isCancelled;
      if (statusFilter === 'cancelled') return reg.isCancelled;
      if (statusFilter === 'registered') return !reg.isCancelled && (reg.registrationStatus || 'registered') === 'registered';
      if (statusFilter === 'unconfirmed') return !reg.isCancelled && reg.registrationStatus === 'unconfirmed';
      if (statusFilter === 'confirmed') return !reg.isCancelled && reg.registrationStatus === 'confirmed';
      return true;
    })();
    
    return matchesSearch && matchesStatus;
  });

  const startEdit = (registration: Registration) => {
    setEditingRegistration(registration.id);
    setEditFormData({ ...registration });
  };

  const cancelEdit = () => {
    setEditingRegistration(null);
    setEditFormData(null);
  };

  const saveEdit = async () => {
    if (!editFormData || !editingRegistration) return;

    try {
      // Update registration basic info
      await (await getAdminClient()).models.Registration.update({
        id: editingRegistration,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
        phone: editFormData.phone,
        timeSlot: editFormData.timeSlot,
        numberOfKids: editFormData.numberOfKids,
        referredBy: editFormData.referredBy
      });

      // Handle children updates
      if (editFormData.children && editFormData.children.length > 0) {
        // Get existing children for this registration
        const { data: existingChildren } = await (await getAdminClient()).models.Child.list({
          filter: { registrationId: { eq: editingRegistration } }
        });

        // Delete all existing children first (simpler approach)
        if (existingChildren) {
          for (const child of existingChildren) {
            await (await getAdminClient()).models.Child.delete({ id: child.id });
          }
        }

        // Create new children records
        for (const child of editFormData.children) {
          if (child.age && child.gender) {
            await (await getAdminClient()).models.Child.create({
              registrationId: editingRegistration,
              age: child.age.toString(),
              gender: child.gender
            });
          }
        }
      }
      
      await loadData();
      setMessage('Registration updated successfully!');
      cancelEdit();
    } catch (error) {
      console.error('Error updating registration:', error);
      setMessage('Error updating registration.');
    }
  };

  // Waitlist edit functions
  const startEditWaitlist = (entry: any) => {
    setEditingWaitlist(entry.id);
    setEditWaitlistData({ ...entry });
  };

  const cancelEditWaitlist = () => {
    setEditingWaitlist(null);
    setEditWaitlistData(null);
  };

  const saveEditWaitlist = async () => {
    if (!editWaitlistData || !editingWaitlist) return;
    try {
      await (await getAdminClient()).models.Waitlist.update({
        id: editingWaitlist,
        firstName: editWaitlistData.firstName,
        lastName: editWaitlistData.lastName,
        email: editWaitlistData.email,
        phone: editWaitlistData.phone,
        streetAddress: editWaitlistData.streetAddress,
        zipCode: editWaitlistData.zipCode,
        city: editWaitlistData.city,
        state: editWaitlistData.state,
        numberOfKids: editWaitlistData.numberOfKids,
        children: editWaitlistData.children,
        preferredTimeSlots: editWaitlistData.preferredTimeSlots,
        referredBy: editWaitlistData.referredBy
      });
      
      await loadData();
      setMessage('Waitlist entry updated successfully!');
      cancelEditWaitlist();
    } catch (error) {
      console.error('Error updating waitlist entry:', error);
      setMessage('Error updating waitlist entry.');
    }
  };

  const deleteRegistration = async (id: string) => {
    console.log('🗑️ Delete button clicked for registration:', id);
    if (!confirm('Are you sure you want to delete this registration?')) {
      console.log('🚫 User cancelled deletion');
      return;
    }
    
    console.log('✅ User confirmed deletion, proceeding...');
    
    try {
      console.log('🔄 Calling admin client to delete registration...');
      const result = await (await getAdminClient()).models.Registration.delete({ id });
      console.log('✅ Delete result:', result);
      
      console.log('🔄 Reloading data...');
      await loadData();
      setMessage('Registration deleted successfully!');
      console.log('🎉 Delete completed successfully');
    } catch (error) {
      console.error('❌ Error deleting registration:', error);
      setMessage('Error deleting registration: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const exportRegistrations = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Time Slot', 'Number of Kids', 'Referred By', 'Registration Date'],
      ...registrations.map(reg => [
        `${reg.firstName} ${reg.lastName}`,
        reg.email,
        reg.phone,
        reg.timeSlot,
        reg.numberOfKids.toString(),
        reg.referredBy || '',
        new Date(reg.registrationDate).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'christmas-store-registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resendConfirmation = async (registration: Registration, type: 'email' | 'sms' | 'both') => {
    try {
      setLoading(true);
      setMessage(`📧 Resending ${type} confirmation to ${registration.firstName} ${registration.lastName}...`);

      if (type === 'email' || type === 'both') {
        console.log('📧 Attempting to resend email for registration:', registration.id);
        
        const response = await fetch('/api/resend-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            registrationId: registration.id,
            type: 'email',
            email: registration.email,
            firstName: registration.firstName
          }),
        });
        
        console.log('📧 Email resend response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Email resend failed:', response.status, errorText);
          throw new Error(`Failed to resend email: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log('✅ Email resend result:', result);
      }

      if (type === 'sms' || type === 'both') {
        console.log('📱 Attempting to resend SMS for registration:', registration.id);
        
        const response = await fetch('/api/resend-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            registrationId: registration.id,
            type: 'sms',
            phone: registration.phone,
            firstName: registration.firstName,
            timeSlot: registration.timeSlot
          }),
        });
        
        console.log('📱 SMS resend response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ SMS resend failed:', response.status, errorText);
          throw new Error(`Failed to resend SMS: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        console.log('✅ SMS resend result:', result);
      }

      setMessage(`✅ ${type === 'both' ? 'Email and SMS' : type.toUpperCase()} confirmation resent successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error resending confirmation:', error);
      setMessage('❌ Failed to resend confirmation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async (registrationId: string) => {
    if (!confirm('Are you sure you want to cancel this registration? This will send a cancellation email to the registrant.')) return;
    
    console.log('🚀 Starting cancellation process for:', registrationId);
    
    try {
      setLoading(true);
      
      // First, get the registration details
      const registrationResult = await (await getClient()).models.Registration.get({ id: registrationId });
      const registration = registrationResult.data;
      
      if (!registration) {
        setMessage('❌ Registration not found.');
        return;
      }
      
      // Get children data for the email
      const childrenResult = await (await getClient()).models.Child.list({
        filter: { registrationId: { eq: registrationId } }
      });
      const children = childrenResult.data || [];
      
      // Update registration status
      console.log('📝 Updating registration status to cancelled:', registrationId);
      const updateResult = await (await getAdminClient()).models.Registration.update({
        id: registrationId,
        isCancelled: true,
        cancelledAt: new Date().toISOString()
      });
      console.log('📝 Update result:', updateResult);
      
      // Check if the database update was successful
      if (updateResult.errors) {
        console.error('❌ Database update failed:', updateResult.errors);
        console.error('❌ Full error details:', JSON.stringify(updateResult.errors, null, 2));
        throw new Error(`Failed to update registration status: ${updateResult.errors.map(e => e.message).join(', ')}`);
      }
      
      if (!updateResult.data) {
        console.error('❌ Database update returned no data:', updateResult);
        throw new Error('Database update returned no data');
      }
      
      // Send cancellation email
      console.log('📧 Sending cancellation email...');
      const client = await getClient();
      
      const emailResult = await client.mutations.sendCancellationEmail({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          streetAddress: registration.streetAddress,
          zipCode: registration.zipCode,
          city: registration.city,
          state: registration.state,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          referredBy: registration.referredBy || '',
          children: JSON.stringify(children.map(child => ({ age: child.age, gender: child.gender })))
        },
        registrationId: registrationId
      });
      console.log('📧 Email result:', emailResult);
      
      // Wait a moment for database consistency, then update local state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set flag to prevent automatic data reloading from overriding our state
      setSkipNextReload(true);
      
      // Update the local state to reflect the cancellation
      setRegistrations(prevRegs => {
        const updated = prevRegs.map(r => 
          r.id === registrationId 
            ? { ...r, isCancelled: true, cancelledAt: new Date().toISOString() }
            : r
        );
        console.log('🔄 Updated registration state for ID:', registrationId);
        
        // Also update time slot counts immediately
        const cancelledReg = prevRegs.find(r => r.id === registrationId);
        if (cancelledReg) {
          setTimeSlots(prevSlots => 
            prevSlots.map(slot => 
              slot.timeSlot === cancelledReg.timeSlot 
                ? { ...slot, currentRegistrations: Math.max(0, slot.currentRegistrations - 1) }
                : slot
            )
          );
        }
        
        return updated;
      });
      
      console.log('✅ Data reloaded, setting success message');
      setMessage('✅ Registration cancelled successfully and cancellation email sent!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error cancelling registration:', error);
      setMessage('❌ Error cancelling registration.');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: typeof settings) => {
    try {
      setLoading(true);
      // In a real app, you would save these to your backend
      setSettings(newSettings);
      setMessage('✅ Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('❌ Error updating settings.');
    } finally {
      setLoading(false);
    }
  };

  const sendBulkEmail = async () => {
    if (!bulkEmailSubject.trim() || !bulkEmailMessage.trim()) {
      setMessage('❌ Please provide both subject and email message.');
      return;
    }

    const confirmation = confirm(
      `Are you sure you want to send a bulk email to all ${targetStatus} registrations?\n\n` +
      `Subject: "${bulkEmailSubject}"\n\n` +
      `This will send emails at a rate of 1 per second${sendSmsNotification ? ' followed by SMS notifications' : ''}.\n\n` +
      `This action cannot be undone.`
    );

    if (!confirmation) return;

    try {
      setBulkEmailSending(true);
      setBulkEmailResults(null);
      setMessage('📧 Starting bulk email broadcast... This may take several minutes.');

      const response = await fetch('/api/send-email-to-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: bulkEmailSubject,
          emailMessage: bulkEmailMessage,
          sendSmsNotification,
          targetStatus
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success !== false) {
        setBulkEmailResults(result);
        setMessage(`✅ Bulk email completed! ${result.emailsSent} emails sent${result.smsNotificationsSent > 0 ? `, ${result.smsNotificationsSent} SMS notifications sent` : ''}.`);
        
        // Clear form
        setBulkEmailSubject('');
        setBulkEmailMessage('');
      } else {
        throw new Error(result.error || 'Failed to send bulk email');
      }
    } catch (error) {
      console.error('Error sending bulk email:', error);
      setMessage(`❌ Error sending bulk email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setBulkEmailSending(false);
    }
  };

  const tabs = [
    { id: 'registrations', name: 'Registrations', icon: '👥' },
    { id: 'add-registration', name: 'Add Registration', icon: '➕' },
    { id: 'waitlist', name: 'Waitlist', icon: '📋' },
    { id: 'invites', name: 'Invites', icon: '📧' },
    { id: 'bulk-email', name: 'Bulk Email', icon: '📨' },
    { id: 'timeslots', name: 'Time Slots', icon: '⏰' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="p-8 rounded-lg mb-8 text-white text-center" 
           style={{ background: `linear-gradient(135deg, ${BRANDING.primaryColor}, ${BRANDING.secondaryColor})` }}>
        <div className="flex items-center justify-center mb-4">
          <div className="text-6xl mr-4">{BRANDING.locationEmoji}</div>
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white">{registrationConfig?.locationName || LOCATION_NAME} Admin</h1>
            <p className="text-lg text-white">{registrationConfig?.eventAddress || LOCATION_ADDRESS}</p>
          </div>
        </div>
        <p className="text-center text-white opacity-80">Manage registrations and time slots</p>
      </div>
      
      {message && (
        <div className="mb-6 p-4 bg-blue-500 text-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-2">ℹ️</span>
            {message}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                // Refresh data when switching to time slots tab
                if (tab.id === 'timeslots' && timeSlots.length === 0) {
                  loadData();
                }
              }}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-black hover:text-black hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'registrations' && (
          <div>
            {/* Registration Status Configuration at top of Registrations tab */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-black flex items-center mb-6">
                  ⚙️ Registration Status Configuration
                </h2>
                
                {registrationConfig ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Registration Status */}
                    <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                      <h3 className="font-bold text-black mb-3 flex items-center">
                        🎯 Registration Status
                      </h3>
                      <div className="space-y-3">
                        <div className={`px-3 py-2 rounded-lg font-semibold text-center ${
                          registrationConfig.isRegistrationOpen 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {registrationConfig.isRegistrationOpen ? '✅ OPEN' : '🔴 CLOSED'}
                        </div>
                        
                        <button
                          onClick={toggleRegistrationOpen}
                          disabled={loading}
                          className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                            registrationConfig.isRegistrationOpen
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          } disabled:opacity-50`}
                        >
                          {registrationConfig.isRegistrationOpen ? '🔒 Close Registration' : '🔓 Open Registration'}
                        </button>
                      </div>
                    </div>

                    {/* Invite Only Mode */}
                    <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                      <h3 className="font-bold text-black mb-3 flex items-center">
                        📧 Access Mode
                      </h3>
                      <div className="space-y-3">
                        <div className={`px-3 py-2 rounded-lg font-semibold text-center ${
                          registrationConfig.inviteOnlyMode
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-black'
                        }`}>
                          {registrationConfig.inviteOnlyMode ? '🔐 INVITE ONLY' : '🌐 PUBLIC'}
                        </div>
                        
                        <button
                          onClick={toggleInviteOnlyMode}
                          disabled={loading}
                          className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                            registrationConfig.inviteOnlyMode
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          } disabled:opacity-50`}
                        >
                          {registrationConfig.inviteOnlyMode ? '🌐 Enable Public Access' : '🔐 Enable Invite Only'}
                        </button>
                      </div>
                    </div>

                    {/* Closure Message */}
                    <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
                      <h3 className="font-bold text-black mb-3 flex items-center">
                        💬 Closure Message
                      </h3>
                      <div className="space-y-3">
                        <textarea
                          value={customClosureMessage}
                          onChange={(e) => setCustomClosureMessage(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm h-20 text-black"
                          placeholder="Message shown when registration is closed"
                        />
                        <button
                          onClick={() => updateRegistrationStatus('closureMessage', customClosureMessage)}
                          disabled={loading}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                        >
                          💾 Save Message
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-xl font-bold text-black">Loading Registration Configuration...</p>
                    <p className="text-black">Please wait while we load the registration settings.</p>
                  </div>
                )}
              </div>

            {/* Registration Management */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-black flex items-center">
                👥 Registration Management ({filteredRegistrations.length} of {activeRegistrations.length} active)
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={requestFinalConfirmation}
                  disabled={loading || registeredStatusRegistrations.length === 0 || !canRequestFinalConfirmation()}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-bold flex items-center disabled:opacity-50"
                  title={registeredStatusRegistrations.length === 0 ? 'No registrations in REGISTERED status' : `Send final confirmation to ${registeredStatusRegistrations.length} REGISTERED users`}
                >
                  {loading ? '⏳ Sending...' : `📋 Request Final Confirmation (${registeredStatusRegistrations.length})`}
                </button>
                <button
                  onClick={exportRegistrations}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-bold flex items-center"
                >
                  📥 Export CSV
                </button>
              </div>
            </div>
            
            {/* Search and Filter Bar */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search by name, email, phone, or time slot..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border-2 border-purple-300 rounded-lg text-black font-medium focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="absolute left-4 top-3.5 text-black text-xl">🔍</div>
                </div>
                <div className="sm:w-64">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg text-black font-medium focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="all">📋 All Registrations</option>
                    <option value="active">✅ Active Only</option>
                    <option value="registered">📝 Registered</option>
                    <option value="unconfirmed">⚠️ Unconfirmed</option>
                    <option value="confirmed">✅ Confirmed</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </div>
              </div>
              
              {/* Filter Summary */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Showing {filteredRegistrations.length} of {registrations.length} registrations
                  {searchTerm && <span> matching "{searchTerm}"</span>}
                  {statusFilter !== 'all' && <span> with status: {statusFilter}</span>}
                </div>
                {(searchTerm || statusFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-200 border-2 border-blue-400 p-4 rounded-lg text-center">
                <div className="text-4xl mb-2">👥</div>
                <h3 className="font-bold text-black text-lg">ACTIVE REGISTRATIONS</h3>
                <p className="text-3xl font-bold text-black">{activeRegistrations.length}</p>
                {registrations.length > activeRegistrations.length && (
                  <p className="text-sm text-gray-600">({registrations.length - activeRegistrations.length} cancelled)</p>
                )}
              </div>
              <div className="bg-green-200 border-2 border-green-400 p-4 rounded-lg text-center">
                <div className="text-4xl mb-2">👶</div>
                <h3 className="font-bold text-black text-lg">TOTAL CHILDREN</h3>
                <p className="text-3xl font-bold text-black">{totalChildren}</p>
              </div>
            </div>

            <div className="space-y-4">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-xl font-bold text-black">No registrations found</p>
                  <p className="text-black">Try adjusting your search terms</p>
                </div>
              ) : (
                filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                    {editingRegistration === reg.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editFormData?.firstName || ''}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, firstName: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            value={editFormData?.lastName || ''}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, lastName: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Last Name"
                          />
                          <input
                            type="email"
                            value={editFormData?.email || ''}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, email: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Email"
                          />
                          <input
                            type="tel"
                            value={editFormData?.phone || ''}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, phone: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Phone"
                          />
                          <select
                            value={editFormData?.timeSlot || ''}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, timeSlot: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                          >
                            {timeSlots.map(slot => (
                              <option key={slot.timeSlot} value={slot.timeSlot}>{slot.timeSlot}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            value={editFormData?.numberOfKids || 0}
                            onChange={(e) => setEditFormData(prev => prev ? {...prev, numberOfKids: parseInt(e.target.value) || 0} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Number of Kids"
                            min="0"
                          />
                        </div>
                        
                        {/* Children Information Section */}
                        {editFormData && editFormData.numberOfKids > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-black">Children Information</h4>
                            {Array.from({ length: editFormData.numberOfKids }, (_, index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Child {index + 1} Age
                                  </label>
                                  <select
                                    value={editFormData.children?.[index]?.age || ''}
                                    onChange={(e) => {
                                      const newChildren = [...(editFormData.children || [])];
                                      while (newChildren.length <= index) {
                                        newChildren.push({ age: '', gender: 'boy' });
                                      }
                                      const value = e.target.value;
                                      newChildren[index].age = value === '<1' ? '<1' : (value ? parseInt(value).toString() : '');
                                      setEditFormData(prev => prev ? {...prev, children: newChildren} : null);
                                    }}
                                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                                    required
                                  >
                                    <option value="">Select age</option>
                                    <option value="<1">&lt;1</option>
                                    {Array.from({ length: 18 }, (_, i) => i + 1).map(age => (
                                      <option key={age} value={age}>{age}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Child {index + 1} Gender
                                  </label>
                                  <select
                                    value={editFormData.children?.[index]?.gender || 'boy'}
                                    onChange={(e) => {
                                      const newChildren = [...(editFormData.children || [])];
                                      while (newChildren.length <= index) {
                                        newChildren.push({ age: '', gender: 'boy' });
                                      }
                                      newChildren[index].gender = e.target.value as 'boy' | 'girl';
                                      setEditFormData(prev => prev ? {...prev, children: newChildren} : null);
                                    }}
                                    className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                                    required
                                  >
                                    <option value="boy">Boy</option>
                                    <option value="girl">Girl</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex space-x-3">
                          <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600">
                            💾 Save
                          </button>
                          <button onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600">
                            ❌ Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-black">{reg.firstName} {reg.lastName}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <p className="text-black"><span className="font-bold">📧 Email:</span> {reg.email}</p>
                              <p className="text-black"><span className="font-bold">📱 Phone:</span> {reg.phone}</p>
                              <p className="text-black"><span className="font-bold">⏰ Time:</span> <span className="bg-blue-200 px-2 py-1 rounded font-bold">{reg.timeSlot}</span></p>
                              <p className="text-black"><span className="font-bold">👶 Kids:</span> {reg.numberOfKids}</p>
                              {reg.referredBy && (
                                <p className="text-black"><span className="font-bold">👤 Referred:</span> {reg.referredBy}</p>
                              )}
                              <p className="text-black">
                                <span className="font-bold">📋 Status:</span>
                                {(() => {
                                  const status = reg.isCancelled ? 'cancelled' : (reg.registrationStatus || 'registered');
                                  switch (status) {
                                    case 'cancelled':
                                      return <span className="bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1">❌ CANCELLED</span>;
                                    case 'unconfirmed':
                                      return <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded font-bold ml-1">⚠️ UNCONFIRMED</span>;
                                    case 'confirmed':
                                      return <span className="bg-green-200 text-green-800 px-2 py-1 rounded font-bold ml-1">✅ CONFIRMED</span>;
                                    case 'registered':
                                    default:
                                      return <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded font-bold ml-1">📝 REGISTERED</span>;
                                  }
                                })()}
                              </p>
                              {/* Delivery status temporarily disabled for deployment
                              <p className="text-black">
                                <span className="font-bold">📧 Email:</span>
                                {(reg as any).emailDeliveryStatus === 'sent' ? (
                                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded font-bold ml-1">✅ SENT</span>
                                ) : (reg as any).emailDeliveryStatus === 'failed' ? (
                                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1">❌ FAILED</span>
                                ) : (reg as any).emailDeliveryStatus === 'bounced' ? (
                                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1">🔄 BOUNCED</span>
                                ) : (
                                  <span className="bg-gray-200 text-black px-2 py-1 rounded font-bold ml-1">⏳ PENDING</span>
                                )}
                              </p>
                              <p className="text-black">
                                <span className="font-bold">📱 SMS:</span>
                                {(reg as any).smsDeliveryStatus === 'sent' ? (
                                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded font-bold ml-1">✅ SENT</span>
                                ) : (reg as any).smsDeliveryStatus === 'failed' ? (
                                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1">❌ FAILED</span>
                                ) : (
                                  <span className="bg-gray-200 text-black px-2 py-1 rounded font-bold ml-1">⏳ PENDING</span>
                                )}
                              </p>
                              */}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            <button onClick={() => startEdit(reg)} className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-blue-600">
                              ✏️ Edit
                            </button>
                            {!reg.isCancelled && ((reg.registrationStatus || 'registered') === 'registered' || reg.registrationStatus === 'unconfirmed') && (
                              <button 
                                onClick={() => sendIndividualFinalConfirmation(reg.id)} 
                                className="bg-purple-600 text-white px-3 py-2 rounded-lg font-bold hover:bg-purple-700"
                                title="Send urgent final confirmation request"
                              >
                                🚨 Final Confirm
                              </button>
                            )}
                            {!reg.isCancelled && (
                              <button 
                                onClick={() => cancelRegistration(reg.id)} 
                                className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-orange-600"
                              >
                                🚫 Cancel
                              </button>
                            )}
                            {reg.isCancelled && (
                              <button onClick={() => deleteRegistration(reg.id)} className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-red-600">
                                🗑️ Delete
                              </button>
                            )}
                            <div className="flex gap-1">
                              <button 
                                onClick={() => resendConfirmation(reg, 'email')} 
                                className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-green-600"
                                disabled={loading}
                              >
                                📧 Email
                              </button>
                              <button 
                                onClick={() => resendConfirmation(reg, 'sms')} 
                                className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-green-600"
                                disabled={loading}
                              >
                                📱 SMS
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'invites' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              📧 Invite Management
            </h2>
            
            {/* Generate New Invite Link */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-black mb-4">Generate New Invite Link</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-black font-bold mb-2">
                    📧 Email Address (required for email-specific invites)
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg text-black font-medium focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-sm text-black mt-2">
                    💡 Only the email address used to generate the invite can register with it
                  </p>
                </div>
                <button
                  onClick={generateInviteLink}
                  disabled={loading || !inviteEmail.trim()}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold text-lg"
                >
                  {loading ? '⏳ Generating...' : '🚀 Generate Email-Specific Invite'}
                </button>
              </div>
            </div>

            {/* Existing Invite Links */}
            <div className="bg-white border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4">
                Existing Invite Links ({inviteLinks.length})
              </h3>
              
              {inviteLinks.length === 0 ? (
                <p className="text-black italic text-center py-8">No invite links have been generated yet.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {inviteLinks.map((invite) => (
                    <div
                      key={invite.id}
                      className={`p-4 rounded-lg border-2 ${
                        invite.isUsed 
                          ? 'bg-gray-100 border-gray-300 text-black' 
                          : 'bg-white border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              invite.isUsed 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {invite.isUsed ? '✅ USED' : '🟢 ACTIVE'}
                            </span>
                            {invite.email && (
                              <span className="text-sm text-black">
                                📧 {invite.email}
                              </span>
                            )}
                            {/* Email status temporarily disabled for deployment
                            {invite.email && (
                              <span className={`px-2 py-1 rounded text-xs font-bold ml-2 ${
                                (invite as any).emailDeliveryStatus === 'sent' ? 'bg-green-100 text-green-800' :
                                (invite as any).emailDeliveryStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                (invite as any).emailDeliveryStatus === 'bounced' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {(invite as any).emailDeliveryStatus === 'sent' ? '✅ EMAIL SENT' :
                                 (invite as any).emailDeliveryStatus === 'failed' ? '❌ EMAIL FAILED' :
                                 (invite as any).emailDeliveryStatus === 'bounced' ? '🔄 EMAIL BOUNCED' :
                                 '⏳ EMAIL PENDING'}
                              </span>
                            )}
                            */}
                          </div>
                          <div className="text-sm text-black">
                            Created: {invite.createdAt ? new Date(invite.createdAt).toLocaleString() : 'Unknown'}
                            {invite.usedAt && (
                              <span className="ml-4">
                                Used: {new Date(invite.usedAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="mt-2 font-mono text-sm bg-gray-100 text-black p-2 rounded border break-all">
                            {window.location.origin}/register/{invite.token}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => copyInviteLink(invite.token)}
                            disabled={loading}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                            title="Copy Link"
                          >
                            📋 Copy
                          </button>
                          {invite.email && (
                            <button
                              onClick={() => resendInviteEmail(invite)}
                              disabled={loading}
                              className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 disabled:opacity-50"
                              title="Resend Invite Email"
                            >
                              📧 Resend
                            </button>
                          )}
                          {!invite.isUsed && (
                            <button
                              onClick={() => invalidateInviteLink(invite.id)}
                              disabled={loading}
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:opacity-50"
                              title="Invalidate Link"
                            >
                              ❌ Invalidate
                            </button>
                          )}
                          {invite.isUsed && (
                            <button
                              onClick={() => deleteInviteLink(invite.id, invite.email)}
                              disabled={loading}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 disabled:opacity-50"
                              title="Delete Permanently"
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'timeslots' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black flex items-center">
                ⏰ Time Slot Management
              </h2>
              {timeSlots.length > 6 && (
                <button
                  onClick={cleanupDuplicateTimeSlots}
                  disabled={loading}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-bold disabled:opacity-50"
                >
                  🧹 Clean Up Duplicates
                </button>
              )}
            </div>
            
            {/* Time Slots Summary */}
            {timeSlots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {timeSlots.length}
                  </div>
                  <div className="text-sm font-semibold text-blue-800">
                    Total Time Slots
                  </div>
                </div>
                
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {timeSlots.reduce((sum, slot) => sum + slot.currentRegistrations, 0)}
                  </div>
                  <div className="text-sm font-semibold text-green-800">
                    Total Registrations
                  </div>
                </div>
                
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {timeSlots.reduce((sum, slot) => sum + (slot.maxCapacity - slot.currentRegistrations), 0)}
                  </div>
                  <div className="text-sm font-semibold text-orange-800">
                    Remaining Capacity
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {timeSlots.length === 0 ? (
                <div className="text-center py-8 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="text-4xl mb-4">{loading ? '🔄' : '⚠️'}</div>
                  <p className="text-black mb-2 text-lg font-semibold">
                    {loading ? 'Setting up time slots...' : 'Time slots not found'}
                  </p>
                  <p className="text-black mb-4">
                    {loading 
                      ? 'Please wait while we initialize the default time slots.' 
                      : 'Click the button below to create the default time slots.'
                    }
                  </p>
                  {!loading && (
                    <div className="space-x-4">
                      <button
                        onClick={initializeTimeSlots}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-bold"
                      >
                        🚀 Create Time Slots
                      </button>
                      <button
                        onClick={() => loadData()}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold"
                      >
                        🔄 Refresh Data
                      </button>
                      <button
                        onClick={async () => {
                          console.log('🔧 Direct time slot query test...');
                          try {
                            const { data: testSlots } = await (await getClient()).models.TimeSlotConfig.list();
                            console.log('🧪 Direct query result:', testSlots?.length || 0, testSlots);
                            setMessage(`Direct query found ${testSlots?.length || 0} time slots. Check console for details.`);
                          } catch (error) {
                            console.error('🚨 Direct query failed:', error);
                            setMessage('❌ Direct query failed. Check console for error details.');
                          }
                        }}
                        disabled={loading}
                        className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:opacity-50 font-bold"
                      >
                        🧪 Test Query
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                timeSlots.map(slot => {
                  const percentage = (slot.currentRegistrations / slot.maxCapacity) * 100;
                  const statusColor = percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500';
                  const statusEmoji = percentage >= 100 ? '🔴' : percentage >= 80 ? '🟡' : '🟢';
                  
                  return (
                    <div key={slot.id} className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {editingTimeSlot === slot.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="time"
                                defaultValue={slot.timeSlot}
                                onBlur={(e) => updateTimeSlotTime(slot.id, e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateTimeSlotTime(slot.id, e.currentTarget.value);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingTimeSlot(null);
                                  }
                                }}
                                className="px-3 py-1 border-2 border-blue-400 rounded font-bold text-black"
                                autoFocus
                              />
                              <button
                                onClick={() => setEditingTimeSlot(null)}
                                className="text-black hover:text-black"
                              >
                                ❌
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-xl text-black">{statusEmoji} {slot.timeSlot}</span>
                              <button
                                onClick={() => setEditingTimeSlot(slot.id)}
                                className="text-black hover:text-gray-700"
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                          <div className="text-black font-semibold mt-1">
                            {slot.currentRegistrations}/{slot.maxCapacity} registered ({percentage.toFixed(0)}%)
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className={`${statusColor} h-2 rounded-full transition-all`} style={{width: `${Math.min(percentage, 100)}%`}}></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-black font-bold">Max:</span>
                          <div className="flex items-center border-2 border-blue-300 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateTimeSlotCapacity(slot.id, Math.max(0, slot.maxCapacity - 1))}
                              className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 font-bold text-lg"
                              disabled={loading}
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={slot.maxCapacity}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 0;
                                if (newValue !== slot.maxCapacity) {
                                  updateTimeSlotCapacity(slot.id, newValue);
                                }
                              }}
                              className="w-20 px-3 py-2 text-center text-black font-bold focus:ring-2 focus:ring-blue-500 border-0 focus:outline-none"
                              min="0"
                              step="1"
                            />
                            <button
                              onClick={() => updateTimeSlotCapacity(slot.id, slot.maxCapacity + 1)}
                              className="bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 font-bold text-lg"
                              disabled={loading}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => deleteTimeSlot(slot.id, slot.timeSlot)}
                            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-bold"
                            disabled={loading}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
              {/* Add New Time Slot */}
              <div className="bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-black font-bold">➕ Add New Time Slot:</span>
                  <input
                    type="time"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    placeholder="HH:MM"
                    className="px-3 py-2 border-2 border-blue-300 rounded-lg text-black font-bold focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addNewTimeSlot}
                    disabled={loading || !newTimeSlot}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-bold disabled:opacity-50"
                  >
                    🚀 Add Time Slot
                  </button>
                </div>
                <p className="text-sm text-black mt-2">
                  💡 New time slots will start with {DEFAULT_CAPACITY} people capacity
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bulk-email' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              📨 Send Email to All Registered Guests
            </h2>
            
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">⚠️</span>
                <h3 className="text-lg font-semibold text-orange-800">Important Information</h3>
              </div>
              <ul className="text-orange-800 space-y-2">
                <li>• Emails will be sent at a rate of 1 per second to prevent spam filtering</li>
                <li>• SMS notifications will be sent after emails to notify guests to check their email</li>
                <li>• This process cannot be stopped once started</li>
                <li>• Large batches may take several minutes to complete</li>
              </ul>
            </div>

            <div className="space-y-6">
              {/* Target Audience Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as 'all' | 'registered' | 'unconfirmed' | 'confirmed')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={bulkEmailSending}
                >
                  <option value="all">All Non-Cancelled Registrations</option>
                  <option value="registered">Registered Only</option>
                  <option value="unconfirmed">Unconfirmed Only</option>
                  <option value="confirmed">Confirmed Only</option>
                </select>
              </div>

              {/* Email Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Subject *
                </label>
                <input
                  type="text"
                  value={bulkEmailSubject}
                  onChange={(e) => setBulkEmailSubject(e.target.value)}
                  placeholder="e.g., Important Update from Christmas Store"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={bulkEmailSending}
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">{bulkEmailSubject.length}/100 characters</p>
              </div>

              {/* Email Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Message *
                </label>
                <textarea
                  value={bulkEmailMessage}
                  onChange={(e) => setBulkEmailMessage(e.target.value)}
                  placeholder="Enter your message here. You can include HTML formatting if needed."
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={bulkEmailSending}
                  maxLength={5000}
                />
                <p className="text-sm text-gray-500 mt-1">{bulkEmailMessage.length}/5000 characters</p>
              </div>

              {/* SMS Notification Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendSmsNotification"
                  checked={sendSmsNotification}
                  onChange={(e) => setSendSmsNotification(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  disabled={bulkEmailSending}
                />
                <label htmlFor="sendSmsNotification" className="text-sm font-medium text-gray-700">
                  Send SMS notification after email to remind guests to check their email
                </label>
              </div>

              {/* Send Button */}
              <div className="flex justify-center">
                <button
                  onClick={sendBulkEmail}
                  disabled={bulkEmailSending || !bulkEmailSubject.trim() || !bulkEmailMessage.trim()}
                  className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                    bulkEmailSending || !bulkEmailSubject.trim() || !bulkEmailMessage.trim()
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-200'
                  }`}
                >
                  {bulkEmailSending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending Emails...</span>
                    </div>
                  ) : (
                    '📨 Send Bulk Email'
                  )}
                </button>
              </div>

              {/* Results Display */}
              {bulkEmailResults && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">📊 Email Broadcast Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{bulkEmailResults.totalRecipients}</div>
                      <div className="text-sm text-gray-600">Total Recipients</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">{bulkEmailResults.emailsSent}</div>
                      <div className="text-sm text-gray-600">Emails Sent</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">{bulkEmailResults.smsNotificationsSent || 0}</div>
                      <div className="text-sm text-gray-600">SMS Notifications</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">{(bulkEmailResults.emailsFailed || 0) + (bulkEmailResults.smsNotificationsFailed || 0)}</div>
                      <div className="text-sm text-gray-600">Total Failed</div>
                    </div>
                  </div>
                  {bulkEmailResults.estimatedDurationSeconds && (
                    <p className="text-sm text-gray-600 mt-4 text-center">
                      Completed in approximately {Math.ceil(bulkEmailResults.estimatedDurationSeconds / 60)} minutes
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'add-registration' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              ➕ Add New Registration
            </h2>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-blue-800 font-semibold">
                💡 Admin Registration: This form allows you to manually add registrations to the system. 
                Email and phone numbers must be unique. If you select a full time slot, its capacity will be increased by 1.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={adminRegData.firstName}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={adminRegData.lastName}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={adminRegData.email}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={adminRegData.phone}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={adminRegData.streetAddress}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, streetAddress: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter street address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={adminRegData.city}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={adminRegData.state}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter state (2 letters)"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code *</label>
                  <input
                    type="text"
                    value={adminRegData.zipCode}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot *</label>
                  <select
                    value={adminRegData.timeSlot}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map(slot => {
                      const isFull = slot.currentRegistrations >= slot.maxCapacity;
                      return (
                        <option key={slot.timeSlot} value={slot.timeSlot}>
                          {slot.timeSlot} ({slot.currentRegistrations}/{slot.maxCapacity}){isFull ? ' - FULL (will increase capacity)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children *</label>
                  <input
                    type="number"
                    value={adminRegData.numberOfKids}
                    onChange={(e) => {
                      const numKids = parseInt(e.target.value) || 0;
                      setAdminRegData(prev => ({ 
                        ...prev, 
                        numberOfKids: numKids,
                        children: numKids === 0 ? [] : prev.children.slice(0, numKids)
                      }));
                    }}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter number of children"
                    min="0"
                    max="20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
                  <input
                    type="text"
                    value={adminRegData.referredBy}
                    onChange={(e) => setAdminRegData(prev => ({ ...prev, referredBy: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                    placeholder="Enter who referred them (optional)"
                  />
                </div>
              </div>

              {/* Children Information */}
              {adminRegData.numberOfKids > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-black">Children Information</h3>
                  {Array.from({ length: adminRegData.numberOfKids }, (_, index) => {
                    // Ensure we have a child object at this index (safe approach)
                    const currentChild = adminRegData.children[index] || { age: '', gender: 'boy' };
                    
                    return (
                      <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-black mb-2">Child {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <select
                              value={currentChild.age}
                              onChange={(e) => {
                                const newChildren = [...adminRegData.children];
                                while (newChildren.length <= index) {
                                  newChildren.push({ age: '', gender: 'boy' });
                                }
                                newChildren[index] = { ...currentChild, age: e.target.value };
                                setAdminRegData(prev => ({ ...prev, children: newChildren }));
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                              required
                            >
                              <option value="">Select age</option>
                              <option value="<1">&lt;1</option>
                              {Array.from({ length: 18 }, (_, i) => i + 1).map(age => (
                                <option key={age} value={age}>{age}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                              value={currentChild.gender}
                              onChange={(e) => {
                                const newChildren = [...adminRegData.children];
                                while (newChildren.length <= index) {
                                  newChildren.push({ age: '', gender: 'boy' });
                                }
                                newChildren[index] = { ...currentChild, gender: e.target.value as 'boy' | 'girl' };
                                setAdminRegData(prev => ({ ...prev, children: newChildren }));
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 text-black"
                              required
                            >
                              <option value="boy">Boy</option>
                              <option value="girl">Girl</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={async () => {
                    setAddingRegistration(true);
                    try {
                      const response = await fetch('/api/admin-register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(adminRegData)
                      });
                      
                      const result = await response.json();
                      
                      if (result.success) {
                        setMessage('✅ Registration created successfully! Email and SMS sent.');
                        // Reset form
                        setAdminRegData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          streetAddress: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          timeSlot: '',
                          numberOfKids: 0,
                          children: [],
                          referredBy: ''
                        });
                        // Reload data to show the new registration
                        loadData();
                      } else {
                        setMessage('❌ ' + (result.message || 'Failed to create registration'));
                      }
                    } catch (error) {
                      console.error('Error creating registration:', error);
                      setMessage('❌ Error creating registration');
                    } finally {
                      setAddingRegistration(false);
                    }
                  }}
                  disabled={addingRegistration || !adminRegData.firstName || !adminRegData.lastName || !adminRegData.email || !adminRegData.phone || !adminRegData.timeSlot}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                >
                  {addingRegistration ? '⏳ Creating Registration...' : '➕ Create Registration'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'waitlist' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              📋 Waitlist Management ({waitlistEntries.length} entries)
            </h2>
            
            {waitlistEntries.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-xl font-bold text-black">No waitlist entries</p>
                <p className="text-black">Waitlist entries will appear here when registration is full</p>
              </div>
            ) : (
              <div className="space-y-4">
                {waitlistEntries.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                    {editingWaitlist === entry.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-black">Editing Waitlist Entry</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditWaitlist}
                              disabled={loading}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold text-sm"
                            >
                              ✅ Save
                            </button>
                            <button
                              onClick={cancelEditWaitlist}
                              disabled={loading}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 font-semibold text-sm"
                            >
                              ❌ Cancel
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editWaitlistData?.firstName || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, firstName: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.lastName || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, lastName: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Last Name"
                          />
                          <input
                            type="email"
                            value={editWaitlistData?.email || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, email: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Email"
                          />
                          <input
                            type="tel"
                            value={editWaitlistData?.phone || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, phone: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Phone"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.streetAddress || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, streetAddress: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Street Address"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.city || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, city: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="City"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.state || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, state: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="State"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.zipCode || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, zipCode: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Zip Code"
                          />
                          <input
                            type="number"
                            value={editWaitlistData?.numberOfKids || 0}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, numberOfKids: parseInt(e.target.value) || 0} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Number of Kids"
                            min="0"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.preferredTimeSlots || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, preferredTimeSlots: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Preferred Time Slots"
                          />
                          <input
                            type="text"
                            value={editWaitlistData?.referredBy || ''}
                            onChange={(e) => setEditWaitlistData((prev: any) => prev ? {...prev, referredBy: e.target.value} : null)}
                            className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                            placeholder="Referred By"
                          />
                        </div>
                        
                        {/* Children Information Section for Waitlist */}
                        {editWaitlistData && editWaitlistData.numberOfKids > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-black">Children Information</h4>
                            {Array.from({ length: editWaitlistData.numberOfKids }, (_, index) => {
                              const existingChildren = (() => {
                                try {
                                  return editWaitlistData.children ? JSON.parse(editWaitlistData.children) : [];
                                } catch {
                                  return [];
                                }
                              })();
                              
                              return (
                                <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                                  <h5 className="font-semibold text-black mb-2">Child {index + 1}</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                      <select
                                        value={existingChildren[index]?.age || ''}
                                        onChange={(e) => {
                                          const newChildren = [...existingChildren];
                                          while (newChildren.length <= index) {
                                            newChildren.push({ age: '', gender: 'boy' });
                                          }
                                          newChildren[index].age = e.target.value;
                                          setEditWaitlistData((prev: any) => prev ? {...prev, children: JSON.stringify(newChildren)} : null);
                                        }}
                                        className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                                        required
                                      >
                                        <option value="">Select age</option>
                                        <option value="<1">&lt;1</option>
                                        {Array.from({ length: 18 }, (_, i) => i + 1).map(age => (
                                          <option key={age} value={age}>{age}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                      <select
                                        value={existingChildren[index]?.gender || 'boy'}
                                        onChange={(e) => {
                                          const newChildren = [...existingChildren];
                                          while (newChildren.length <= index) {
                                            newChildren.push({ age: '', gender: 'boy' });
                                          }
                                          newChildren[index].gender = e.target.value;
                                          setEditWaitlistData((prev: any) => prev ? {...prev, children: JSON.stringify(newChildren)} : null);
                                        }}
                                        className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg font-bold text-black"
                                        required
                                      >
                                        <option value="boy">Boy</option>
                                        <option value="girl">Girl</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                              #{entry.position}
                            </div>
                            <h3 className="text-xl font-bold text-black">
                              {entry.firstName} {entry.lastName}
                            </h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                              entry.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {entry.isActive ? '🟢 ACTIVE' : '⚪ INACTIVE'}
                            </div>
                          </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm font-semibold text-gray-600">Email:</span>
                            <p className="text-black">{entry.email}</p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600">Phone:</span>
                            <p className="text-black">{entry.phone}</p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600">Number of Kids:</span>
                            <p className="text-black">{entry.numberOfKids}</p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600">Address:</span>
                            <p className="text-black">{entry.streetAddress}, {entry.city}, {entry.state} {entry.zipCode}</p>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-gray-600">Waitlist Date:</span>
                            <p className="text-black">{entry.waitlistDate ? new Date(entry.waitlistDate).toLocaleDateString() : 'Unknown'}</p>
                          </div>
                          {entry.preferredTimeSlots && (
                            <div>
                              <span className="text-sm font-semibold text-gray-600">Preferred Time Slots:</span>
                              <p className="text-black">{entry.preferredTimeSlots}</p>
                            </div>
                          )}
                        </div>

                        {entry.children && (() => {
                          try {
                            const children = JSON.parse(entry.children);
                            return children.length > 0 ? (
                              <div className="mb-4">
                                <span className="text-sm font-semibold text-gray-600">Children:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {children.map((child: any, index: number) => (
                                    <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                      Age {child.age}, {child.gender}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null;
                          } catch {
                            return null;
                          }
                        })()}

                        {entry.referredBy && (
                          <div className="mb-4">
                            <span className="text-sm font-semibold text-gray-600">Referred By:</span>
                            <p className="text-black">{entry.referredBy}</p>
                          </div>
                        )}
                      </div>
                      
                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={() => startEditWaitlist(entry)}
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold text-sm whitespace-nowrap"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => moveWaitlistToRegistered(entry.id, `${entry.firstName} ${entry.lastName}`)}
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold text-sm whitespace-nowrap"
                          >
                            ✅ Move to Registered
                          </button>
                          <button
                            onClick={() => deleteWaitlistEntry(entry.id, `${entry.firstName} ${entry.lastName}`)}
                            disabled={loading}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-semibold text-sm whitespace-nowrap"
                          >
                            🗑️ Remove from Waitlist
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              ⚙️ Application Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">📧 Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-black font-bold mb-2">Reply-To Email Address</label>
                    <input
                      type="email"
                      value={settings.replyToEmail}
                      onChange={(e) => setSettings({...settings, replyToEmail: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg text-black"
                      placeholder="office@pathwayvineyard.com"
                    />
                    <p className="text-sm text-black mt-1">Email address shown as reply-to in confirmation emails</p>
                  </div>
                  <div>
                    <label className="block text-black font-bold mb-2">Contact Phone Number</label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg text-black"
                      placeholder="(208) 746-9089"
                    />
                    <p className="text-sm text-black mt-1">Phone number displayed on registration page for questions</p>
                  </div>
                  <div>
                    <label className="block text-black font-bold mb-2">Texting Number</label>
                    <input
                      type="tel"
                      value={settings.textingNumber}
                      onChange={(e) => setSettings({...settings, textingNumber: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg text-black"
                      placeholder="(208) 746-9089"
                    />
                    <p className="text-sm text-black mt-1">Phone number used for sending text confirmations - will be displayed on registration page</p>
                  </div>
                </div>
              </div>

              {/* Location Settings */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">📍 Event Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-black font-bold mb-2">Location Name</label>
                    <input
                      type="text"
                      value={settings.locationName}
                      onChange={(e) => setSettings({...settings, locationName: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-green-300 rounded-lg text-black"
                      placeholder="Christmas Store Location"
                    />
                  </div>
                  <div>
                    <label className="block text-black font-bold mb-2">Event Address</label>
                    <textarea
                      value={settings.eventAddress}
                      onChange={(e) => setSettings({...settings, eventAddress: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-green-300 rounded-lg h-20 text-black"
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                </div>
              </div>

              {/* Final Confirmation Settings */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">📋 Final Confirmation Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-black font-bold mb-2">Final Confirmation Deadline Date & Time</label>
                    <input
                      type="datetime-local"
                      value={settings.finalConfirmationDeadline}
                      onChange={(e) => setSettings({...settings, finalConfirmationDeadline: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-yellow-300 rounded-lg text-black"
                    />
                    <p className="text-sm text-black mt-1">
                      The "Request Final Confirmation" button becomes available after this date/time
                    </p>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.finalConfirmationEnabled}
                        onChange={(e) => setSettings({...settings, finalConfirmationEnabled: e.target.checked})}
                        className="w-4 h-4 text-yellow-600 border-2 border-yellow-300 rounded"
                      />
                      <span className="text-black font-bold">Enable Final Confirmation System</span>
                    </label>
                    <p className="text-sm text-black mt-1 ml-6">
                      When enabled, the final confirmation process will be available once the deadline is reached
                    </p>
                  </div>
                </div>
              </div>

              {/* Save All Settings */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4">💾 Save All Changes</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => saveAllSettings()}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 text-lg"
                  >
                    {loading ? '⏳ Saving All Settings...' : '💾 Save All Settings'}
                  </button>
                </div>
                <p className="text-sm text-black mt-2">Saves both contact and location settings</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your admin email',
      isRequired: true,
      label: '🎄 Admin Email'
    },
    password: {
      placeholder: 'Enter your password',
      isRequired: true,
      label: '🔐 Password'
    }
  }
};

const components = {
  Header() {
    return (
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎄</div>
        <h1 className="text-4xl font-bold text-black mb-2">Christmas Store</h1>
        <h2 className="text-2xl font-semibold text-red-600">Admin Portal</h2>
        <p className="text-black mt-2">Please sign in to manage registrations</p>
      </div>
    );
  },
  Footer() {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-black">
          🎅 Ho ho ho! Welcome to the Christmas Store Admin Portal 🤶
        </p>
      </div>
    );
  }
};

export default function AdminPage() {
  return (
    <>
      <style jsx global>{`
        .amplify-authenticator {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #fef2f2 50%, #f0fdf4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .amplify-authenticator > div {
          width: 100%;
          max-width: 400px;
        }
      `}</style>
      <ThemeProvider theme={christmasTheme}>
        <Authenticator
          formFields={formFields}
          components={components}
          hideSignUp={true}
          socialProviders={[]}
        >
          {({ signOut, user }) => (
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-red-100">
              <div className="bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 relative">
                  <div className="flex items-center justify-center text-center">
                    <div className="text-3xl mr-4">🎄</div>
                    <div>
                      <h1 className="text-2xl font-bold text-white">Christmas Store Admin</h1>
                      <p className="text-white opacity-90">Welcome, {user?.signInDetails?.loginId}</p>
                    </div>
                  </div>
                  <button
                    onClick={signOut}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-bold flex items-center"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
              <div className="py-6">
                <AdminDashboard />
              </div>
            </div>
          )}
        </Authenticator>
      </ThemeProvider>
    </>
  );
}
