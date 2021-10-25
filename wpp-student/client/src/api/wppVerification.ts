import { Position } from 'vscode-languageclient';

export interface WppVerificationItem {
  position: Position;
  verificationStatus: boolean;
}