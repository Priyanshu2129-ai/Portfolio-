'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  Calendar,
  Building,
  Check,
  X,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ArrowUpDown,
  FileCheck2,
  Lock,
  Mail,
  MessageSquare,
  ShieldAlert,
  Inbox,
  CheckCircle,
  Clock,
  Send
} from 'lucide-react';
import { Achievement, AchievementCategory, AchievementInput } from '@/types/achievement';
import { initialAchievements } from '@/data/initial-achievements';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const DESIGNATED_ADMIN_EMAIL = 'prajapatipriyanshu@gmail.com';

const categories: AchievementCategory[] = [
  'Hackathons',
  'Certifications',
  'Awards',
  'Competitions',
  'Academic',
  'Projects',
  'Milestones',
];

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'messages'>('achievements');
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [messages, setMessages] = useState<ContactInquiry[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactInquiry | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State for Achievements
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AchievementInput>({
    title: '',
    category: 'Hackathons',
    description: '',
    date: '',
    organization: '',
    location: '',
    certificate_url: '',
    external_url: '',
    is_published: true,
    display_order: 1,
  });

  // Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch Achievements & Messages from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setIsLoading(false);
      setIsSupabaseConnected(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCurrentUserEmail(user.email || null);
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || DESIGNATED_ADMIN_EMAIL;
        if (user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
          setIsAuthorizedAdmin(false);
          setIsLoading(false);
          return;
        }
      }

      // Fetch Achievements
      const { data: achData, error: achError } = await supabase
        .from('achievements')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (achError) throw achError;
      if (achData && achData.length > 0) {
        setAchievements(achData as Achievement[]);
      }

      // Fetch Contact Inquiries
      const { data: msgData, error: msgError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (msgError) {
        console.warn('Could not fetch contact messages:', msgError.message);
      } else if (msgData) {
        setMessages(msgData as ContactInquiry[]);
      }

      setIsSupabaseConnected(true);
    } catch (err: any) {
      console.warn('Supabase fetch error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------------------------------------------------------------------
  // Achievement Handlers
  // ---------------------------------------------------------------------------
  const openCreateModal = () => {
    setEditingId(null);
    setUploadFile(null);
    setFormData({
      title: '',
      category: 'Hackathons',
      description: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      organization: '',
      location: '',
      certificate_url: '',
      external_url: '',
      is_published: true,
      display_order: achievements.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Achievement) => {
    setEditingId(item.id);
    setUploadFile(null);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      date: item.date,
      organization: item.organization,
      location: item.location || '',
      certificate_url: item.certificate_url || '',
      external_url: item.external_url || '',
      is_published: item.is_published,
      display_order: item.display_order,
    });
    setIsModalOpen(true);
  };

  // Safe file upload: Strictly disallows SVG to prevent stored XSS attacks
  const handleFileUpload = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    if (!supabase) return null;

    // Disallow SVG explicitly
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      alert('SVG uploads are prohibited for security reasons. Please upload PNG, JPG, WebP, or PDF files.');
      return null;
    }

    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) {
      alert('Only images (PNG, JPG, WebP) or PDF documents are permitted.');
      return null;
    }

    // Size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be 5MB or less.');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `certificates/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setStatusMessage(null);

    const supabase = createClient();

    try {
      let finalCertUrl = formData.certificate_url;

      if (uploadFile && supabase) {
        const uploadedUrl = await handleFileUpload(uploadFile);
        if (uploadedUrl) {
          finalCertUrl = uploadedUrl;
        } else {
          setIsUploading(false);
          return;
        }
      }

      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        date: formData.date.trim(),
        organization: formData.organization.trim(),
        location: formData.location ? formData.location.trim() : null,
        certificate_url: finalCertUrl ? finalCertUrl.trim() : null,
        external_url: formData.external_url ? formData.external_url.trim() : null,
        is_published: formData.is_published,
        display_order: Number(formData.display_order) || 0,
        updated_at: new Date().toISOString(),
      };

      if (supabase) {
        if (editingId) {
          const { error } = await supabase
            .from('achievements')
            .update(payload)
            .eq('id', editingId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('achievements')
            .insert({ ...payload, created_at: new Date().toISOString() });
          if (error) throw error;
        }
        await fetchData();
      } else {
        if (editingId) {
          setAchievements((prev) =>
            prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item))
          );
        } else {
          const newLocalItem: Achievement = {
            id: `local-${Date.now()}`,
            ...payload,
            created_at: new Date().toISOString(),
          };
          setAchievements((prev) => [newLocalItem, ...prev]);
        }
      }

      setStatusMessage({
        type: 'success',
        text: `Achievement successfully ${editingId ? 'updated' : 'created'}!`,
      });
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Save error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to save achievement. Check database permissions.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAchievement = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    const supabase = createClient();
    try {
      if (supabase) {
        const { error } = await supabase.from('achievements').delete().eq('id', id);
        if (error) throw error;
        await fetchData();
      } else {
        setAchievements((prev) => prev.filter((item) => item.id !== id));
      }
      setStatusMessage({ type: 'success', text: `Deleted "${title}".` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete.' });
    }
  };

  const handleTogglePublish = async (item: Achievement) => {
    const newStatus = !item.is_published;
    const supabase = createClient();
    try {
      if (supabase) {
        const { error } = await supabase
          .from('achievements')
          .update({ is_published: newStatus, updated_at: new Date().toISOString() })
          .eq('id', item.id);
        if (error) throw error;
        await fetchData();
      } else {
        setAchievements((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, is_published: newStatus } : a))
        );
      }
      setStatusMessage({
        type: 'success',
        text: `"${item.title}" is now ${newStatus ? 'Published' : 'Hidden'}.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Update failed.' });
    }
  };

  // ---------------------------------------------------------------------------
  // Contact Messages Handlers
  // ---------------------------------------------------------------------------
  const handleToggleReadStatus = async (msg: ContactInquiry) => {
    const newStatus = !msg.is_read;
    const supabase = createClient();

    try {
      if (supabase) {
        const { error } = await supabase
          .from('contact_messages')
          .update({ is_read: newStatus })
          .eq('id', msg.id);

        if (error) throw error;
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: newStatus } : m))
      );
      if (selectedMessage && selectedMessage.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, is_read: newStatus });
      }

      setStatusMessage({
        type: 'success',
        text: `Message marked as ${newStatus ? 'Read' : 'Unread'}.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to update message.' });
    }
  };

  const handleDeleteMessage = async (msgId: string, senderName: string) => {
    if (!confirm(`Delete contact message from ${senderName}?`)) return;

    const supabase = createClient();
    try {
      if (supabase) {
        const { error } = await supabase.from('contact_messages').delete().eq('id', msgId);
        if (error) throw error;
      }

      setMessages((prev) => prev.filter((m) => m.id !== msgId));
      if (selectedMessage && selectedMessage.id === msgId) {
        setSelectedMessage(null);
      }
      setStatusMessage({ type: 'success', text: `Message from ${senderName} deleted.` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to delete message.' });
    }
  };

  // Unauthorized screen protection
  if (!isAuthorizedAdmin) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-red-500/10 border border-red-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="font-display font-extrabold text-xl text-white">
          Unauthorized Administrator Account
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          You are signed in as <strong>{currentUserEmail}</strong>. Only the designated administrator account (<strong>{DESIGNATED_ADMIN_EMAIL}</strong>) is permitted to access this management dashboard, modify achievements, view messages, or manage certificates.
        </p>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
            Portal Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Designated Admin: <span className="text-lime-neon">{DESIGNATED_ADMIN_EMAIL}</span>
          </p>
        </div>

        {activeTab === 'achievements' && (
          <Button
            size="md"
            variant="primary"
            onClick={openCreateModal}
            className="gap-2 shadow-glow-lime self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Achievement</span>
          </Button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'achievements'
              ? 'bg-lime-neon text-cosmic-950 shadow-glow-lime'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Achievements ({achievements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'messages'
              ? 'bg-lime-neon text-cosmic-950 shadow-glow-lime'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Contact Messages ({messages.length})</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Status Notice Banner */}
      {!isSupabaseConnected && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-300 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-300">Operating in Local Fallback Mode</p>
            <p className="leading-relaxed">
              Connect your live Supabase project by providing <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code> to persist changes to the cloud database.
            </p>
          </div>
        </div>
      )}

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-lime-neon/15 border border-lime-neon/30 text-lime-neon'
              : 'bg-red-500/15 border border-red-500/30 text-red-300'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 1: ACHIEVEMENTS MANAGEMENT */}
      {/* ===================================================================== */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Total Records</span>
              <p className="text-2xl font-bold text-white mt-1">{achievements.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Live Published</span>
              <p className="text-2xl font-bold text-lime-neon mt-1">
                {achievements.filter((a) => a.is_published).length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Hackathons</span>
              <p className="text-2xl font-bold text-violet-300 mt-1">
                {achievements.filter((a) => a.category === 'Hackathons').length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cosmic-900/60 border border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Certificates</span>
              <p className="text-2xl font-bold text-sky-400 mt-1">
                {achievements.filter((a) => a.certificate_url).length}
              </p>
            </div>
          </div>

          {/* Achievements Table */}
          <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-white/5 border-b border-white/10 text-xs font-mono uppercase text-slate-400">
                  <tr>
                    <th className="py-3.5 px-4">Order</th>
                    <th className="py-3.5 px-4">Title &amp; Org</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Certificate</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {achievements.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono text-xs text-lime-neon font-bold">
                        #{item.display_order}
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="font-bold text-white truncate">{item.title}</p>
                        <p className="text-xs text-slate-400 truncate">{item.organization}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-4 px-4">
                        {item.certificate_url ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono text-lime-neon">
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span>Attached</span>
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-slate-500">None</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-colors ${
                            item.is_published
                              ? 'bg-lime-neon/10 text-lime-neon border border-lime-neon/30'
                              : 'bg-white/5 text-slate-400 border border-white/10'
                          }`}
                        >
                          {item.is_published ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="Edit Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAchievement(item.id, item.title)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: CONTACT INQUIRIES MANAGEMENT */}
      {/* ===================================================================== */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Incoming Contact Messages</h2>
              <p className="text-xs text-slate-400 font-mono">
                Messages submitted via the public portfolio contact form.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Unread: <strong className="text-lime-neon">{unreadCount}</strong> of {messages.length}
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-cosmic-900/40 border border-white/10 space-y-2">
              <Inbox className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-slate-300 text-sm font-semibold">No messages received yet.</p>
              <p className="text-slate-500 text-xs">
                When visitors submit inquiries through the contact form, they will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/5 border-b border-white/10 text-xs font-mono uppercase text-slate-400">
                    <tr>
                      <th className="py-3.5 px-4">Sender</th>
                      <th className="py-3.5 px-4">Subject</th>
                      <th className="py-3.5 px-4">Received</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          !msg.is_read ? 'bg-lime-neon/[0.03]' : ''
                        }`}
                      >
                        <td className="py-4 px-4 max-w-xs">
                          <p className="font-bold text-white truncate">{msg.name}</p>
                          <p className="text-xs text-lime-neon font-mono truncate">{msg.email}</p>
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          <p className="font-medium text-slate-200 truncate">{msg.subject}</p>
                          <p className="text-xs text-slate-400 truncate max-w-sm">{msg.message}</p>
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleReadStatus(msg)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-colors ${
                              msg.is_read
                                ? 'bg-white/5 text-slate-400 border border-white/10'
                                : 'bg-lime-neon/15 text-lime-neon border border-lime-neon/30 font-bold'
                            }`}
                          >
                            {msg.is_read ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Read</span>
                              </>
                            ) : (
                              <>
                                <span className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
                                <span>Unread</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedMessage(msg);
                                if (!msg.is_read) handleToggleReadStatus(msg);
                              }}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                              title="View Full Inquiry"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                                msg.subject
                              )}`}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-lime-neon transition-colors"
                              title="Reply via Email"
                            >
                              <Send className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteMessage(msg.id, msg.name)}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message Inspection Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedMessage(null)}
          />

          <div className="relative w-full max-w-2xl rounded-3xl bg-cosmic-900 border border-white/20 p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Badge variant={selectedMessage.is_read ? 'slate' : 'lime'}>
                  {selectedMessage.is_read ? 'Read Message' : 'New Unread'}
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {new Date(selectedMessage.created_at).toLocaleString('en-GB')}
                </span>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono uppercase text-slate-400">From:</p>
                <h3 className="text-lg font-bold text-white">{selectedMessage.name}</h3>
                <p className="text-xs font-mono text-lime-neon">{selectedMessage.email}</p>
              </div>

              <div>
                <p className="text-xs font-mono uppercase text-slate-400">Subject:</p>
                <p className="text-base font-semibold text-slate-200">{selectedMessage.subject}</p>
              </div>

              <div className="p-4 rounded-2xl bg-cosmic-950 border border-white/10">
                <p className="text-xs font-mono uppercase text-slate-400 mb-2">Message Content:</p>
                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleReadStatus(selectedMessage)}
              >
                Mark as {selectedMessage.is_read ? 'Unread' : 'Read'}
              </Button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                >
                  <Button variant="primary" size="sm" className="gap-2">
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply to {selectedMessage.name}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl rounded-3xl bg-cosmic-900 border border-white/20 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="font-display font-extrabold text-xl text-white">
                {editingId ? 'Edit Achievement Record' : 'Add New Achievement'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-300 uppercase">Achievement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NodeCraft Hackathon — Participation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as AchievementCategory })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Event Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 13 October 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Organizer / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GP Patna-7, Gulzarbagh"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Location (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Patna, Bihar"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 uppercase">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail the project, team contribution, or milestone context..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white resize-y font-sans"
                />
              </div>

              {/* Secure File Upload: PNG, JPG, WebP, PDF only */}
              <div className="space-y-2 p-4 rounded-2xl bg-cosmic-950 border border-white/10">
                <label className="text-slate-200 uppercase font-bold flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-lime-neon" />
                  <span>Certificate Document (Image or PDF)</span>
                </label>

                {formData.certificate_url && (
                  <p className="text-[11px] text-lime-neon truncate">
                    Current document: {formData.certificate_url}
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadFile(e.target.files[0]);
                      }
                    }}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-lime-neon/10 file:text-lime-neon hover:file:bg-lime-neon/20 cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Accepted: PNG, JPG, WebP, PDF (Max 5MB). SVG uploads are blocked to protect against XSS vectors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Verification Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.external_url || ''}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 uppercase">Display Order (Sort Number)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 accent-[#00ff87] rounded cursor-pointer"
                />
                <label htmlFor="is_published" className="text-sm text-slate-200 cursor-pointer">
                  Visible to Public Portfolio Visitors
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isUploading}
                  className="shadow-glow-lime"
                >
                  {editingId ? 'Save Changes' : 'Create Record'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
