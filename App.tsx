import React, { useState, useEffect, useCallback } from 'react';
import { InventoryItem, Transaction } from './types';
import Header from './components/layout/Header';
import InventoryList from './components/inventory/InventoryList';
import InventoryForm from './components/inventory/InventoryForm';
import TransactionForm from './components/transactions/TransactionForm';
import TransactionTable from './components/transactions/TransactionTable';
import ReportView from './components/reports/ReportView';

const App: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<'inventory' | 'transactions' | 'reports'>('inventory');

  // Load data from localStorage on initial mount
  useEffect(() => {
    const storedInventory = localStorage.getItem('atk_inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
    const storedTransactions = localStorage.getItem('atk_transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('atk_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Save transactions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('atk_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddItem = useCallback((item: InventoryItem) => {
    setInventory((prev) => [...prev, item]);
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    // Also remove any transactions related to this item? Or just keep them for history.
    // For simplicity, we'll keep transactions, but a real app might delete them or mark the item as inactive.
  }, []);

  const handleAddTransaction = useCallback((newTransaction: Transaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  }, []);

  const handleUpdateInventory = useCallback((itemId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, stock: newStock } : item))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 mt-20 md:mt-24">
        {currentPage === 'inventory' && (
          <div className="space-y-8">
            <InventoryForm onAddItem={handleAddItem} />
            <InventoryList inventory={inventory} onDeleteItem={handleDeleteItem} />
          </div>
        )}
        {currentPage === 'transactions' && (
          <div className="space-y-8">
            <TransactionForm
              inventory={inventory}
              onAddTransaction={handleAddTransaction}
              onUpdateInventory={handleUpdateInventory}
            />
            <TransactionTable transactions={transactions} />
          </div>
        )}
        {currentPage === 'reports' && (
          <div>
            <ReportView transactions={transactions} />
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} ATK Stock App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
