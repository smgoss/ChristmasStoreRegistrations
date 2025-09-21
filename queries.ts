/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getChild = /* GraphQL */ `query GetChild($id: ID!) {
  getChild(id: $id) {
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
` as GeneratedQuery<APITypes.GetChildQueryVariables, APITypes.GetChildQuery>;
export const getInviteLink = /* GraphQL */ `query GetInviteLink($id: ID!) {
  getInviteLink(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInviteLinkQueryVariables,
  APITypes.GetInviteLinkQuery
>;
export const getRegistration = /* GraphQL */ `query GetRegistration($id: ID!) {
  getRegistration(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetRegistrationQueryVariables,
  APITypes.GetRegistrationQuery
>;
export const getRegistrationConfig = /* GraphQL */ `query GetRegistrationConfig($id: String!) {
  getRegistrationConfig(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetRegistrationConfigQueryVariables,
  APITypes.GetRegistrationConfigQuery
>;
export const getTimeSlotConfig = /* GraphQL */ `query GetTimeSlotConfig($id: ID!) {
  getTimeSlotConfig(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTimeSlotConfigQueryVariables,
  APITypes.GetTimeSlotConfigQuery
>;
export const listChildren = /* GraphQL */ `query ListChildren(
  $filter: ModelChildFilterInput
  $limit: Int
  $nextToken: String
) {
  listChildren(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      age
      createdAt
      gender
      id
      registrationId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChildrenQueryVariables,
  APITypes.ListChildrenQuery
>;
export const listInviteLinks = /* GraphQL */ `query ListInviteLinks(
  $filter: ModelInviteLinkFilterInput
  $limit: Int
  $nextToken: String
) {
  listInviteLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      email
      id
      isUsed
      token
      updatedAt
      usedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInviteLinksQueryVariables,
  APITypes.ListInviteLinksQuery
>;
export const listRegistrationConfigs = /* GraphQL */ `query ListRegistrationConfigs(
  $filter: ModelRegistrationConfigFilterInput
  $id: String
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listRegistrationConfigs(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRegistrationConfigsQueryVariables,
  APITypes.ListRegistrationConfigsQuery
>;
export const listRegistrations = /* GraphQL */ `query ListRegistrations(
  $filter: ModelRegistrationFilterInput
  $limit: Int
  $nextToken: String
) {
  listRegistrations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRegistrationsQueryVariables,
  APITypes.ListRegistrationsQuery
>;
export const listTimeSlotConfigs = /* GraphQL */ `query ListTimeSlotConfigs(
  $filter: ModelTimeSlotConfigFilterInput
  $limit: Int
  $nextToken: String
) {
  listTimeSlotConfigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      currentRegistrations
      id
      isActive
      maxCapacity
      timeSlot
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTimeSlotConfigsQueryVariables,
  APITypes.ListTimeSlotConfigsQuery
>;
