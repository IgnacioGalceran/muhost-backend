export interface EnviarEmailCriteria {
  sender: SenderInfo;
  to: RecipientInfo[];
  subject: string;
  htmlContent: string;
}

export interface SenderInfo {
  email: string;
  name?: string;
}

export interface RecipientInfo {
  email: string;
  name?: string;
}
