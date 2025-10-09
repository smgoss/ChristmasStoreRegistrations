import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sendSmsConfirmation } from '../functions/send-sms-confirmation/resource';
import { sendConfirmationEmail } from '../functions/send-confirmation-email/resource';
import { sendInviteEmail } from '../functions/send-invite-email/resource';
import { sendCancellationEmail } from '../functions/send-cancellation-email/resource';

const schema = a.schema({
  Registration: a
    .model({
      // Personal info
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      
      // Address info
      streetAddress: a.string().required(),
      zipCode: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      
      // Children info
      numberOfKids: a.integer().required(),
      children: a.hasMany('Child', 'registrationId'),
      
      // Time slot
      timeSlot: a.string().required(), // "09:00", "09:30", etc.
      
      // Additional requirements
      needsChildcare: a.boolean().default(false), // Kept for backward compatibility, not used in UI
      referredBy: a.string(),
      agencyName: a.string(), // Agency name if registered via agency invite

      // Invite link tracking
      inviteToken: a.string(),
      inviteUsed: a.boolean().default(false),
      
      // Registration status
      registrationStatus: a.enum(['registered', 'unconfirmed', 'confirmed', 'cancelled']),
      isConfirmed: a.boolean().default(false),
      registrationDate: a.datetime(),
      
      // Final confirmation tracking
      finalConfirmationSentAt: a.datetime(),
      finalConfirmationToken: a.string(), // Unique token for final confirmation links
      finalConfirmedAt: a.datetime(),
      
      // Attendance confirmation tracking
      attendanceConfirmed: a.boolean().default(false),
      attendanceConfirmedAt: a.datetime(),
      isCancelled: a.boolean().default(false),
      cancelledAt: a.datetime(),
      confirmationToken: a.string(), // Unique token for confirmation links
      
      // Email/SMS delivery status tracking - temporarily disabled for deployment
      // emailDeliveryStatus: a.enum(['pending', 'sent', 'delivered', 'failed', 'bounced']),
      // emailDeliveryAttemptedAt: a.datetime(),
      // emailFailureReason: a.string(),
      // smsDeliveryStatus: a.enum(['pending', 'sent', 'delivered', 'failed']),
      // smsDeliveryAttemptedAt: a.datetime(),
      // smsFailureReason: a.string(),
    })
    .authorization((allow) => [
      // Public can read, create, and update registrations (server route handles validation)
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),

  Waitlist: a
    .model({
      // Personal info
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      
      // Address info
      streetAddress: a.string().required(),
      zipCode: a.string().required(),
      city: a.string().required(),
      state: a.string().required(),
      
      // Children info
      numberOfKids: a.integer().required(),
      children: a.json(), // Store children data as JSON
      
      // Preferred time slots (if any)
      preferredTimeSlots: a.string(), // Comma-separated list like "09:00,10:00"
      
      // Additional info
      referredBy: a.string(),
      
      // Waitlist tracking
      waitlistDate: a.datetime().required(),
      position: a.integer(), // Position in waitlist (1 = first, 2 = second, etc.)
      isActive: a.boolean().default(true),
      
      // When moved to registration
      movedToRegistration: a.boolean().default(false),
      movedToRegistrationAt: a.datetime(),
      registrationId: a.string(), // ID of the created registration
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),
  
  Child: a
    .model({
      registrationId: a.id().required(),
      age: a.string().required(), // Changed from integer to string to support "<1"
      gender: a.enum(['boy', 'girl']),
      registration: a.belongsTo('Registration', 'registrationId'),
    })
    .authorization((allow) => [
      // Child records can be created via server route
      allow.publicApiKey().to(['read', 'create']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),
  
  TimeSlotConfig: a
    .model({
      timeSlot: a.string().required(), // "09:00", "09:30", etc.
      maxCapacity: a.integer().required(),
      currentRegistrations: a.integer().default(0),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),
  
  InviteLink: a
    .model({
      token: a.string().required(),
      email: a.email(),
      isUsed: a.boolean().default(false),
      createdAt: a.datetime(),
      usedAt: a.datetime(),

      // Agency invite fields
      isAgencyInvite: a.boolean().default(false),
      agencyName: a.string(),
      agencyEmail: a.email(),
      agencyContact: a.string(),
      maxUsageCount: a.integer().default(1), // How many times this link can be used
      currentUsageCount: a.integer().default(0), // How many times it has been used

      // Email delivery status tracking for invite emails - temporarily disabled for deployment
      // emailDeliveryStatus: a.enum(['pending', 'sent', 'delivered', 'failed', 'bounced']),
      // emailDeliveryAttemptedAt: a.datetime(),
      // emailFailureReason: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update', 'delete']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),

  RegistrationConfig: a
    .model({
      id: a.string().required(), // Using 'main' as singleton ID
      isRegistrationOpen: a.boolean().default(true),
      inviteOnlyMode: a.boolean().default(false),
      scheduledCloseDate: a.datetime(),
      autoCloseEnabled: a.boolean().default(false),
      closureMessage: a.string().default('Registration is currently closed. Please check back later.'),
      finalConfirmationDeadline: a.datetime(),
      finalConfirmationEnabled: a.boolean().default(false),
      fromEmail: a.string().default('Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>'),
      replyToEmail: a.string().default('office@pathwayvineyard.com'),
      contactPhone: a.string().default('(208) 746-9089'),
      textingNumber: a.string().default('(208) 746-9089'),
      locationName: a.string().default('Christmas Store'),
      eventAddress: a.string().default(''),
      frontendUrl: a.string().default('http://localhost:3004'),
      updatedBy: a.string(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),

  sendSmsConfirmation: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        streetAddress: a.string().required(),
        zipCode: a.string().required(),
        city: a.string().required(),
        state: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
        referredBy: a.string(),
        registrationDate: a.string().required(),
      })
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendSmsConfirmation)),

  // Email confirmation mutation - force resolver refresh
  sendConfirmationEmail: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        streetAddress: a.string().required(),
        zipCode: a.string().required(),
        city: a.string().required(),
        state: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
        referredBy: a.string(),
        children: a.json(),
      })
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendConfirmationEmail)),

  sendInviteEmail: a
    .mutation()
    .arguments({
      invite: a.customType({
        email: a.string().required(),
        token: a.string().required(),
        inviteUrl: a.string().required(),
        isAgencyInvite: a.boolean(),
        agencyName: a.string(),
        agencyContact: a.string(),
        maxUsageCount: a.integer(),
      }),
      inviteId: a.string()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
      messageId: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendInviteEmail)),

  sendCancellationEmail: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        streetAddress: a.string().required(),
        zipCode: a.string().required(),
        city: a.string().required(),
        state: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
        referredBy: a.string(),
        children: a.json(),
      }),
      registrationId: a.string()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
      messageId: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendCancellationEmail)),

  sendFinalConfirmationEmail: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
        confirmationUrl: a.string().required(),
      }),
      registrationId: a.string()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
      messageId: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendConfirmationEmail)),

  sendFinalConfirmationSms: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
        confirmationUrl: a.string().required(),
      }),
      registrationId: a.string()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendSmsConfirmation)),

  sendCustomEmail: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
      }),
      subject: a.string().required(),
      message: a.string().required(),
      messageId: a.string().required()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendConfirmationEmail)),

  sendCustomSms: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        timeSlot: a.string().required(),
        numberOfKids: a.integer().required(),
      }),
      message: a.string().required(),
      messageId: a.string().required()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendSmsConfirmation)),

  sendWaitlistEmail: a
    .mutation()
    .arguments({
      waitlistEntry: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
        numberOfKids: a.integer().required(),
        preferredTimeSlots: a.string(),
        position: a.integer().required(),
      }),
      waitlistId: a.string()
    })
    .returns(a.customType({
      success: a.boolean().required(),
      message: a.string(),
      messageId: a.string(),
    }))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(a.handler.function(sendConfirmationEmail)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
