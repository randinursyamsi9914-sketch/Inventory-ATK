import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InventoryItem, ItemCategory } from '../../types';
import { ITEM_CATEGORIES } from '../../constants';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

interface InventoryFormProps {
  onAddItem: (item: InventoryItem) => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ITEM_CATEGORIES[0].value);
  const [initialStock, setInitialStock] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Nama barang tidak boleh kosong.';
    if (initialStock < 0) newErrors.initialStock = 'Stok awal tidak boleh negatif.';
    if (initialStock === 0) newErrors.initialStock = 'Stok awal harus lebih dari 0.'; // Assuming new items always start with some stock
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const newItem: InventoryItem = {
      id: uuidv4(),
      name: name.trim(),
      category,
      stock: initialStock,
    };
    onAddItem(newItem);
    setName('');
    setCategory(ITEM_CATEGORIES[0].value);
    setInitialStock(0);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Barang Baru</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          id="itemName"
          label="Nama Barang"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama barang"
          error={errors.name}
        />
        <Select
          id="itemCategory"
          label="Kategori"
          options={ITEM_CATEGORIES}
          value={category}
          onChange={(e) => setCategory(e.target.value as ItemCategory)}
          error={errors.category}
        />
        <Input
          id="initialStock"
          label="Stok Awal"
          type="number"
          value={initialStock}
          onChange={(e) => setInitialStock(parseInt(e.target.value) || 0)}
          placeholder="Masukkan stok awal"
          min="0"
          error={errors.initialStock}
        />
      </div>
      <Button type="submit" className="w-full mt-4">
        Tambah Barang
      </Button>
    </form>
  );
};

export default InventoryForm;
