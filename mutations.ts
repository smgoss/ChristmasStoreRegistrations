/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChild = /* GraphQL */ `mutation CreateChild(
  $condition: ModelChildConditionInput
  $input: CreateChildInput!
) {
  createChild(condition: $condition, input: $input) {
    age
    createdAt
    gender
    id
    registration {
      attendanceConfirmed
      attendanceConfirmedAt
      cancelledAt
      city
      confirmationToken
      createdAt
      email
      finalConfirmationSentAt
      finalConfirmationToken
      finalConfirmedAt
      firstName
      id
      inviteToken
      inviteUsed
      isCancelled
      isConfirmed
      lastName
      needsChildcare
      numberOfKids
      phone
      referredBy
      registrationDate
      registrationStatus
      state
      streetAddress
      timeSlot
      updatedAt
      zipCode
      __typename
    }
    registrationId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChildMutationVariables,
  APITypes.CreateChildMutation
>;
export const createInviteLink = /* GraphQL */ `mutation CreateInviteLink(
  $condition: ModelInviteLinkConditionInput
  $input: CreateInviteLinkInput!
) {
  createInviteLink(condition: $condition, input: $input) {
    createdAt
    email
    id
    isUsed
    token
    updatedAt
    usedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInviteLinkMutationVariables,
  APITypes.CreateInviteLinkMutation
>;
export const createRegistration = /* GraphQL */ `mutation CreateRegistration(
  $condition: ModelRegistrationConditionInput
  $input: CreateRegistrationInput!
) {
  createRegistration(condition: $condition, input: $input) {
    attendanceConfirmed
    attendanceConfirmedAt
    cancelledAt
    children {
      nextToken
      __typename
    }
    city
    confirmationToken
    createdAt
    email
    finalConfirmationSentAt
    finalConfirmationToken
    finalConfirmedAt
    firstName
    id
    inviteToken
    inviteUsed
    isCancelled
    isConfirmed
    lastName
    needsChildcare
    numberOfKids
    phone
    referredBy
    registrationDate
    registrationStatus
    state
    streetAddress
    timeSlot
    updatedAt
    zipCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRegistrationMutationVariables,
  APITypes.CreateRegistrationMutation
>;
export const createRegistrationConfig = /* GraphQL */ `mutation CreateRegistrationConfig(
  $condition: ModelRegistrationConfigConditionInput
  $input: CreateRegistrationConfigInput!
) {
  createRegistrationConfig(condition: $condition, input: $input) {
    autoCloseEnabled
    closureMessage
    contactPhone
    createdAt
    eventAddress
    finalConfirmationDeadline
    finalConfirmationEnabled
    id
    inviteOnlyMode
    isRegistrationOpen
    locationName
    replyToEmail
    scheduledCloseDate
    textingNumber
    updatedAt
    updatedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRegistrationConfigMutationVariables,
  APITypes.CreateRegistrationConfigMutation
>;
export const createTimeSlotConfig = /* GraphQL */ `mutation CreateTimeSlotConfig(
  $condition: ModelTimeSlotConfigConditionInput
  $input: CreateTimeSlotConfigInput!
) {
  createTimeSlotConfig(condition: $condition, input: $input) {
    createdAt
    currentRegistrations
    id
    isActive
    maxCapacity
    timeSlot
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTimeSlotConfigMutationVariables,
  APITypes.CreateTimeSlotConfigMutation
>;
export const deleteChild = /* GraphQL */ `mutation DeleteChild(
  $condition: ModelChildConditionInput
  $input: DeleteChildInput!
) {
  deleteChild(condition: $condition, input: $input) {
    age
    createdAt
    gender
    id
    registration {
      attendanceConfirmed
      attendanceConfirmedAt
      cancelledAt
      city
      confirmationToken
      createdAt
      email
      finalConfirmationSentAt
      finalConfirmationToken
      finalConfirmedAt
      firstName
      id
      inviteToken
      inviteUsed
      isCancelled
      isConfirmed
      lastName
      needsChildcare
      numberOfKids
      phone
      referredBy
      registrationDate
      registrationStatus
      state
      streetAddress
      timeSlot
      updatedAt
      zipCode
      __typename
    }
    registrationId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChildMutationVariables,
  APITypes.DeleteChildMutation
>;
export const deleteInviteLink = /* GraphQL */ `mutation DeleteInviteLink(
  $condition: ModelInviteLinkConditionInput
  $input: DeleteInviteLinkInput!
) {
  deleteInviteLink(condition: $condition, input: $input) {
    createdAt
    email
    id
    isUsed
    token
    updatedAt
    usedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInviteLinkMutationVariables,
  APITypes.DeleteInviteLinkMutation
>;
export const deleteRegistration = /* GraphQL */ `mutation DeleteRegistration(
  $condition: ModelRegistrationConditionInput
  $input: DeleteRegistrationInput!
) {
  deleteRegistration(condition: $condition, input: $input) {
    attendanceConfirmed
    attendanceConfirmedAt
    cancelledAt
    children {
      nextToken
      __typename
    }
    city
    confirmationToken
    createdAt
    email
    finalConfirmationSentAt
    finalConfirmationToken
    finalConfirmedAt
    firstName
    id
    inviteToken
    inviteUsed
    isCancelled
    isConfirmed
    lastName
    needsChildcare
    numberOfKids
    phone
    referredBy
    registrationDate
    registrationStatus
    state
    streetAddress
    timeSlot
    updatedAt
    zipCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRegistrationMutationVariables,
  APITypes.DeleteRegistrationMutation
>;
export const deleteRegistrationConfig = /* GraphQL */ `mutation DeleteRegistrationConfig(
  $condition: ModelRegistrationConfigConditionInput
  $input: DeleteRegistrationConfigInput!
) {
  deleteRegistrationConfig(condition: $condition, input: $input) {
    autoCloseEnabled
    closureMessage
    contactPhone
    createdAt
    eventAddress
    finalConfirmationDeadline
    finalConfirmationEnabled
    id
    inviteOnlyMode
    isRegistrationOpen
    locationName
    replyToEmail
    scheduledCloseDate
    textingNumber
    updatedAt
    updatedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRegistrationConfigMutationVariables,
  APITypes.DeleteRegistrationConfigMutation
>;
export const deleteTimeSlotConfig = /* GraphQL */ `mutation DeleteTimeSlotConfig(
  $condition: ModelTimeSlotConfigConditionInput
  $input: DeleteTimeSlotConfigInput!
) {
  deleteTimeSlotConfig(condition: $condition, input: $input) {
    createdAt
    currentRegistrations
    id
    isActive
    maxCapacity
    timeSlot
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTimeSlotConfigMutationVariables,
  APITypes.DeleteTimeSlotConfigMutation
>;
export const sendCancellationEmail = /* GraphQL */ `mutation SendCancellationEmail(
  $registration: SendCancellationEmailRegistrationInput
  $registrationId: String
) {
  sendCancellationEmail(
    registration: $registration
    registrationId: $registrationId
  ) {
    message
    messageId
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendCancellationEmailMutationVariables,
  APITypes.SendCancellationEmailMutation
>;
export const sendConfirmationEmail = /* GraphQL */ `mutation SendConfirmationEmail(
  $registration: SendConfirmationEmailRegistrationInput
) {
  sendConfirmationEmail(registration: $registration) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendConfirmationEmailMutationVariables,
  APITypes.SendConfirmationEmailMutation
>;
export const sendCustomEmail = /* GraphQL */ `mutation SendCustomEmail(
  $message: String!
  $messageId: String!
  $registration: SendCustomEmailRegistrationInput
  $subject: String!
) {
  sendCustomEmail(
    message: $message
    messageId: $messageId
    registration: $registration
    subject: $subject
  ) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendCustomEmailMutationVariables,
  APITypes.SendCustomEmailMutation
>;
export const sendCustomSms = /* GraphQL */ `mutation SendCustomSms(
  $message: String!
  $messageId: String!
  $registration: SendCustomSmsRegistrationInput
) {
  sendCustomSms(
    message: $message
    messageId: $messageId
    registration: $registration
  ) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendCustomSmsMutationVariables,
  APITypes.SendCustomSmsMutation
>;
export const sendFinalConfirmationEmail = /* GraphQL */ `mutation SendFinalConfirmationEmail(
  $registration: SendFinalConfirmationEmailRegistrationInput
  $registrationId: String
) {
  sendFinalConfirmationEmail(
    registration: $registration
    registrationId: $registrationId
  ) {
    message
    messageId
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendFinalConfirmationEmailMutationVariables,
  APITypes.SendFinalConfirmationEmailMutation
>;
export const sendFinalConfirmationSms = /* GraphQL */ `mutation SendFinalConfirmationSms(
  $registration: SendFinalConfirmationSmsRegistrationInput
  $registrationId: String
) {
  sendFinalConfirmationSms(
    registration: $registration
    registrationId: $registrationId
  ) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendFinalConfirmationSmsMutationVariables,
  APITypes.SendFinalConfirmationSmsMutation
>;
export const sendInviteEmail = /* GraphQL */ `mutation SendInviteEmail(
  $invite: SendInviteEmailInviteInput
  $inviteId: String
) {
  sendInviteEmail(invite: $invite, inviteId: $inviteId) {
    message
    messageId
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendInviteEmailMutationVariables,
  APITypes.SendInviteEmailMutation
>;
export const sendSmsConfirmation = /* GraphQL */ `mutation SendSmsConfirmation(
  $registration: SendSmsConfirmationRegistrationInput
) {
  sendSmsConfirmation(registration: $registration) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.SendSmsConfirmationMutationVariables,
  APITypes.SendSmsConfirmationMutation
>;
export const updateChild = /* GraphQL */ `mutation UpdateChild(
  $condition: ModelChildConditionInput
  $input: UpdateChildInput!
) {
  updateChild(condition: $condition, input: $input) {
    age
    createdAt
    gender
    id
    registration {
      attendanceConfirmed
      attendanceConfirmedAt
      cancelledAt
      city
      confirmationToken
      createdAt
      email
      finalConfirmationSentAt
      finalConfirmationToken
      finalConfirmedAt
      firstName
      id
      inviteToken
      inviteUsed
      isCancelled
      isConfirmed
      lastName
      needsChildcare
      numberOfKids
      phone
      referredBy
      registrationDate
      registrationStatus
      state
      streetAddress
      timeSlot
      updatedAt
      zipCode
      __typename
    }
    registrationId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChildMutationVariables,
  APITypes.UpdateChildMutation
>;
export const updateInviteLink = /* GraphQL */ `mutation UpdateInviteLink(
  $condition: ModelInviteLinkConditionInput
  $input: UpdateInviteLinkInput!
) {
  updateInviteLink(condition: $condition, input: $input) {
    createdAt
    email
    id
    isUsed
    token
    updatedAt
    usedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInviteLinkMutationVariables,
  APITypes.UpdateInviteLinkMutation
>;
export const updateRegistration = /* GraphQL */ `mutation UpdateRegistration(
  $condition: ModelRegistrationConditionInput
  $input: UpdateRegistrationInput!
) {
  updateRegistration(condition: $condition, input: $input) {
    attendanceConfirmed
    attendanceConfirmedAt
    cancelledAt
    children {
      nextToken
      __typename
    }
    city
    confirmationToken
    createdAt
    email
    finalConfirmationSentAt
    finalConfirmationToken
    finalConfirmedAt
    firstName
    id
    inviteToken
    inviteUsed
    isCancelled
    isConfirmed
    lastName
    needsChildcare
    numberOfKids
    phone
    referredBy
    registrationDate
    registrationStatus
    state
    streetAddress
    timeSlot
    updatedAt
    zipCode
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRegistrationMutationVariables,
  APITypes.UpdateRegistrationMutation
>;
export const updateRegistrationConfig = /* GraphQL */ `mutation UpdateRegistrationConfig(
  $condition: ModelRegistrationConfigConditionInput
  $input: UpdateRegistrationConfigInput!
) {
  updateRegistrationConfig(condition: $condition, input: $input) {
    autoCloseEnabled
    closureMessage
    contactPhone
    createdAt
    eventAddress
    finalConfirmationDeadline
    finalConfirmationEnabled
    id
    inviteOnlyMode
    isRegistrationOpen
    locationName
    replyToEmail
    scheduledCloseDate
    textingNumber
    updatedAt
    updatedBy
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRegistrationConfigMutationVariables,
  APITypes.UpdateRegistrationConfigMutation
>;
export const updateTimeSlotConfig = /* GraphQL */ `mutation UpdateTimeSlotConfig(
  $condition: ModelTimeSlotConfigConditionInput
  $input: UpdateTimeSlotConfigInput!
) {
  updateTimeSlotConfig(condition: $condition, input: $input) {
    createdAt
    currentRegistrations
    id
    isActive
    maxCapacity
    timeSlot
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTimeSlotConfigMutationVariables,
  APITypes.UpdateTimeSlotConfigMutation
>;
