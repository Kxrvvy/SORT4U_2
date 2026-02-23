import React, { useState, useEffect } from 'react';
import Navbar from '../../feature/navbar';
import EditBudgetModal from "../../feature/bt-uploader/edit-budget";
import AddTransactionModal from "../../feature/bt-uploader/add-transaction";
import ExpenseChart from "../../feature/bt-uploader/expense-chart";
import MonthlyReportModal from "../../feature/bt-uploader/monthly-report";

export default function BudgetTracker() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  
  const [summary, setSummary] = useState({ budget: 0, income: 0, expense: 0, savings: 0 });
  const [transactions, setTransactions] = useState([]);

  const handleConfirmBudget = (newAmount) => {
    const amount = parseFloat(newAmount) || 0;
    setSummary(prev => ({
      ...prev,
      budget: amount,
      savings: (amount + prev.income) - prev.expense
    }));
    setIsEditOpen(false);
  };

  const handleAddTx = (updatedSummary, newTx) => {
    setSummary(updatedSummary);
    const txWithId = { ...newTx, id: Date.now() }; 
    setTransactions(prev => [txWithId, ...prev]);
    setIsAddTxOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] font-sans text-gray-800">
      <Navbar />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-black">Budget Tracker</h1>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Summary Cards */}
            <section className="bg-gray-400 p-6 rounded-3xl shadow-md">
              <div className="flex justify-between items-center mb-4 text-white">
                <h2 className="text-xl font-semibold">My Budget</h2>
                <button onClick={() => setIsEditOpen(true)} className="bg-white/20 hover:bg-white/40 px-4 py-1.5 rounded-full text-sm font-medium transition-colors">+ Edit Budget</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard label="Total Budget" value={summary.budget} />
                <SummaryCard label="Income" value={summary.income} />
                <SummaryCard label="Expense" value={summary.expense} />
                <SummaryCard label="Total Savings" value={summary.savings} />
              </div>
            </section>

            {/* Transaction List */}
            <section className="bg-gray-400 p-6 rounded-3xl shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-white gap-4">
                <h2 className="text-xl font-semibold">Transaction</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button onClick={() => setIsReportOpen(true)} className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs font-medium transition-colors">Monthly Report</button>
                  <button onClick={() => setIsAddTxOpen(true)} className="flex-1 sm:flex-none bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs font-medium transition-all">+ Add Transaction</button>
                </div>
              </div>
                 
              <div className="space-y-3 h-45 overflow-y-auto pr-2 scrollbar-hide">
                {transactions.length > 0 ? transactions.map((t, i) => (
                  <div key={t.id || i} className="flex justify-between text-white border-b border-white/10 pb-2 mr-1">
                    <div>
                        <p className="text-sm font-bold">{t.name}</p>
                        <p className="text-[10px] opacity-60 uppercase">{t.type}</p>
                    </div>
                    <span className={`font-bold ${t.type === 'income' ? 'text-green-300' : 'text-white'}`}>
                        {t.type === 'income' ? '+' : '-'}₱{Number(t.amount).toLocaleString()}
                    </span>
                  </div>
                )) : (
                  <p className="text-center text-white/20 italic py-10">No transactions yet</p>
                )}
              </div>
            </section>
            
            {/* Visual Chart Placeholder */}
            <section className="bg-gray-400 p-6 rounded-3xl shadow-md h-48">
              <h2 className="text-xl font-semibold text-white mb-4">Spending Over Time</h2>
              <div className="w-full h-24 flex items-end">
                <svg viewBox="0 0 500 100" preserveAspectRatio="none" className="w-full h-full stroke-white fill-none stroke-[2] opacity-80">
                   <path d="M 0 80 L 100 20 L 200 50 L 300 10 L 400 70 L 500 30" />
                </svg>
              </div>
            </section>
          </div>

          {/* Sidebar Chart */}
          <div className="lg:col-span-1">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>

        <EditBudgetModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onConfirm={handleConfirmBudget} />
        <MonthlyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} summary={summary} />
        <AddTransactionModal isOpen={isAddTxOpen} onClose={() => setIsAddTxOpen(false)} onConfirm={handleAddTx} currentSummary={summary} />
      </main>
    </div>
  );
}

function SummaryCard({ label, value = 0 }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <p className="text-[10px] font-bold text-gray-400 uppercase truncate">{label}</p>
      <p className="text-lg md:text-xl font-black mt-1 text-gray-800 truncate">₱{(Number(value) || 0).toLocaleString()}</p>
    </div>
  );
}