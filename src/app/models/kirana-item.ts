export interface KiranaItem {
  id: string;
  name: string;        // e.g., "Lux Soap"
  category: string;    // e.g., "Bath & Body"
  stockCount: number;  // How many you currently have
  minThreshold: number; // Alert when stock is below this (e.g., 1)
  lastUpdated: Date;
}