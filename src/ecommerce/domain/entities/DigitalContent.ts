import { Product } from './Product';

export interface DigitalContent {
  id: number;
  product: Product;
  title: string;
  description: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  requiresSubscription: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DigitalContentAccess {
  hasAccess: boolean;
  reason?: string; // 'purchased' | 'subscription' | 'denied'
  downloadUrl?: string;
}
