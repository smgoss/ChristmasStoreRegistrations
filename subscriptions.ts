/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChild = /* GraphQL */ `subscription OnCreateChild($filter: ModelSubscriptionChildFilterInput) {
  onCreateChild(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateChildSubscriptionVariables,
  APITypes.OnCreateChildSubscription
>;
export const onCreateInviteLink = /* GraphQL */ `subscription OnCreateInviteLink(
  $filter: ModelSubscriptionInviteLinkFilterInput
) {
  onCreateInviteLink(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInviteLinkSubscriptionVariables,
  APITypes.OnCreateInviteLinkSubscription
>;
export const onCreateRegistration = /* GraphQL */ `subscription OnCreateRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onCreateRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRegistrationSubscriptionVariables,
  APITypes.OnCreateRegistrationSubscription
>;
export const onCreateRegistrationConfig = /* GraphQL */ `subscription OnCreateRegistrationConfig(
  $filter: ModelSubscriptionRegistrationConfigFilterInput
) {
  onCreateRegistrationConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRegistrationConfigSubscriptionVariables,
  APITypes.OnCreateRegistrationConfigSubscription
>;
export const onCreateTimeSlotConfig = /* GraphQL */ `subscription OnCreateTimeSlotConfig(
  $filter: ModelSubscriptionTimeSlotConfigFilterInput
) {
  onCreateTimeSlotConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTimeSlotConfigSubscriptionVariables,
  APITypes.OnCreateTimeSlotConfigSubscription
>;
export const onDeleteChild = /* GraphQL */ `subscription OnDeleteChild($filter: ModelSubscriptionChildFilterInput) {
  onDeleteChild(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteChildSubscriptionVariables,
  APITypes.OnDeleteChildSubscription
>;
export const onDeleteInviteLink = /* GraphQL */ `subscription OnDeleteInviteLink(
  $filter: ModelSubscriptionInviteLinkFilterInput
) {
  onDeleteInviteLink(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInviteLinkSubscriptionVariables,
  APITypes.OnDeleteInviteLinkSubscription
>;
export const onDeleteRegistration = /* GraphQL */ `subscription OnDeleteRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onDeleteRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRegistrationSubscriptionVariables,
  APITypes.OnDeleteRegistrationSubscription
>;
export const onDeleteRegistrationConfig = /* GraphQL */ `subscription OnDeleteRegistrationConfig(
  $filter: ModelSubscriptionRegistrationConfigFilterInput
) {
  onDeleteRegistrationConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRegistrationConfigSubscriptionVariables,
  APITypes.OnDeleteRegistrationConfigSubscription
>;
export const onDeleteTimeSlotConfig = /* GraphQL */ `subscription OnDeleteTimeSlotConfig(
  $filter: ModelSubscriptionTimeSlotConfigFilterInput
) {
  onDeleteTimeSlotConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTimeSlotConfigSubscriptionVariables,
  APITypes.OnDeleteTimeSlotConfigSubscription
>;
export const onUpdateChild = /* GraphQL */ `subscription OnUpdateChild($filter: ModelSubscriptionChildFilterInput) {
  onUpdateChild(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateChildSubscriptionVariables,
  APITypes.OnUpdateChildSubscription
>;
export const onUpdateInviteLink = /* GraphQL */ `subscription OnUpdateInviteLink(
  $filter: ModelSubscriptionInviteLinkFilterInput
) {
  onUpdateInviteLink(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInviteLinkSubscriptionVariables,
  APITypes.OnUpdateInviteLinkSubscription
>;
export const onUpdateRegistration = /* GraphQL */ `subscription OnUpdateRegistration(
  $filter: ModelSubscriptionRegistrationFilterInput
) {
  onUpdateRegistration(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRegistrationSubscriptionVariables,
  APITypes.OnUpdateRegistrationSubscription
>;
export const onUpdateRegistrationConfig = /* GraphQL */ `subscription OnUpdateRegistrationConfig(
  $filter: ModelSubscriptionRegistrationConfigFilterInput
) {
  onUpdateRegistrationConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRegistrationConfigSubscriptionVariables,
  APITypes.OnUpdateRegistrationConfigSubscription
>;
export const onUpdateTimeSlotConfig = /* GraphQL */ `subscription OnUpdateTimeSlotConfig(
  $filter: ModelSubscriptionTimeSlotConfigFilterInput
) {
  onUpdateTimeSlotConfig(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTimeSlotConfigSubscriptionVariables,
  APITypes.OnUpdateTimeSlotConfigSubscription
>;
