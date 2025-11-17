import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { InventoryItem, Transaction, TransactionType } from '../../types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import CustomDatePicker from '../common/DatePicker';

interface TransactionFormProps {
  inventory: InventoryItem[];
  onAddTransaction: (transaction: Transaction) => void;
  onUpdateInventory: (itemId: string, newStock: number) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  inventory,
  onAddTransaction,
  onUpdateInventory,
}) => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.IN);
  const [quantity, setQuantity] = useState<number>(0);
  const [transactionDate, setTransactionDate] = useState<Date | null>(new Date());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const availableItems = inventory.map((item) => ({
    value: item.id,
    label: `${item.name} (${item.stock} di stok)`,
  }));

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedItemId) newErrors.selectedItemId = 'Pilih barang.';
    if (quantity <= 0) newErrors.quantity = 'Jumlah harus lebih dari 0.';
    if (!transactionDate) newErrors.transactionDate = 'Pilih tanggal transaksi.';

    const selectedItem = inventory.find((item) => item.id === selectedItemId);
    if (type === TransactionType.OUT && selectedItem && quantity > selectedItem.stock) {
      newErrors.quantity = `Jumlah keluar tidak boleh melebihi stok yang ada (${selectedItem.stock}).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const selectedItem = inventory.find((item) => item.id === selectedItemId);
    if (!selectedItem) return;

    let newStock = selectedItem.stock;
    if (type === TransactionType.IN) {
      newStock += quantity;
    } else {
      newStock -= quantity;
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      itemCategory: selectedItem.category,
      type,
      quantity,
      date: transactionDate!.toISOString().split('T')[0],
      timestamp: transactionDate!.getTime(),
    };

    onAddTransaction(newTransaction);
    onUpdateInventory(selectedItem.id, newStock);

    // Reset form
    setSelectedItemId('');
    setQuantity(0);
    setTransactionDate(new Date());
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Catat Transaksi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          id="selectItem"
          label="Pilih Barang"
          options={availableItems}
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          placeholder="-- Pilih Barang --"
          error={errors.selectedItemId}
          disabled={inventory.length === 0}
        />
        <Select
          id="transactionType"
          label="Jenis Transaksi"
          options={[
            { value: TransactionType.IN, label: 'Barang Masuk' },
            { value: TransactionType.OUT, label: 'Barang Keluar' },
          ]}
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          error={errors.type}
        />
        <Input
          id="quantity"
          label="Jumlah"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          placeholder="Masukkan jumlah"
          min="0"
          error={errors.quantity}
        />
        <CustomDatePicker
          id="transactionDate"
          label="Tanggal Transaksi"
          selectedDate={transactionDate}
          onChange={(date) => setTransactionDate(date)}
          placeholderText="Pilih tanggal"
          error={errors.transactionDate}
        />
      </div>
      <Button type="submit" className="w-full mt-4" disabled={inventory.length === 0}>
        Catat Transaksi
      </Button>
      {inventory.length === 0 && (
        <p className="mt-2 text-red-600 text-center text-sm">Anda harus menambahkan barang ke inventaris terlebih dahulu.</p>
      )}
    </form>
  );
};

export default TransactionForm;
