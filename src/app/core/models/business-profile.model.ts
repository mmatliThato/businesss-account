export interface BusinessProfile {
  Id: string;
  Name: string;
  PhoneNumberId: string;
  WhatsAppNumber: string;
  WabaAccountMetaData: string;
  MaintenanceMessageEnabled: boolean;
  MaintenanceMessageBody: string;
  MaintenanceMessageButtonText: string;
  MaintenanceMessageButtonUrl: string;
  MaintenanceMessageHeaderUrl: string;
  ClientCallbackConfig: {
    CallbackMessageUri: string;
    CallbackStatusUri: string;
  }[];
  isActive: boolean;
}