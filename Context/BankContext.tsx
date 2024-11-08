import React, { createContext, useContext, useState } from 'react';

export interface Transaction {
  id: number;
  description: string;
}

interface BankContextType {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number) => void;
  transfer: (amount: number, description: string) => boolean;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const deposit = (amount: number) => {
    setBalance((prev) => prev + amount);
    setTransactions((prev) => [...prev, { id: prev.length, description: `Depósito de L.${amount}` }]);
  };

  const transfer = (amount: number, description: string) => {
    if (amount > balance) {
      return false;
    }
    setBalance((prev) => prev - amount);
    setTransactions((prev) => [...prev, { id: prev.length, description }]);
    return true;
  };

  return (
    <BankContext.Provider value={{ balance, transactions, deposit, transfer }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};