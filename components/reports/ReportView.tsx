import React, { useState, useMemo } from 'react';
import { Transaction, ItemCategory, ReportTransaction } from '../../types';
import { ITEM_CATEGORIES } from '../../constants';
import { exportToExcel } from '../../services/excelService';
import Select from '../common/Select';
import CustomDatePicker from '../common/DatePicker';
import Button from '../common/Button';

interface ReportViewProps {
  transactions: Transaction[];
}

const ReportView: React.FC<ReportViewProps> = ({ transactions }) => {
  const [filterCategory, setFilterCategory] = useState<ItemCategory | ''>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      let matchesCategory = true;
      let matchesDate = true;

      if (filterCategory && transaction.itemCategory !== filterCategory) {
        matchesCategory = false;
      }

      if (startDate && transactionDate < new Date(startDate.setHours(0, 0, 0, 0))) {
        matchesDate = false;
      }
      if (endDate && transactionDate > new Date(endDate.setHours(23, 59, 59, 999))) {
        matchesDate = false;
      }

      return matchesCategory && matchesDate;
    }).sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent first
  }, [transactions, filterCategory, startDate, endDate]);

  const handleExport = () => {
    const dataToExport: ReportTransaction[] = filteredTransactions.map((t) => ({
      ID_Transaksi: t.id,
      Tanggal: new Date(t.date).toLocaleDateString('id-ID'),
      Jenis_Transaksi: t.type,
      Nama_Barang: t.itemName,
      Kategori_Barang: t.itemCategory,
      Jumlah: t.quantity,
    }));

    exportToExcel(dataToExport, 'Laporan_Transaksi_ATK', 'Transaksi');
  };

  const categoryOptions = [
    { value: '', label: 'Semua Kategori' },
    ...ITEM_CATEGORIES,
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Laporan Transaksi</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          id="filterCategory"
          label="Filter Kategori"
          options={categoryOptions}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as ItemCategory | '')}
        />
        <CustomDatePicker
          id="startDate"
          label="Dari Tanggal"
          selectedDate={startDate}
          onChange={setStartDate}
          placeholderText="Pilih tanggal mulai"
        />
        <CustomDatePicker
          id="endDate"
          label="Sampai Tanggal"
          selectedDate={endDate}
          onChange={setEndDate}
          placeholderText="Pilih tanggal akhir"
        />
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={handleExport} disabled={filteredTransactions.length === 0}>
          Ekspor ke Excel
        </Button>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada transaksi yang cocok dengan filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Barang
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Transaksi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.itemName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.itemCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'IN' ? 'Masuk' : 'Keluar'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {transaction.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportView;
