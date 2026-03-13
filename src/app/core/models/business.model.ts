export interface BusinessAccount {
  Id: string;
  Name: string;
  PhoneNumberId: string;
  WhatsAppNumber: string;
  MaintenanceMessageEnabled: boolean;
  isActive: boolean;
}

export interface ClientCallbackConfig {
  CallbackMessageUri: string;
  CallbackStatusUri: string;
}

export interface BusinessProfile extends BusinessAccount {
  WabaAccountMetaData: string;
  MaintenanceMessageBody: string;
  MaintenanceMessageButtonText: string;
  MaintenanceMessageButtonUrl: string;
  MaintenanceMessageHeaderUrl: string;
  ClientCallbackConfig: ClientCallbackConfig[];
  ApiAddress?: string;
  ClientSecret?: string;
  ReplyCallbackEnabled?: boolean;
}
