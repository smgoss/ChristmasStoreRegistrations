import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { sendSmsConfirmation } from '../functions/send-sms-confirmation/resource';
import { sendConfirmationEmail } from '../functions/send-confirmation-email/resource';

const schema = a.schema({
  Registration: a
    .model({
      // Personal info
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      
      // Children info
      numberOfKids: a.integer().required(),
      children: a.hasMany('Child', 'registrationId'),
      
      // Time slot
      timeSlot: a.string().required(), // "09:00", "09:30", etc.
      
      // Additional requirements
      needsChildcare: a.boolean().default(false), // Kept for backward compatibility, not used in UI
      referredBy: a.string(),
      
      // Invite link tracking
      inviteToken: a.string(),
      inviteUsed: a.boolean().default(false),
      
      // Registration status
      isConfirmed: a.boolean().default(false),
      registrationDate: a.datetime(),
      
      // Attendance confirmation tracking
      attendanceConfirmed: a.boolean().default(false),
      attendanceConfirmedAt: a.datetime(),
      isCancelled: a.boolean().default(false),
      cancelledAt: a.datetime(),
      confirmationToken: a.string(), // Unique token for confirmation links
    })
    .authorization((allow) => [
      // Public can read and create registrations (server route handles validation)
      allow.publicApiKey().to(['read', 'create']),
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
      allow.publicApiKey().to(['read']),
      allow.group('admin').to(['read', 'create', 'update', 'delete'])
    ]),
  
  InviteLink: a
    .model({
      token: a.string().required(),
      email: a.email(),
      isUsed: a.boolean().default(false),
      createdAt: a.datetime(),
      usedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'update']),
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
      updatedBy: a.string(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
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

  // Email confirmation mutation
  sendConfirmationEmail: a
    .mutation()
    .arguments({
      registration: a.customType({
        firstName: a.string().required(),
        lastName: a.string().required(),
        email: a.string().required(),
        phone: a.string().required(),
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
