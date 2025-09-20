import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";
import { initSchema } from "@aws-amplify/datastore";

import { schema } from "./schema";

export enum ChildGender {
  BOY = "boy",
  GIRL = "girl"
}

type EagerRegistrationModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Registration, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly streetAddress: string;
  readonly zipCode: string;
  readonly city: string;
  readonly state: string;
  readonly numberOfKids: number;
  readonly children?: (ChildModel | null)[] | null;
  readonly timeSlot: string;
  readonly needsChildcare?: boolean | null;
  readonly referredBy?: string | null;
  readonly inviteToken?: string | null;
  readonly inviteUsed?: boolean | null;
  readonly isConfirmed?: boolean | null;
  readonly registrationDate?: string | null;
  readonly attendanceConfirmed?: boolean | null;
  readonly attendanceConfirmedAt?: string | null;
  readonly isCancelled?: boolean | null;
  readonly cancelledAt?: string | null;
  readonly confirmationToken?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRegistrationModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Registration, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly streetAddress: string;
  readonly zipCode: string;
  readonly city: string;
  readonly state: string;
  readonly numberOfKids: number;
  readonly children: AsyncCollection<ChildModel>;
  readonly timeSlot: string;
  readonly needsChildcare?: boolean | null;
  readonly referredBy?: string | null;
  readonly inviteToken?: string | null;
  readonly inviteUsed?: boolean | null;
  readonly isConfirmed?: boolean | null;
  readonly registrationDate?: string | null;
  readonly attendanceConfirmed?: boolean | null;
  readonly attendanceConfirmedAt?: string | null;
  readonly isCancelled?: boolean | null;
  readonly cancelledAt?: string | null;
  readonly confirmationToken?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RegistrationModel = LazyLoading extends LazyLoadingDisabled ? EagerRegistrationModel : LazyRegistrationModel

export declare const RegistrationModel: (new (init: ModelInit<RegistrationModel>) => RegistrationModel) & {
  copyOf(source: RegistrationModel, mutator: (draft: MutableModel<RegistrationModel>) => MutableModel<RegistrationModel> | void): RegistrationModel;
}

type EagerChildModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Child, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly registrationId: string;
  readonly age: string;
  readonly gender?: ChildGender | keyof typeof ChildGender | null;
  readonly registration?: RegistrationModel | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChildModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Child, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly registrationId: string;
  readonly age: string;
  readonly gender?: ChildGender | keyof typeof ChildGender | null;
  readonly registration: AsyncItem<RegistrationModel | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChildModel = LazyLoading extends LazyLoadingDisabled ? EagerChildModel : LazyChildModel

export declare const ChildModel: (new (init: ModelInit<ChildModel>) => ChildModel) & {
  copyOf(source: ChildModel, mutator: (draft: MutableModel<ChildModel>) => MutableModel<ChildModel> | void): ChildModel;
}

type EagerTimeSlotConfigModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeSlotConfig, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeSlot: string;
  readonly maxCapacity: number;
  readonly currentRegistrations?: number | null;
  readonly isActive?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeSlotConfigModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeSlotConfig, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeSlot: string;
  readonly maxCapacity: number;
  readonly currentRegistrations?: number | null;
  readonly isActive?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeSlotConfigModel = LazyLoading extends LazyLoadingDisabled ? EagerTimeSlotConfigModel : LazyTimeSlotConfigModel

export declare const TimeSlotConfigModel: (new (init: ModelInit<TimeSlotConfigModel>) => TimeSlotConfigModel) & {
  copyOf(source: TimeSlotConfigModel, mutator: (draft: MutableModel<TimeSlotConfigModel>) => MutableModel<TimeSlotConfigModel> | void): TimeSlotConfigModel;
}

type EagerInviteLinkModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InviteLink, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly email?: string | null;
  readonly isUsed?: boolean | null;
  readonly createdAt?: string | null;
  readonly usedAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInviteLinkModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InviteLink, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly email?: string | null;
  readonly isUsed?: boolean | null;
  readonly createdAt?: string | null;
  readonly usedAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InviteLinkModel = LazyLoading extends LazyLoadingDisabled ? EagerInviteLinkModel : LazyInviteLinkModel

export declare const InviteLinkModel: (new (init: ModelInit<InviteLinkModel>) => InviteLinkModel) & {
  copyOf(source: InviteLinkModel, mutator: (draft: MutableModel<InviteLinkModel>) => MutableModel<InviteLinkModel> | void): InviteLinkModel;
}

type EagerRegistrationConfigModel = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<RegistrationConfig, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly isRegistrationOpen?: boolean | null;
  readonly inviteOnlyMode?: boolean | null;
  readonly scheduledCloseDate?: string | null;
  readonly autoCloseEnabled?: boolean | null;
  readonly closureMessage?: string | null;
  readonly replyToEmail?: string | null;
  readonly contactPhone?: string | null;
  readonly locationName?: string | null;
  readonly eventAddress?: string | null;
  readonly updatedBy?: string | null;
  readonly updatedAt?: string | null;
  readonly createdAt?: string | null;
}

type LazyRegistrationConfigModel = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<RegistrationConfig, 'id'>;
    readOnlyFields: 'createdAt';
  };
  readonly id: string;
  readonly isRegistrationOpen?: boolean | null;
  readonly inviteOnlyMode?: boolean | null;
  readonly scheduledCloseDate?: string | null;
  readonly autoCloseEnabled?: boolean | null;
  readonly closureMessage?: string | null;
  readonly replyToEmail?: string | null;
  readonly contactPhone?: string | null;
  readonly locationName?: string | null;
  readonly eventAddress?: string | null;
  readonly updatedBy?: string | null;
  readonly updatedAt?: string | null;
  readonly createdAt?: string | null;
}

export declare type RegistrationConfigModel = LazyLoading extends LazyLoadingDisabled ? EagerRegistrationConfigModel : LazyRegistrationConfigModel

export declare const RegistrationConfigModel: (new (init: ModelInit<RegistrationConfigModel>) => RegistrationConfigModel) & {
  copyOf(source: RegistrationConfigModel, mutator: (draft: MutableModel<RegistrationConfigModel>) => MutableModel<RegistrationConfigModel> | void): RegistrationConfigModel;
}

type EagerSendSmsConfirmationReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
}

type LazySendSmsConfirmationReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
}

export declare type SendSmsConfirmationReturnTypeModel = LazyLoading extends LazyLoadingDisabled ? EagerSendSmsConfirmationReturnTypeModel : LazySendSmsConfirmationReturnTypeModel

export declare const SendSmsConfirmationReturnTypeModel: (new (init: ModelInit<SendSmsConfirmationReturnTypeModel>) => SendSmsConfirmationReturnTypeModel)

type EagerSendConfirmationEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
}

type LazySendConfirmationEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
}

export declare type SendConfirmationEmailReturnTypeModel = LazyLoading extends LazyLoadingDisabled ? EagerSendConfirmationEmailReturnTypeModel : LazySendConfirmationEmailReturnTypeModel

export declare const SendConfirmationEmailReturnTypeModel: (new (init: ModelInit<SendConfirmationEmailReturnTypeModel>) => SendConfirmationEmailReturnTypeModel)

type EagerSendInviteEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
  readonly messageId?: string | null;
}

type LazySendInviteEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
  readonly messageId?: string | null;
}

export declare type SendInviteEmailReturnTypeModel = LazyLoading extends LazyLoadingDisabled ? EagerSendInviteEmailReturnTypeModel : LazySendInviteEmailReturnTypeModel

export declare const SendInviteEmailReturnTypeModel: (new (init: ModelInit<SendInviteEmailReturnTypeModel>) => SendInviteEmailReturnTypeModel)

type EagerSendCancellationEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
  readonly messageId?: string | null;
}

type LazySendCancellationEmailReturnTypeModel = {
  readonly success: boolean;
  readonly message?: string | null;
  readonly messageId?: string | null;
}

export declare type SendCancellationEmailReturnTypeModel = LazyLoading extends LazyLoadingDisabled ? EagerSendCancellationEmailReturnTypeModel : LazySendCancellationEmailReturnTypeModel

export declare const SendCancellationEmailReturnTypeModel: (new (init: ModelInit<SendCancellationEmailReturnTypeModel>) => SendCancellationEmailReturnTypeModel)

const { Registration, Child, TimeSlotConfig, InviteLink, RegistrationConfig, SendSmsConfirmationReturnType, SendConfirmationEmailReturnType, SendInviteEmailReturnType, SendCancellationEmailReturnType } = initSchema(schema) as {
  Registration: PersistentModelConstructor<RegistrationModel>;
  Child: PersistentModelConstructor<ChildModel>;
  TimeSlotConfig: PersistentModelConstructor<TimeSlotConfigModel>;
  InviteLink: PersistentModelConstructor<InviteLinkModel>;
  RegistrationConfig: PersistentModelConstructor<RegistrationConfigModel>;
  SendSmsConfirmationReturnType: PersistentModelConstructor<SendSmsConfirmationReturnTypeModel>;
  SendConfirmationEmailReturnType: PersistentModelConstructor<SendConfirmationEmailReturnTypeModel>;
  SendInviteEmailReturnType: PersistentModelConstructor<SendInviteEmailReturnTypeModel>;
  SendCancellationEmailReturnType: PersistentModelConstructor<SendCancellationEmailReturnTypeModel>;
};

export {
  Registration,
  Child,
  TimeSlotConfig,
  InviteLink,
  RegistrationConfig
};