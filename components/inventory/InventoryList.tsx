import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import Button from '../common/Button';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface InventoryListProps {
  inventory: InventoryItem[];
  onDeleteItem: (id: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onDeleteItem }) => {
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);

  const handleOpenDeleteConfirm = (item: InventoryItem) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDeleteItem(itemToDelete.id);
      setItemToDelete(null); // Close dialog
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null); // Close dialog
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Daftar Inventaris</h2>
      {inventory.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada barang dalam inventaris.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Barang
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleOpenDeleteConfirm(item)}
                    aria-label={`Hapus ${item.name}`}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmationDialog
        isOpen={!!itemToDelete}
        title="Konfirmasi Penghapusan"
        message={`Apakah Anda yakin ingin menghapus barang "${itemToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default InventoryList;
