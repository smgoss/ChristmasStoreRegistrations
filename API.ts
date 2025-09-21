/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Child = {
  __typename: "Child",
  age: string,
  createdAt: string,
  gender?: ChildGender | null,
  id: string,
  registration?: Registration | null,
  registrationId: string,
  updatedAt: string,
};

export enum ChildGender {
  boy = "boy",
  girl = "girl",
}


export type Registration = {
  __typename: "Registration",
  attendanceConfirmed?: boolean | null,
  attendanceConfirmedAt?: string | null,
  cancelledAt?: string | null,
  children?: ModelChildConnection | null,
  city: string,
  confirmationToken?: string | null,
  createdAt: string,
  email: string,
  finalConfirmationSentAt?: string | null,
  finalConfirmationToken?: string | null,
  finalConfirmedAt?: string | null,
  firstName: string,
  id: string,
  inviteToken?: string | null,
  inviteUsed?: boolean | null,
  isCancelled?: boolean | null,
  isConfirmed?: boolean | null,
  lastName: string,
  needsChildcare?: boolean | null,
  numberOfKids: number,
  phone: string,
  referredBy?: string | null,
  registrationDate?: string | null,
  registrationStatus?: RegistrationRegistrationStatus | null,
  state: string,
  streetAddress: string,
  timeSlot: string,
  updatedAt: string,
  zipCode: string,
};

export type ModelChildConnection = {
  __typename: "ModelChildConnection",
  items:  Array<Child | null >,
  nextToken?: string | null,
};

export enum RegistrationRegistrationStatus {
  cancelled = "cancelled",
  confirmed = "confirmed",
  registered = "registered",
  unconfirmed = "unconfirmed",
}


export type InviteLink = {
  __typename: "InviteLink",
  createdAt?: string | null,
  email?: string | null,
  id: string,
  isUsed?: boolean | null,
  token: string,
  updatedAt: string,
  usedAt?: string | null,
};

export type RegistrationConfig = {
  __typename: "RegistrationConfig",
  autoCloseEnabled?: boolean | null,
  closureMessage?: string | null,
  contactPhone?: string | null,
  createdAt: string,
  eventAddress?: string | null,
  finalConfirmationDeadline?: string | null,
  finalConfirmationEnabled?: boolean | null,
  id: string,
  inviteOnlyMode?: boolean | null,
  isRegistrationOpen?: boolean | null,
  locationName?: string | null,
  replyToEmail?: string | null,
  scheduledCloseDate?: string | null,
  textingNumber?: string | null,
  updatedAt?: string | null,
  updatedBy?: string | null,
};

export type TimeSlotConfig = {
  __typename: "TimeSlotConfig",
  createdAt: string,
  currentRegistrations?: number | null,
  id: string,
  isActive?: boolean | null,
  maxCapacity: number,
  timeSlot: string,
  updatedAt: string,
};

export type ModelChildFilterInput = {
  age?: ModelStringInput | null,
  and?: Array< ModelChildFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  gender?: ModelChildGenderInput | null,
  id?: ModelIDInput | null,
  not?: ModelChildFilterInput | null,
  or?: Array< ModelChildFilterInput | null > | null,
  registrationId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelChildGenderInput = {
  eq?: ChildGender | null,
  ne?: ChildGender | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelInviteLinkFilterInput = {
  and?: Array< ModelInviteLinkFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isUsed?: ModelBooleanInput | null,
  not?: ModelInviteLinkFilterInput | null,
  or?: Array< ModelInviteLinkFilterInput | null > | null,
  token?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  usedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelInviteLinkConnection = {
  __typename: "ModelInviteLinkConnection",
  items:  Array<InviteLink | null >,
  nextToken?: string | null,
};

export type ModelRegistrationConfigFilterInput = {
  and?: Array< ModelRegistrationConfigFilterInput | null > | null,
  autoCloseEnabled?: ModelBooleanInput | null,
  closureMessage?: ModelStringInput | null,
  contactPhone?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  eventAddress?: ModelStringInput | null,
  finalConfirmationDeadline?: ModelStringInput | null,
  finalConfirmationEnabled?: ModelBooleanInput | null,
  id?: ModelStringInput | null,
  inviteOnlyMode?: ModelBooleanInput | null,
  isRegistrationOpen?: ModelBooleanInput | null,
  locationName?: ModelStringInput | null,
  not?: ModelRegistrationConfigFilterInput | null,
  or?: Array< ModelRegistrationConfigFilterInput | null > | null,
  replyToEmail?: ModelStringInput | null,
  scheduledCloseDate?: ModelStringInput | null,
  textingNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelRegistrationConfigConnection = {
  __typename: "ModelRegistrationConfigConnection",
  items:  Array<RegistrationConfig | null >,
  nextToken?: string | null,
};

export type ModelRegistrationFilterInput = {
  and?: Array< ModelRegistrationFilterInput | null > | null,
  attendanceConfirmed?: ModelBooleanInput | null,
  attendanceConfirmedAt?: ModelStringInput | null,
  cancelledAt?: ModelStringInput | null,
  city?: ModelStringInput | null,
  confirmationToken?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  finalConfirmationSentAt?: ModelStringInput | null,
  finalConfirmationToken?: ModelStringInput | null,
  finalConfirmedAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  inviteToken?: ModelStringInput | null,
  inviteUsed?: ModelBooleanInput | null,
  isCancelled?: ModelBooleanInput | null,
  isConfirmed?: ModelBooleanInput | null,
  lastName?: ModelStringInput | null,
  needsChildcare?: ModelBooleanInput | null,
  not?: ModelRegistrationFilterInput | null,
  numberOfKids?: ModelIntInput | null,
  or?: Array< ModelRegistrationFilterInput | null > | null,
  phone?: ModelStringInput | null,
  referredBy?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  registrationStatus?: ModelRegistrationRegistrationStatusInput | null,
  state?: ModelStringInput | null,
  streetAddress?: ModelStringInput | null,
  timeSlot?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelRegistrationRegistrationStatusInput = {
  eq?: RegistrationRegistrationStatus | null,
  ne?: RegistrationRegistrationStatus | null,
};

export type ModelRegistrationConnection = {
  __typename: "ModelRegistrationConnection",
  items:  Array<Registration | null >,
  nextToken?: string | null,
};

export type ModelTimeSlotConfigFilterInput = {
  and?: Array< ModelTimeSlotConfigFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  currentRegistrations?: ModelIntInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  maxCapacity?: ModelIntInput | null,
  not?: ModelTimeSlotConfigFilterInput | null,
  or?: Array< ModelTimeSlotConfigFilterInput | null > | null,
  timeSlot?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTimeSlotConfigConnection = {
  __typename: "ModelTimeSlotConfigConnection",
  items:  Array<TimeSlotConfig | null >,
  nextToken?: string | null,
};

export type ModelChildConditionInput = {
  age?: ModelStringInput | null,
  and?: Array< ModelChildConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  gender?: ModelChildGenderInput | null,
  not?: ModelChildConditionInput | null,
  or?: Array< ModelChildConditionInput | null > | null,
  registrationId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChildInput = {
  age: string,
  gender?: ChildGender | null,
  id?: string | null,
  registrationId: string,
};

export type ModelInviteLinkConditionInput = {
  and?: Array< ModelInviteLinkConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  isUsed?: ModelBooleanInput | null,
  not?: ModelInviteLinkConditionInput | null,
  or?: Array< ModelInviteLinkConditionInput | null > | null,
  token?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  usedAt?: ModelStringInput | null,
};

export type CreateInviteLinkInput = {
  createdAt?: string | null,
  email?: string | null,
  id?: string | null,
  isUsed?: boolean | null,
  token: string,
  usedAt?: string | null,
};

export type ModelRegistrationConditionInput = {
  and?: Array< ModelRegistrationConditionInput | null > | null,
  attendanceConfirmed?: ModelBooleanInput | null,
  attendanceConfirmedAt?: ModelStringInput | null,
  cancelledAt?: ModelStringInput | null,
  city?: ModelStringInput | null,
  confirmationToken?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  finalConfirmationSentAt?: ModelStringInput | null,
  finalConfirmationToken?: ModelStringInput | null,
  finalConfirmedAt?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  inviteToken?: ModelStringInput | null,
  inviteUsed?: ModelBooleanInput | null,
  isCancelled?: ModelBooleanInput | null,
  isConfirmed?: ModelBooleanInput | null,
  lastName?: ModelStringInput | null,
  needsChildcare?: ModelBooleanInput | null,
  not?: ModelRegistrationConditionInput | null,
  numberOfKids?: ModelIntInput | null,
  or?: Array< ModelRegistrationConditionInput | null > | null,
  phone?: ModelStringInput | null,
  referredBy?: ModelStringInput | null,
  registrationDate?: ModelStringInput | null,
  registrationStatus?: ModelRegistrationRegistrationStatusInput | null,
  state?: ModelStringInput | null,
  streetAddress?: ModelStringInput | null,
  timeSlot?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  zipCode?: ModelStringInput | null,
};

export type CreateRegistrationInput = {
  attendanceConfirmed?: boolean | null,
  attendanceConfirmedAt?: string | null,
  cancelledAt?: string | null,
  city: string,
  confirmationToken?: string | null,
  email: string,
  finalConfirmationSentAt?: string | null,
  finalConfirmationToken?: string | null,
  finalConfirmedAt?: string | null,
  firstName: string,
  id?: string | null,
  inviteToken?: string | null,
  inviteUsed?: boolean | null,
  isCancelled?: boolean | null,
  isConfirmed?: boolean | null,
  lastName: string,
  needsChildcare?: boolean | null,
  numberOfKids: number,
  phone: string,
  referredBy?: string | null,
  registrationDate?: string | null,
  registrationStatus?: RegistrationRegistrationStatus | null,
  state: string,
  streetAddress: string,
  timeSlot: string,
  zipCode: string,
};

export type ModelRegistrationConfigConditionInput = {
  and?: Array< ModelRegistrationConfigConditionInput | null > | null,
  autoCloseEnabled?: ModelBooleanInput | null,
  closureMessage?: ModelStringInput | null,
  contactPhone?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  eventAddress?: ModelStringInput | null,
  finalConfirmationDeadline?: ModelStringInput | null,
  finalConfirmationEnabled?: ModelBooleanInput | null,
  inviteOnlyMode?: ModelBooleanInput | null,
  isRegistrationOpen?: ModelBooleanInput | null,
  locationName?: ModelStringInput | null,
  not?: ModelRegistrationConfigConditionInput | null,
  or?: Array< ModelRegistrationConfigConditionInput | null > | null,
  replyToEmail?: ModelStringInput | null,
  scheduledCloseDate?: ModelStringInput | null,
  textingNumber?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  updatedBy?: ModelStringInput | null,
};

export type CreateRegistrationConfigInput = {
  autoCloseEnabled?: boolean | null,
  closureMessage?: string | null,
  contactPhone?: string | null,
  eventAddress?: string | null,
  finalConfirmationDeadline?: string | null,
  finalConfirmationEnabled?: boolean | null,
  id?: string | null,
  inviteOnlyMode?: boolean | null,
  isRegistrationOpen?: boolean | null,
  locationName?: string | null,
  replyToEmail?: string | null,
  scheduledCloseDate?: string | null,
  textingNumber?: string | null,
  updatedAt?: string | null,
  updatedBy?: string | null,
};

export type ModelTimeSlotConfigConditionInput = {
  and?: Array< ModelTimeSlotConfigConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  currentRegistrations?: ModelIntInput | null,
  isActive?: ModelBooleanInput | null,
  maxCapacity?: ModelIntInput | null,
  not?: ModelTimeSlotConfigConditionInput | null,
  or?: Array< ModelTimeSlotConfigConditionInput | null > | null,
  timeSlot?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTimeSlotConfigInput = {
  currentRegistrations?: number | null,
  id?: string | null,
  isActive?: boolean | null,
  maxCapacity: number,
  timeSlot: string,
};

export type DeleteChildInput = {
  id: string,
};

export type DeleteInviteLinkInput = {
  id: string,
};

export type DeleteRegistrationInput = {
  id: string,
};

export type DeleteRegistrationConfigInput = {
  id: string,
};

export type DeleteTimeSlotConfigInput = {
  id: string,
};

export type SendCancellationEmailRegistrationInput = {
  children?: string | null,
  city: string,
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  referredBy?: string | null,
  state: string,
  streetAddress: string,
  timeSlot: string,
  zipCode: string,
};

export type SendCancellationEmailReturnType = {
  __typename: "SendCancellationEmailReturnType",
  message?: string | null,
  messageId?: string | null,
  success: boolean,
};

export type SendConfirmationEmailRegistrationInput = {
  children?: string | null,
  city: string,
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  referredBy?: string | null,
  state: string,
  streetAddress: string,
  timeSlot: string,
  zipCode: string,
};

export type SendConfirmationEmailReturnType = {
  __typename: "SendConfirmationEmailReturnType",
  message?: string | null,
  success: boolean,
};

export type SendCustomEmailRegistrationInput = {
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  timeSlot: string,
};

export type SendCustomEmailReturnType = {
  __typename: "SendCustomEmailReturnType",
  message?: string | null,
  success: boolean,
};

export type SendCustomSmsRegistrationInput = {
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  timeSlot: string,
};

export type SendCustomSmsReturnType = {
  __typename: "SendCustomSmsReturnType",
  message?: string | null,
  success: boolean,
};

export type SendFinalConfirmationEmailRegistrationInput = {
  confirmationUrl: string,
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  timeSlot: string,
};

export type SendFinalConfirmationEmailReturnType = {
  __typename: "SendFinalConfirmationEmailReturnType",
  message?: string | null,
  messageId?: string | null,
  success: boolean,
};

export type SendFinalConfirmationSmsRegistrationInput = {
  confirmationUrl: string,
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  timeSlot: string,
};

export type SendFinalConfirmationSmsReturnType = {
  __typename: "SendFinalConfirmationSmsReturnType",
  message?: string | null,
  success: boolean,
};

export type SendInviteEmailInviteInput = {
  email: string,
  inviteUrl: string,
  token: string,
};

export type SendInviteEmailReturnType = {
  __typename: "SendInviteEmailReturnType",
  message?: string | null,
  messageId?: string | null,
  success: boolean,
};

export type SendSmsConfirmationRegistrationInput = {
  city: string,
  email: string,
  firstName: string,
  lastName: string,
  numberOfKids: number,
  phone: string,
  referredBy?: string | null,
  registrationDate: string,
  state: string,
  streetAddress: string,
  timeSlot: string,
  zipCode: string,
};

export type SendSmsConfirmationReturnType = {
  __typename: "SendSmsConfirmationReturnType",
  message?: string | null,
  success: boolean,
};

export type UpdateChildInput = {
  age?: string | null,
  gender?: ChildGender | null,
  id: string,
  registrationId?: string | null,
};

export type UpdateInviteLinkInput = {
  createdAt?: string | null,
  email?: string | null,
  id: string,
  isUsed?: boolean | null,
  token?: string | null,
  usedAt?: string | null,
};

export type UpdateRegistrationInput = {
  attendanceConfirmed?: boolean | null,
  attendanceConfirmedAt?: string | null,
  cancelledAt?: string | null,
  city?: string | null,
  confirmationToken?: string | null,
  email?: string | null,
  finalConfirmationSentAt?: string | null,
  finalConfirmationToken?: string | null,
  finalConfirmedAt?: string | null,
  firstName?: string | null,
  id: string,
  inviteToken?: string | null,
  inviteUsed?: boolean | null,
  isCancelled?: boolean | null,
  isConfirmed?: boolean | null,
  lastName?: string | null,
  needsChildcare?: boolean | null,
  numberOfKids?: number | null,
  phone?: string | null,
  referredBy?: string | null,
  registrationDate?: string | null,
  registrationStatus?: RegistrationRegistrationStatus | null,
  state?: string | null,
  streetAddress?: string | null,
  timeSlot?: string | null,
  zipCode?: string | null,
};

export type UpdateRegistrationConfigInput = {
  autoCloseEnabled?: boolean | null,
  closureMessage?: string | null,
  contactPhone?: string | null,
  eventAddress?: string | null,
  finalConfirmationDeadline?: string | null,
  finalConfirmationEnabled?: boolean | null,
  id: string,
  inviteOnlyMode?: boolean | null,
  isRegistrationOpen?: boolean | null,
  locationName?: string | null,
  replyToEmail?: string | null,
  scheduledCloseDate?: string | null,
  textingNumber?: string | null,
  updatedAt?: string | null,
  updatedBy?: string | null,
};

export type UpdateTimeSlotConfigInput = {
  currentRegistrations?: number | null,
  id: string,
  isActive?: boolean | null,
  maxCapacity?: number | null,
  timeSlot?: string | null,
};

export type ModelSubscriptionChildFilterInput = {
  age?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChildFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionChildFilterInput | null > | null,
  registrationId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionInviteLinkFilterInput = {
  and?: Array< ModelSubscriptionInviteLinkFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isUsed?: ModelSubscriptionBooleanInput | null,
  or?: Array< ModelSubscriptionInviteLinkFilterInput | null > | null,
  token?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  usedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionRegistrationFilterInput = {
  and?: Array< ModelSubscriptionRegistrationFilterInput | null > | null,
  attendanceConfirmed?: ModelSubscriptionBooleanInput | null,
  attendanceConfirmedAt?: ModelSubscriptionStringInput | null,
  cancelledAt?: ModelSubscriptionStringInput | null,
  city?: ModelSubscriptionStringInput | null,
  confirmationToken?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  finalConfirmationSentAt?: ModelSubscriptionStringInput | null,
  finalConfirmationToken?: ModelSubscriptionStringInput | null,
  finalConfirmedAt?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  inviteToken?: ModelSubscriptionStringInput | null,
  inviteUsed?: ModelSubscriptionBooleanInput | null,
  isCancelled?: ModelSubscriptionBooleanInput | null,
  isConfirmed?: ModelSubscriptionBooleanInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  needsChildcare?: ModelSubscriptionBooleanInput | null,
  numberOfKids?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionRegistrationFilterInput | null > | null,
  phone?: ModelSubscriptionStringInput | null,
  referredBy?: ModelSubscriptionStringInput | null,
  registrationDate?: ModelSubscriptionStringInput | null,
  registrationStatus?: ModelSubscriptionStringInput | null,
  state?: ModelSubscriptionStringInput | null,
  streetAddress?: ModelSubscriptionStringInput | null,
  timeSlot?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  zipCode?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionRegistrationConfigFilterInput = {
  and?: Array< ModelSubscriptionRegistrationConfigFilterInput | null > | null,
  autoCloseEnabled?: ModelSubscriptionBooleanInput | null,
  closureMessage?: ModelSubscriptionStringInput | null,
  contactPhone?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  eventAddress?: ModelSubscriptionStringInput | null,
  finalConfirmationDeadline?: ModelSubscriptionStringInput | null,
  finalConfirmationEnabled?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionStringInput | null,
  inviteOnlyMode?: ModelSubscriptionBooleanInput | null,
  isRegistrationOpen?: ModelSubscriptionBooleanInput | null,
  locationName?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionRegistrationConfigFilterInput | null > | null,
  replyToEmail?: ModelSubscriptionStringInput | null,
  scheduledCloseDate?: ModelSubscriptionStringInput | null,
  textingNumber?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  updatedBy?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionTimeSlotConfigFilterInput = {
  and?: Array< ModelSubscriptionTimeSlotConfigFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  currentRegistrations?: ModelSubscriptionIntInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  maxCapacity?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionTimeSlotConfigFilterInput | null > | null,
  timeSlot?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type GetChildQueryVariables = {
  id: string,
};

export type GetChildQuery = {
  getChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type GetInviteLinkQueryVariables = {
  id: string,
};

export type GetInviteLinkQuery = {
  getInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type GetRegistrationQueryVariables = {
  id: string,
};

export type GetRegistrationQuery = {
  getRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type GetRegistrationConfigQueryVariables = {
  id: string,
};

export type GetRegistrationConfigQuery = {
  getRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type GetTimeSlotConfigQueryVariables = {
  id: string,
};

export type GetTimeSlotConfigQuery = {
  getTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type ListChildrenQueryVariables = {
  filter?: ModelChildFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChildrenQuery = {
  listChildren?:  {
    __typename: "ModelChildConnection",
    items:  Array< {
      __typename: "Child",
      age: string,
      createdAt: string,
      gender?: ChildGender | null,
      id: string,
      registrationId: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListInviteLinksQueryVariables = {
  filter?: ModelInviteLinkFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInviteLinksQuery = {
  listInviteLinks?:  {
    __typename: "ModelInviteLinkConnection",
    items:  Array< {
      __typename: "InviteLink",
      createdAt?: string | null,
      email?: string | null,
      id: string,
      isUsed?: boolean | null,
      token: string,
      updatedAt: string,
      usedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRegistrationConfigsQueryVariables = {
  filter?: ModelRegistrationConfigFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListRegistrationConfigsQuery = {
  listRegistrationConfigs?:  {
    __typename: "ModelRegistrationConfigConnection",
    items:  Array< {
      __typename: "RegistrationConfig",
      autoCloseEnabled?: boolean | null,
      closureMessage?: string | null,
      contactPhone?: string | null,
      createdAt: string,
      eventAddress?: string | null,
      finalConfirmationDeadline?: string | null,
      finalConfirmationEnabled?: boolean | null,
      id: string,
      inviteOnlyMode?: boolean | null,
      isRegistrationOpen?: boolean | null,
      locationName?: string | null,
      replyToEmail?: string | null,
      scheduledCloseDate?: string | null,
      textingNumber?: string | null,
      updatedAt?: string | null,
      updatedBy?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRegistrationsQueryVariables = {
  filter?: ModelRegistrationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRegistrationsQuery = {
  listRegistrations?:  {
    __typename: "ModelRegistrationConnection",
    items:  Array< {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListTimeSlotConfigsQueryVariables = {
  filter?: ModelTimeSlotConfigFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTimeSlotConfigsQuery = {
  listTimeSlotConfigs?:  {
    __typename: "ModelTimeSlotConfigConnection",
    items:  Array< {
      __typename: "TimeSlotConfig",
      createdAt: string,
      currentRegistrations?: number | null,
      id: string,
      isActive?: boolean | null,
      maxCapacity: number,
      timeSlot: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateChildMutationVariables = {
  condition?: ModelChildConditionInput | null,
  input: CreateChildInput,
};

export type CreateChildMutation = {
  createChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type CreateInviteLinkMutationVariables = {
  condition?: ModelInviteLinkConditionInput | null,
  input: CreateInviteLinkInput,
};

export type CreateInviteLinkMutation = {
  createInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type CreateRegistrationMutationVariables = {
  condition?: ModelRegistrationConditionInput | null,
  input: CreateRegistrationInput,
};

export type CreateRegistrationMutation = {
  createRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type CreateRegistrationConfigMutationVariables = {
  condition?: ModelRegistrationConfigConditionInput | null,
  input: CreateRegistrationConfigInput,
};

export type CreateRegistrationConfigMutation = {
  createRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type CreateTimeSlotConfigMutationVariables = {
  condition?: ModelTimeSlotConfigConditionInput | null,
  input: CreateTimeSlotConfigInput,
};

export type CreateTimeSlotConfigMutation = {
  createTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type DeleteChildMutationVariables = {
  condition?: ModelChildConditionInput | null,
  input: DeleteChildInput,
};

export type DeleteChildMutation = {
  deleteChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type DeleteInviteLinkMutationVariables = {
  condition?: ModelInviteLinkConditionInput | null,
  input: DeleteInviteLinkInput,
};

export type DeleteInviteLinkMutation = {
  deleteInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type DeleteRegistrationMutationVariables = {
  condition?: ModelRegistrationConditionInput | null,
  input: DeleteRegistrationInput,
};

export type DeleteRegistrationMutation = {
  deleteRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type DeleteRegistrationConfigMutationVariables = {
  condition?: ModelRegistrationConfigConditionInput | null,
  input: DeleteRegistrationConfigInput,
};

export type DeleteRegistrationConfigMutation = {
  deleteRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type DeleteTimeSlotConfigMutationVariables = {
  condition?: ModelTimeSlotConfigConditionInput | null,
  input: DeleteTimeSlotConfigInput,
};

export type DeleteTimeSlotConfigMutation = {
  deleteTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type SendCancellationEmailMutationVariables = {
  registration?: SendCancellationEmailRegistrationInput | null,
  registrationId?: string | null,
};

export type SendCancellationEmailMutation = {
  sendCancellationEmail?:  {
    __typename: "SendCancellationEmailReturnType",
    message?: string | null,
    messageId?: string | null,
    success: boolean,
  } | null,
};

export type SendConfirmationEmailMutationVariables = {
  registration?: SendConfirmationEmailRegistrationInput | null,
};

export type SendConfirmationEmailMutation = {
  sendConfirmationEmail?:  {
    __typename: "SendConfirmationEmailReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type SendCustomEmailMutationVariables = {
  message: string,
  messageId: string,
  registration?: SendCustomEmailRegistrationInput | null,
  subject: string,
};

export type SendCustomEmailMutation = {
  sendCustomEmail?:  {
    __typename: "SendCustomEmailReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type SendCustomSmsMutationVariables = {
  message: string,
  messageId: string,
  registration?: SendCustomSmsRegistrationInput | null,
};

export type SendCustomSmsMutation = {
  sendCustomSms?:  {
    __typename: "SendCustomSmsReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type SendFinalConfirmationEmailMutationVariables = {
  registration?: SendFinalConfirmationEmailRegistrationInput | null,
  registrationId?: string | null,
};

export type SendFinalConfirmationEmailMutation = {
  sendFinalConfirmationEmail?:  {
    __typename: "SendFinalConfirmationEmailReturnType",
    message?: string | null,
    messageId?: string | null,
    success: boolean,
  } | null,
};

export type SendFinalConfirmationSmsMutationVariables = {
  registration?: SendFinalConfirmationSmsRegistrationInput | null,
  registrationId?: string | null,
};

export type SendFinalConfirmationSmsMutation = {
  sendFinalConfirmationSms?:  {
    __typename: "SendFinalConfirmationSmsReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type SendInviteEmailMutationVariables = {
  invite?: SendInviteEmailInviteInput | null,
  inviteId?: string | null,
};

export type SendInviteEmailMutation = {
  sendInviteEmail?:  {
    __typename: "SendInviteEmailReturnType",
    message?: string | null,
    messageId?: string | null,
    success: boolean,
  } | null,
};

export type SendSmsConfirmationMutationVariables = {
  registration?: SendSmsConfirmationRegistrationInput | null,
};

export type SendSmsConfirmationMutation = {
  sendSmsConfirmation?:  {
    __typename: "SendSmsConfirmationReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type UpdateChildMutationVariables = {
  condition?: ModelChildConditionInput | null,
  input: UpdateChildInput,
};

export type UpdateChildMutation = {
  updateChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type UpdateInviteLinkMutationVariables = {
  condition?: ModelInviteLinkConditionInput | null,
  input: UpdateInviteLinkInput,
};

export type UpdateInviteLinkMutation = {
  updateInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type UpdateRegistrationMutationVariables = {
  condition?: ModelRegistrationConditionInput | null,
  input: UpdateRegistrationInput,
};

export type UpdateRegistrationMutation = {
  updateRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type UpdateRegistrationConfigMutationVariables = {
  condition?: ModelRegistrationConfigConditionInput | null,
  input: UpdateRegistrationConfigInput,
};

export type UpdateRegistrationConfigMutation = {
  updateRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type UpdateTimeSlotConfigMutationVariables = {
  condition?: ModelTimeSlotConfigConditionInput | null,
  input: UpdateTimeSlotConfigInput,
};

export type UpdateTimeSlotConfigMutation = {
  updateTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChildSubscriptionVariables = {
  filter?: ModelSubscriptionChildFilterInput | null,
};

export type OnCreateChildSubscription = {
  onCreateChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInviteLinkSubscriptionVariables = {
  filter?: ModelSubscriptionInviteLinkFilterInput | null,
};

export type OnCreateInviteLinkSubscription = {
  onCreateInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type OnCreateRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnCreateRegistrationSubscription = {
  onCreateRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type OnCreateRegistrationConfigSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationConfigFilterInput | null,
};

export type OnCreateRegistrationConfigSubscription = {
  onCreateRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type OnCreateTimeSlotConfigSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotConfigFilterInput | null,
};

export type OnCreateTimeSlotConfigSubscription = {
  onCreateTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChildSubscriptionVariables = {
  filter?: ModelSubscriptionChildFilterInput | null,
};

export type OnDeleteChildSubscription = {
  onDeleteChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInviteLinkSubscriptionVariables = {
  filter?: ModelSubscriptionInviteLinkFilterInput | null,
};

export type OnDeleteInviteLinkSubscription = {
  onDeleteInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type OnDeleteRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnDeleteRegistrationSubscription = {
  onDeleteRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type OnDeleteRegistrationConfigSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationConfigFilterInput | null,
};

export type OnDeleteRegistrationConfigSubscription = {
  onDeleteRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type OnDeleteTimeSlotConfigSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotConfigFilterInput | null,
};

export type OnDeleteTimeSlotConfigSubscription = {
  onDeleteTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChildSubscriptionVariables = {
  filter?: ModelSubscriptionChildFilterInput | null,
};

export type OnUpdateChildSubscription = {
  onUpdateChild?:  {
    __typename: "Child",
    age: string,
    createdAt: string,
    gender?: ChildGender | null,
    id: string,
    registration?:  {
      __typename: "Registration",
      attendanceConfirmed?: boolean | null,
      attendanceConfirmedAt?: string | null,
      cancelledAt?: string | null,
      city: string,
      confirmationToken?: string | null,
      createdAt: string,
      email: string,
      finalConfirmationSentAt?: string | null,
      finalConfirmationToken?: string | null,
      finalConfirmedAt?: string | null,
      firstName: string,
      id: string,
      inviteToken?: string | null,
      inviteUsed?: boolean | null,
      isCancelled?: boolean | null,
      isConfirmed?: boolean | null,
      lastName: string,
      needsChildcare?: boolean | null,
      numberOfKids: number,
      phone: string,
      referredBy?: string | null,
      registrationDate?: string | null,
      registrationStatus?: RegistrationRegistrationStatus | null,
      state: string,
      streetAddress: string,
      timeSlot: string,
      updatedAt: string,
      zipCode: string,
    } | null,
    registrationId: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInviteLinkSubscriptionVariables = {
  filter?: ModelSubscriptionInviteLinkFilterInput | null,
};

export type OnUpdateInviteLinkSubscription = {
  onUpdateInviteLink?:  {
    __typename: "InviteLink",
    createdAt?: string | null,
    email?: string | null,
    id: string,
    isUsed?: boolean | null,
    token: string,
    updatedAt: string,
    usedAt?: string | null,
  } | null,
};

export type OnUpdateRegistrationSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationFilterInput | null,
};

export type OnUpdateRegistrationSubscription = {
  onUpdateRegistration?:  {
    __typename: "Registration",
    attendanceConfirmed?: boolean | null,
    attendanceConfirmedAt?: string | null,
    cancelledAt?: string | null,
    children?:  {
      __typename: "ModelChildConnection",
      nextToken?: string | null,
    } | null,
    city: string,
    confirmationToken?: string | null,
    createdAt: string,
    email: string,
    finalConfirmationSentAt?: string | null,
    finalConfirmationToken?: string | null,
    finalConfirmedAt?: string | null,
    firstName: string,
    id: string,
    inviteToken?: string | null,
    inviteUsed?: boolean | null,
    isCancelled?: boolean | null,
    isConfirmed?: boolean | null,
    lastName: string,
    needsChildcare?: boolean | null,
    numberOfKids: number,
    phone: string,
    referredBy?: string | null,
    registrationDate?: string | null,
    registrationStatus?: RegistrationRegistrationStatus | null,
    state: string,
    streetAddress: string,
    timeSlot: string,
    updatedAt: string,
    zipCode: string,
  } | null,
};

export type OnUpdateRegistrationConfigSubscriptionVariables = {
  filter?: ModelSubscriptionRegistrationConfigFilterInput | null,
};

export type OnUpdateRegistrationConfigSubscription = {
  onUpdateRegistrationConfig?:  {
    __typename: "RegistrationConfig",
    autoCloseEnabled?: boolean | null,
    closureMessage?: string | null,
    contactPhone?: string | null,
    createdAt: string,
    eventAddress?: string | null,
    finalConfirmationDeadline?: string | null,
    finalConfirmationEnabled?: boolean | null,
    id: string,
    inviteOnlyMode?: boolean | null,
    isRegistrationOpen?: boolean | null,
    locationName?: string | null,
    replyToEmail?: string | null,
    scheduledCloseDate?: string | null,
    textingNumber?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type OnUpdateTimeSlotConfigSubscriptionVariables = {
  filter?: ModelSubscriptionTimeSlotConfigFilterInput | null,
};

export type OnUpdateTimeSlotConfigSubscription = {
  onUpdateTimeSlotConfig?:  {
    __typename: "TimeSlotConfig",
    createdAt: string,
    currentRegistrations?: number | null,
    id: string,
    isActive?: boolean | null,
    maxCapacity: number,
    timeSlot: string,
    updatedAt: string,
  } | null,
};
