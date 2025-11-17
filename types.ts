export enum ItemCategory {
  PAPER = 'Kertas',
  PEN = 'Alat Tulis',
  BINDER = 'Penyimpanan Arsip',
  CLEANING = 'Peralatan Kebersihan',
  PRINTER = 'Perlengkapan Printer',
  OTHER = 'Lain-lain',
}

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  stock: number; // Current quantity in stock
}

export enum TransactionType {
  IN = 'Masuk',
  OUT = 'Keluar',
}

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  itemCategory: ItemCategory;
  type: TransactionType;
  quantity: number;
  date: string; // ISO date string (e.g., 'YYYY-MM-DD')
  timestamp: number; // Unix timestamp for sorting
}

export interface ReportTransaction {
  ID_Transaksi: string;
  Tanggal: string;
  Jenis_Transaksi: TransactionType;
  Nama_Barang: string;
  Kategori_Barang: ItemCategory;
  Jumlah: number;
}
