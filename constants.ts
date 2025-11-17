import { ItemCategory } from './types';

export const ITEM_CATEGORIES: { value: ItemCategory; label: string }[] = [
  { value: ItemCategory.PAPER, label: 'Kertas' },
  { value: ItemCategory.PEN, label: 'Alat Tulis' },
  { value: ItemCategory.BINDER, label: 'Penyimpanan Arsip' },
  { value: ItemCategory.CLEANING, label: 'Peralatan Kebersihan' },
  { value: ItemCategory.PRINTER, label: 'Perlengkapan Printer' },
  { value: ItemCategory.OTHER, label: 'Lain-lain' },
];
