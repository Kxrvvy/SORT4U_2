import React, { useState, useEffect } from 'react';
import { Plus, Image as ImageIcon, Inbox, CheckCircle, Clock, Loader2, Camera, Trash2, CheckCircle2, SquarePen} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../feature/navbar';
import axios from 'axios';

export default function MemoryLane() {
  const API_BASE = '/memory/';
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editingMemory, setEditingMemory] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    location: '',
    person: '',
    tags: '',
    image: null,
  });

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const sorted = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setMemories(sorted);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchMemories();
  }, [navigate]);

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_BASE}/${id}/complete`,
        { is_completed: !currentStatus },
        getAuthHeader()
      );
      setMemories(prev => prev.map(m => (m.id === id ? response.data : m)));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteMemory = async (id) => {
    if (!window.confirm("Delete this memory?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, getAuthHeader());
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

const openEditModal = (memory) => {
    setEditingMemory(memory);
    setEditForm({
      description: memory.description || '',
      location: memory.location || '',
      person: memory.person || '',
      tags: memory.tags || '',
      image: null,
    });
    setImagePreview(memory.image_url || null);
  };

  const [imagePreview, setImagePreview] = useState(null);
  
  const closeEditModal = () => {
    setEditingMemory(null);
  };

const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('description', editForm.description);
      if (editForm.location) formData.append('location', editForm.location);
      if (editForm.person) formData.append('person', editForm.person);
      if (editForm.tags) formData.append('tags', editForm.tags);
      if (editForm.image) formData.append('image', editForm.image); // only if new image selected

      const response = await axios.put(`${API_BASE}/${editingMemory.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMemories(prev => prev.map(m => (m.id === editingMemory.id ? response.data : m)));
      closeEditModal();
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const filteredMemories = memories.filter(m => {
    if (filter === 'pending') return !m.is_completed;
    if (filter === 'done') return m.is_completed;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      <main className="flex-1 ml-64 p-10">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Memory Lane</h1>
          <p className="text-gray-600 text-lg">Photo-triggered reminders for the things you always forget</p>
        </header>

        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-3">
            {['all', 'pending', 'done'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-1.5 rounded-md text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/add-memory')}
            className="flex items-center gap-2 bg-[#D1D5DB] hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-2xl font-bold transition-all shadow-sm active:scale-95"
          >
            <div className="bg-[#4B5563] text-white rounded-full p-0.5">
              <Plus size={16} strokeWidth={4} />
            </div>
            <span className="text-sm">Add Memory</span>
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-8">Your Memory Lane</h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-gray-400" size={40} />
            </div>
          ) : filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="relative border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white group"
                >
                  {/* Image Area */}
                  <div className="h-40 bg-gray-50 flex items-center justify-center border-b">
                    {memory.image_url ? (
                      <img src={memory.image_url} alt="memory" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-300" size={40} />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className={`font-semibold leading-tight ${memory.is_completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {memory.description || "Untitled Memory"}
                    </h3>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400">
                      <Clock size={14} />
                      <span>{memory.created_at ? new Date(memory.created_at).toLocaleDateString() : 'Recently'}</span>
                    </div>
                  </div>

                  {/* Hover Overlay with action buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 rounded-2xl px-6">
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => deleteMemory(memory.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                        <button
                            onClick={() => toggleComplete(memory.id, memory.is_completed)}
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                            <CheckCircle2 size={16} /> {memory.is_completed ? 'Mark Pending' : 'Complete'}
                        </button>
                    </div>
                    <button
                        onClick={() => openEditModal(memory)}
                        className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <SquarePen size={16} /> Edit Memory
                    </button>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
              <Inbox size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium text-lg">No {filter} memories found.</p>
              <p className="text-gray-400 text-sm">Tap the + button to add your first check-in!</p>
            </div>
          )}
        </section>
      </main>

      {/* Edit Modal */}
      {editingMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">

            {/* Camera Icon */}
            <div className="flex justify-center -mx-8 -mt-8 mb-6">
              <label className="cursor-pointer w-full">
               {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-45 object-cover rounded-t-xl border-2 border-gray-200 hover:opacity-80 transition-opacity"
                    />
                ) : (
                  <div className="flex justify-center py-6">
                    <div className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-full p-4">
                        <Camera size={32} className="text-gray-600" />
                    </div>
                    </div>
                )}
                  <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                              setEditForm(prev => ({ ...prev, image: file }));
                              setImagePreview(URL.createObjectURL(file));
                          }
                      }}
                  />
              </label>
          </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="What do you want to remember?"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Where is this? (Optional)"
                value={editForm.location}
                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Who is this about? (Optional)"
                value={editForm.person}
                onChange={(e) => setEditForm(prev => ({ ...prev, person: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Tags (Optional)"
                value={editForm.tags}
                onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeEditModal}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                Save Memory Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
