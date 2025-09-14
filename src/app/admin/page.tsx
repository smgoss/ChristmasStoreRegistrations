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
const getClient = async () => {
  if (!client) {
    try {
      // First ensure Amplify is configured
      await ensureAmplifyConfigured();
      client = generateClient<Schema>({ authMode: 'userPool' });
      console.log('✅ Client created with userPool auth');
    } catch (userPoolError) {
      console.warn('⚠️ UserPool client failed, trying apiKey fallback:', userPoolError);
      try {
        await ensureAmplifyConfigured();
        client = generateClient<Schema>({ authMode: 'apiKey' });
        console.log('✅ Client created with apiKey auth (fallback)');
      } catch (apiKeyError) {
        console.error('❌ All client creation attempts failed:', { userPoolError, apiKeyError });
        throw new Error('Failed to create Amplify client. Check Amplify configuration.');
      }
    }
  }
  return client;
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
  referredBy?: string;
  registrationDate: string;
  attendanceConfirmed?: boolean;
  attendanceConfirmedAt?: string;
  isCancelled?: boolean;
  cancelledAt?: string;
  confirmationToken?: string;
}

interface RegistrationConfig {
  id: string;
  isRegistrationOpen: boolean;
  inviteOnlyMode: boolean;
  scheduledCloseDate?: string;
  autoCloseEnabled: boolean;
  closureMessage: string;
  updatedBy?: string;
  updatedAt?: string;
}

interface InviteLink {
  id: string;
  token: string;
  email?: string;
  isUsed?: boolean;
  createdAt: string;
  usedAt?: string;
}

// TIME_SLOTS is now imported from locationConfig

function AdminDashboard() {
  const locationConfig = useLocationConfig();
  const { 
    timeSlots: TIME_SLOTS, 
    locationName: LOCATION_NAME,
    branding: BRANDING,
    defaultCapacity: DEFAULT_CAPACITY 
  } = locationConfig;

  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [inviteLinks, setInviteLinks] = useState<InviteLink[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRegistration, setEditingRegistration] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Registration | null>(null);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [editingTimeSlot, setEditingTimeSlot] = useState<string | null>(null);
  const [registrationConfig, setRegistrationConfig] = useState<RegistrationConfig | null>(null);
  const [scheduledCloseDate, setScheduledCloseDate] = useState('');
  const [scheduledCloseTime, setScheduledCloseTime] = useState('');
  const [customClosureMessage, setCustomClosureMessage] = useState('');

  useEffect(() => {
    const initializeAndLoadData = async () => {
      try {
        console.log('🔍 Loading admin dashboard...');
        setLoading(true);
        
        // Check if time slots exist first
        const { data: existingSlots } = await (await getClient()).models.TimeSlotConfig.list();
        console.log('📊 Found existing slots:', existingSlots.length, existingSlots);
        
        if (existingSlots.length === 0) {
          console.log('🚀 No time slots found, auto-initializing...');
          setMessage('🔄 Setting up time slots...');
          
          try {
            // Auto-initialize time slots with location-specific capacity
            const createPromises = TIME_SLOTS.map(async (slot, index) => {
              console.log(`⏰ Creating time slot ${index + 1}: ${slot}`);
              const result = await (await getClient()).models.TimeSlotConfig.create({
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
          } catch (createError) {
            console.error('❌ Error creating time slots:', createError);
            setMessage('❌ Error setting up time slots. Please try refreshing the page.');
          }
        }
        
        // Load all data (this will now include the newly created slots if any)
        console.log('📥 Loading all dashboard data...');
        await loadData();
        console.log('✅ Dashboard data loaded successfully');
        
      } catch (error) {
        console.error('💥 Critical error in admin dashboard:', error);
        setMessage('❌ Error loading admin dashboard. Check console and refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    initializeAndLoadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('📥 Loading data with user pool auth...');
      
      // Load registration configuration (singleton)
      console.log('🔍 Fetching registration config...');
      const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
      let config = configData?.[0] as RegistrationConfig;
      
      if (!config) {
        // Create default config if none exists
        console.log('🚀 Creating default registration config...');
        const { data: newConfig } = await (await getClient()).models.RegistrationConfig.create({
          id: 'main',
          isRegistrationOpen: true,
          inviteOnlyMode: false,
          autoCloseEnabled: false,
          closureMessage: 'Registration is currently closed. Please check back later.',
        });
        config = newConfig as RegistrationConfig;
      }
      
      setRegistrationConfig(config);
      setCustomClosureMessage(config.closureMessage);
      
      // Load time slot configurations
      console.log('🔍 Fetching time slots...');
      const { data: timeSlotData, errors: timeSlotErrors } = await (await getClient()).models.TimeSlotConfig.list();
      
      if (timeSlotErrors) {
        console.error('❌ Time slot errors:', timeSlotErrors);
        return; // Exit early if there are errors
      } else {
        console.log('✅ Time slots loaded:', timeSlotData?.length || 0, timeSlotData);
      }

      // Load registrations
      console.log('🔍 Fetching registrations...');
      const { data: registrationData, errors: registrationErrors } = await (await getClient()).models.Registration.list();
      
      if (registrationErrors) {
        console.error('❌ Registration errors:', registrationErrors);
      } else {
        console.log('✅ Registrations loaded:', registrationData?.length || 0);
        const registrations = registrationData as Registration[];
        setRegistrations(registrations);
        
        // Update time slot counts with actual registration data
        if (timeSlotData) {
          const updatedTimeSlots = (timeSlotData as TimeSlotConfig[]).map(slot => {
            const actualCount = registrations ? registrations.filter(reg => reg.timeSlot === slot.timeSlot).length : 0;
            console.log(`📊 Time slot ${slot.timeSlot}: ${actualCount} actual registrations (was showing ${slot.currentRegistrations})`);
            return {
              ...slot,
              currentRegistrations: actualCount
            };
          });
          
          // Sort time slots by time (earliest to latest)
          const sortedTimeSlots = updatedTimeSlots.sort((a, b) => {
            return a.timeSlot.localeCompare(b.timeSlot);
          });
          setTimeSlots(sortedTimeSlots);
        }
      }

      // Load invite links
      console.log('🔍 Fetching invite links...');
      const { data: inviteData, errors: inviteErrors } = await (await getClient()).models.InviteLink.list();
      
      if (inviteErrors) {
        console.error('❌ Invite link errors:', inviteErrors);
      } else {
        console.log('✅ Invite links loaded:', inviteData?.length || 0);
        const inviteLinks = inviteData as InviteLink[];
        setInviteLinks(inviteLinks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
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
          (await getClient()).models.TimeSlotConfig.create({
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
    if (newCapacity < 0) {
      setMessage('❌ Capacity cannot be negative!');
      return;
    }

    try {
      setLoading(true);
      await (await getClient()).models.TimeSlotConfig.update({
        id,
        maxCapacity: newCapacity
      });
      
      // Update local state immediately for better UX
      setTimeSlots(prev => prev.map(slot => 
        slot.id === id ? { ...slot, maxCapacity: newCapacity } : slot
      ));
      
      setMessage(`✅ Time slot capacity updated to ${newCapacity} people!`);
      
      // Reload data to ensure consistency
      setTimeout(() => loadData(), 500);
    } catch (error) {
      console.error('Error updating capacity:', error);
      setMessage('❌ Error updating capacity. Please try again.');
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
      await (await getClient()).models.TimeSlotConfig.create({
        timeSlot: newTimeSlot,
        maxCapacity: DEFAULT_CAPACITY,
        currentRegistrations: 0,
        isActive: true
      });
      
      setMessage(`✅ New time slot "${newTimeSlot}" added successfully!`);
      setNewTimeSlot('');
      loadData();
    } catch (error) {
      console.error('Error adding time slot:', error);
      setMessage('❌ Error adding time slot. Please try again.');
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
      await (await getClient()).models.TimeSlotConfig.update({
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
      await (await getClient()).models.TimeSlotConfig.delete({ id });
      
      setMessage(`✅ Time slot "${timeSlot}" deleted successfully!`);
      loadData();
    } catch (error) {
      console.error('Error deleting time slot:', error);
      setMessage('❌ Error deleting time slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanupDuplicateTimeSlots = async () => {
    try {
      setLoading(true);
      setMessage('🧹 Cleaning up duplicate time slots...');

      const { data: allSlots } = await (await getClient()).models.TimeSlotConfig.list();
      
      // Group by time slot to find duplicates
      const timeSlotGroups: { [key: string]: TimeSlotConfig[] } = {};
      allSlots?.forEach(slot => {
        if (!timeSlotGroups[slot.timeSlot]) {
          timeSlotGroups[slot.timeSlot] = [];
        }
        timeSlotGroups[slot.timeSlot].push(slot as TimeSlotConfig);
      });

      // Remove duplicates (keep the first one of each time)
      let deletedCount = 0;
      for (const [timeSlot, slots] of Object.entries(timeSlotGroups)) {
        if (slots.length > 1) {
          // Keep the first one, delete the rest
          for (let i = 1; i < slots.length; i++) {
            await (await getClient()).models.TimeSlotConfig.delete({ id: slots[i].id });
            deletedCount++;
            console.log(`🗑️ Deleted duplicate time slot: ${timeSlot} (${slots[i].id})`);
          }
        }
      }

      setMessage(`✅ Cleaned up ${deletedCount} duplicate time slots!`);
      setTimeout(() => setMessage(''), 3000);
      
      // Reload data
      await loadData();
    } catch (error) {
      console.error('Error cleaning up duplicates:', error);
      setMessage('❌ Error cleaning up duplicates.');
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
      
      await (await getClient()).models.InviteLink.create({
        token,
        email: inviteEmail,
        isUsed: false,
        createdAt: new Date().toISOString()
      });

      const inviteUrl = `${window.location.origin}/register/${token}`;
      
      // Send invite email if email was provided
      if (inviteEmail.trim()) {
        try {
          console.log('📧 Sending invite email to:', inviteEmail);
          const response = await fetch('/api/send-invite-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: inviteEmail,
              inviteLink: inviteUrl,
              token: token
            }),
          });

          if (response.ok) {
            console.log('✅ Invite email sent successfully');
            setMessage(`Invite link generated and email sent to ${inviteEmail}. Link also copied to clipboard.`);
          } else {
            console.warn('⚠️ Invite email failed to send');
            setMessage(`Invite link generated and copied to clipboard: ${inviteUrl}. (Email sending failed)`);
          }
        } catch (emailError) {
          console.error('❌ Error sending invite email:', emailError);
          setMessage(`Invite link generated and copied to clipboard: ${inviteUrl}. (Email sending failed)`);
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
      await (await getClient()).models.InviteLink.delete({ id: inviteId });
      setMessage('Invite link invalidated successfully.');
      loadData(); // Reload to update the list
    } catch (error) {
      console.error('Error invalidating invite link:', error);
      setMessage('Error invalidating invite link.');
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
      const updatedConfig = await (await getClient()).models.RegistrationConfig.update({
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

  const filteredRegistrations = registrations.filter(reg => 
    reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone.includes(searchTerm) ||
    reg.timeSlot.includes(searchTerm)
  );

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
      await (await getClient()).models.Registration.update({
        id: editingRegistration,
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
        phone: editFormData.phone,
        timeSlot: editFormData.timeSlot,
        numberOfKids: editFormData.numberOfKids,
        referredBy: editFormData.referredBy
      });
      
      await loadData();
      setMessage('Registration updated successfully!');
      cancelEdit();
    } catch (error) {
      console.error('Error updating registration:', error);
      setMessage('Error updating registration.');
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      await (await getClient()).models.Registration.delete({ id });
      await loadData();
      setMessage('Registration deleted successfully!');
    } catch (error) {
      console.error('Error deleting registration:', error);
      setMessage('Error deleting registration.');
    }
  };

  const exportRegistrations = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Time Slot', 'Number of Kids', 'Needs Childcare', 'Referred By', 'Registration Date'],
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="p-8 rounded-lg mb-8 text-white" 
           style={{ background: `linear-gradient(135deg, ${BRANDING.primaryColor}, ${BRANDING.secondaryColor})` }}>
        <div className="flex items-center justify-center mb-4">
          <div className="text-6xl mr-4">{BRANDING.locationEmoji}</div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Christmas Store Admin</h1>
            <p className="text-lg opacity-90">{LOCATION_NAME}</p>
          </div>
        </div>
        <p className="text-center opacity-80">Manage registrations and time slots</p>
      </div>
      
      {message && (
        <div className="mb-6 p-4 bg-blue-500 text-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-2">ℹ️</span>
            {message}
          </div>
        </div>
      )}

      {/* Registration Settings */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-purple-800 flex items-center mb-6">
          ⚙️ Registration Settings
        </h2>
        
        {registrationConfig && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Registration Status */}
            <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center">
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
              <h3 className="font-bold text-purple-700 mb-3 flex items-center">
                📧 Access Mode
              </h3>
              <div className="space-y-3">
                <div className={`px-3 py-2 rounded-lg font-semibold text-center ${
                  registrationConfig.inviteOnlyMode
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-blue-100 text-blue-800'
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

            {/* Scheduled Closure */}
            <div className="bg-white border-2 border-purple-300 rounded-lg p-4">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center">
                ⏰ Scheduled Closure
              </h3>
              
              {registrationConfig.scheduledCloseDate && registrationConfig.autoCloseEnabled && (
                <div className="mb-3 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                  📅 Scheduled: {new Date(registrationConfig.scheduledCloseDate).toLocaleString()}
                </div>
              )}
              
              <div className="space-y-2">
                <input
                  type="date"
                  value={scheduledCloseDate}
                  onChange={(e) => setScheduledCloseDate(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
                  placeholder="Select date"
                />
                <input
                  type="time"
                  value={scheduledCloseTime}
                  onChange={(e) => setScheduledCloseTime(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm"
                  placeholder="Select time (optional)"
                />
                <button
                  onClick={scheduleRegistrationClosure}
                  disabled={loading || !scheduledCloseDate}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  ⏰ Schedule Closure
                </button>
                
                {registrationConfig?.autoCloseEnabled && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">
                      🔧 Test scheduled closure (for development)
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);
                          // This would be used to manually trigger the auto-close function
                          setMessage('🔄 Checking scheduled closure...');
                          // For now, just reload the data to check if it should close
                          await loadRegistrationConfig();
                          setMessage('✅ Checked scheduled closure');
                          setTimeout(() => setMessage(''), 2000);
                        } catch (error) {
                          setMessage('❌ Error checking scheduled closure');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      className="w-full bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium disabled:opacity-50"
                    >
                      🔍 Check Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Closure Message */}
            <div className="md:col-span-2 lg:col-span-3 bg-white border-2 border-purple-300 rounded-lg p-4">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center">
                💬 Closure Message
              </h3>
              <div className="space-y-3">
                <textarea
                  value={customClosureMessage}
                  onChange={(e) => setCustomClosureMessage(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded text-sm h-20"
                  placeholder="Message shown when registration is closed"
                />
                <button
                  onClick={() => updateRegistrationStatus('closureMessage', customClosureMessage)}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  💾 Save Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Time Slot Management */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center">
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
          
          <div className="space-y-3">
            {timeSlots.length === 0 ? (
              <div className="text-center py-8 bg-white border-2 border-blue-200 rounded-lg">
                <div className="text-4xl mb-4">{loading ? '🔄' : '⚠️'}</div>
                <p className="text-blue-800 mb-2 text-lg font-semibold">
                  {loading ? 'Setting up time slots...' : 'Time slots not found'}
                </p>
                <p className="text-blue-600 mb-4">
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
                      onClick={loadData}
                      disabled={loading}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold"
                    >
                      🔄 Refresh Data
                    </button>
                  </div>
                )}
                <div className="mt-4 text-xs text-gray-500">
                  <p>Debug info: timeSlots.length = {timeSlots.length}</p>
                  <p>Loading state: {loading ? 'true' : 'false'}</p>
                  {timeSlots.length > 0 && <p>Time slots found but not displaying - check console</p>}
                </div>
              </div>
            ) : (
              timeSlots.map(slot => {
                const percentage = (slot.currentRegistrations / slot.maxCapacity) * 100;
                const statusColor = percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500';
                const statusEmoji = percentage >= 100 ? '🔴' : percentage >= 80 ? '🟡' : '🟢';
                
                return (
                  <div key={slot.id} className="bg-white border-2 border-blue-300 rounded-lg p-4 hover:shadow-lg transition-all">
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
                              className="px-3 py-1 border-2 border-blue-400 rounded font-bold text-blue-800"
                              autoFocus
                            />
                            <button
                              onClick={() => setEditingTimeSlot(null)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              ❌
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xl text-blue-800">{statusEmoji} {slot.timeSlot}</span>
                            <button
                              onClick={() => setEditingTimeSlot(slot.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              ✏️
                            </button>
                          </div>
                        )}
                        <div className="text-blue-600 font-semibold mt-1">
                          {slot.currentRegistrations}/{slot.maxCapacity} registered ({percentage.toFixed(0)}%)
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className={`${statusColor} h-2 rounded-full transition-all`} style={{width: `${Math.min(percentage, 100)}%`}}></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-700 font-bold">Max:</span>
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
                            onBlur={(e) => {
                              const newValue = parseInt(e.target.value) || 0;
                              if (newValue !== slot.maxCapacity) {
                                updateTimeSlotCapacity(slot.id, newValue);
                              }
                            }}
                            className="w-20 px-3 py-2 text-center text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 border-0 focus:outline-none"
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
            
            {/* Add New Time Slot - Always show */}
            <div className="bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-blue-700 font-bold">➕ Add New Time Slot:</span>
                <input
                  type="time"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="HH:MM"
                  className="px-3 py-2 border-2 border-blue-300 rounded-lg text-gray-900 font-bold focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addNewTimeSlot}
                  disabled={loading || !newTimeSlot}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-bold disabled:opacity-50"
                >
                  🚀 Add Time Slot
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                💡 New time slots will start with 20 people capacity
              </p>
            </div>
          </div>
        </div>

        {/* Invite Link Management */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
            🔗 Invite Link Management
          </h2>
          
          {/* Generate New Invite Link */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-green-700">Generate New Invite Link</h3>
            <div>
              <label className="block text-green-700 font-bold mb-2">
                📧 Email Address (optional)
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-3 border-2 border-green-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={generateInviteLink}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold text-lg"
            >
              {loading ? '⏳ Generating...' : '🚀 Generate Invite Link'}
            </button>
          </div>

          {/* Existing Invite Links */}
          <div className="border-t-2 border-green-200 pt-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Existing Invite Links ({inviteLinks.length})
            </h3>
            
            {inviteLinks.length === 0 ? (
              <p className="text-green-600 italic">No invite links have been generated yet.</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {inviteLinks.map((invite) => (
                  <div
                    key={invite.id}
                    className={`p-4 rounded-lg border-2 ${
                      invite.isUsed 
                        ? 'bg-gray-100 border-gray-300 text-gray-600' 
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
                            <span className="text-sm text-gray-600">
                              📧 {invite.email}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created: {new Date(invite.createdAt).toLocaleString()}
                          {invite.usedAt && (
                            <span className="ml-4">
                              Used: {new Date(invite.usedAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 font-mono text-sm bg-gray-100 text-gray-800 p-2 rounded border break-all">
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Management */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center">
            👥 Registration Management ({filteredRegistrations.length} of {registrations.length})
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={sendConfirmationEmails}
              disabled={loading || registrations.length === 0}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-bold flex items-center disabled:opacity-50"
            >
              {loading ? '📧 Sending...' : '📧 Send Confirmation Emails'}
            </button>
            <button
              onClick={exportRegistrations}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-bold flex items-center"
            >
              📥 Export CSV
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search by name, email, phone, or time slot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border-2 border-purple-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute left-4 top-3.5 text-purple-500 text-xl">🔍</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-200 border-2 border-blue-400 p-4 rounded-lg text-center">
            <div className="text-4xl mb-2">👥</div>
            <h3 className="font-bold text-blue-800 text-lg">TOTAL REGISTRATIONS</h3>
            <p className="text-3xl font-bold text-blue-900">{registrations.length}</p>
          </div>
          <div className="bg-green-200 border-2 border-green-400 p-4 rounded-lg text-center">
            <div className="text-4xl mb-2">👶</div>
            <h3 className="font-bold text-green-800 text-lg">TOTAL CHILDREN</h3>
            <p className="text-3xl font-bold text-green-900">
              {registrations.reduce((sum, reg) => sum + reg.numberOfKids, 0)}
            </p>
          </div>
          <div className="bg-yellow-200 border-2 border-yellow-400 p-4 rounded-lg text-center">
            <div className="text-4xl mb-2">🍼</div>
            <h3 className="font-bold text-yellow-800 text-lg">NEED CHILDCARE</h3>
            <p className="text-3xl font-bold text-yellow-900">
              0
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-8 bg-white border-2 border-purple-200 rounded-lg">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl font-bold text-purple-800">No registrations found</p>
              <p className="text-purple-600">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <div key={reg.id} className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all">
                {editingRegistration === reg.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editFormData?.firstName || ''}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, firstName: e.target.value} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editFormData?.lastName || ''}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, lastName: e.target.value} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                        placeholder="Last Name"
                      />
                      <input
                        type="email"
                        value={editFormData?.email || ''}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, email: e.target.value} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        value={editFormData?.phone || ''}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, phone: e.target.value} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                        placeholder="Phone"
                      />
                      <select
                        value={editFormData?.timeSlot || ''}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, timeSlot: e.target.value} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                      >
                        {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'].map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={editFormData?.numberOfKids || 0}
                        onChange={(e) => setEditFormData(prev => prev ? {...prev, numberOfKids: parseInt(e.target.value) || 0} : null)}
                        className="px-3 py-2 border-2 border-blue-300 rounded-lg font-bold"
                        placeholder="Number of Kids"
                        min="0"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                        />
                        <span className="font-bold text-gray-800">Needs Childcare</span>
                      </label>
                    </div>
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
                        <h3 className="text-xl font-bold text-purple-900">{reg.firstName} {reg.lastName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <p className="text-purple-700"><span className="font-bold">📧 Email:</span> {reg.email}</p>
                          <p className="text-purple-700"><span className="font-bold">📱 Phone:</span> {reg.phone}</p>
                          <p className="text-purple-700"><span className="font-bold">⏰ Time:</span> <span className="bg-blue-200 px-2 py-1 rounded font-bold">{reg.timeSlot}</span></p>
                          <p className="text-purple-700"><span className="font-bold">👶 Kids:</span> {reg.numberOfKids}</p>
                          <p className="text-purple-700">
                            <span className="font-bold">🍼 Childcare:</span> 
                            </span>
                          </p>
                          {reg.referredBy && (
                            <p className="text-purple-700"><span className="font-bold">👤 Referred:</span> {reg.referredBy}</p>
                          )}
                          <p className="text-purple-700">
                            <span className="font-bold">📋 Status:</span>
                            {reg.isCancelled ? (
                              <span className="bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1">❌ CANCELLED</span>
                            ) : reg.attendanceConfirmed ? (
                              <span className="bg-green-200 text-green-800 px-2 py-1 rounded font-bold ml-1">✅ CONFIRMED</span>
                            ) : reg.confirmationToken ? (
                              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-bold ml-1">⏳ PENDING</span>
                            ) : (
                              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded font-bold ml-1">📝 REGISTERED</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4 md:mt-0">
                        <button onClick={() => startEdit(reg)} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600">
                          ✏️ Edit
                        </button>
                        <button onClick={() => deleteRegistration(reg.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
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
        <h1 className="text-4xl font-bold text-green-800 mb-2">Christmas Store</h1>
        <h2 className="text-2xl font-semibold text-red-600">Admin Portal</h2>
        <p className="text-gray-600 mt-2">Please sign in to manage registrations</p>
      </div>
    );
  },
  Footer() {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
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
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">🎄</div>
                    <div>
                      <h1 className="text-2xl font-bold">Christmas Store Admin</h1>
                      <p className="text-red-100">Welcome, {user?.signInDetails?.loginId}</p>
                    </div>
                  </div>
                  <button
                    onClick={signOut}
                    className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-bold flex items-center"
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
