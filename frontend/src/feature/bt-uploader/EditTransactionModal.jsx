import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function EditTransactionModal({ isOpen, transaction, categories = [], onClose, onEdit, onDelete }) {
  const [type, setType] = useState('expense');
  const [formData, setFormData] = useState({ description: '', amount: '', category: '', transaction_date: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Pre-fill form when transaction changes
  useEffect(() => {
    if (transaction) {
      setType(transaction.type || 'expense');
      setFormData({
        description: transaction.description || '',
        amount: transaction.amount || '',
        category: transaction.category_id || transaction.category?.id || '',
        transaction_date: transaction.transaction_date || '',
      });
      setShowDeleteConfirm(false);
    }
  }, [transaction]);

  if (!isOpen || !transaction) return null;

  const currentCategories = categories.filter(cat => cat.type === type);

  const handleSave = () => {
    if (!formData.description.trim()) {
      alert('Please enter a description.');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!formData.category) {
      alert('Please select a category.');
      return;
    }

    onEdit(transaction.id, {
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      type,
      category_id: parseInt(formData.category),
      transaction_date: formData.transaction_date || undefined,
    });
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleDeleteConfirm = () => {
    onDelete(transaction.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[450px] max-h-full overflow-y-auto rounded-[30px] bg-[#cbcbcb] p-6 md:p-10 shadow-2xl font-sans">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Edit Transaction</h2>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mb-6 bg-red-100 border border-red-300 rounded-2xl p-4">
            <p className="text-sm font-semibold text-red-700 mb-3">Delete this transaction?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}

        {/* Type Toggle */}
        <div className="flex bg-[#d9d9d9] rounded-xl p-1 mb-8">
          <button
            onClick={() => { setType('expense'); setFormData(p => ({ ...p, category: '' })); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm md:text-base ${
              type === 'expense' ? 'bg-[#a3a3a3] text-gray-800' : 'text-gray-500'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => { setType('income'); setFormData(p => ({ ...p, category: '' })); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm md:text-base ${
              type === 'income' ? 'bg-[#a3a3a3] text-gray-800' : 'text-gray-500'
            }`}
          >
            Income
          </button>
        </div>

        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full bg-[#d9d9d9] p-3 rounded-xl outline-none text-gray-700 text-sm md:text-base"
              placeholder="e.g., Coffee at Starbucks"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full bg-[#d9d9d9] p-3 rounded-xl outline-none text-gray-700 text-sm md:text-base"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full bg-[#d9d9d9] p-3 rounded-xl outline-none text-gray-700 font-medium text-sm md:text-base"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {currentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">
              Date (Optional)
            </label>
            <input
              type="date"
              className="w-full bg-[#d9d9d9] p-3 rounded-xl outline-none text-gray-700 text-xs"
              value={formData.transaction_date}
              onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10">
          <button
            onClick={handleClose}
            className="order-2 sm:order-1 flex-1 py-2.5 bg-[#d9d9d9] text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-colors text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="order-1 sm:order-2 flex-1 py-2.5 bg-gray-800 text-white rounded-xl font-bold shadow-md hover:bg-gray-700 transition-colors text-sm md:text-base"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
