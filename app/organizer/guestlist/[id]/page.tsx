'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { store } from '@/lib/store';
import { Guestlist, Guest } from '@/lib/types';
import { 
  ArrowLeft, Calendar, MapPin, Users, CheckCircle, XCircle, 
  Clock, ListChecks, Copy, Check, Share2, ToggleLeft, ToggleRight 
} from 'lucide-react';

export default function GuestlistManagement() {
  const params = useParams();
  const router = useRouter();
  const [guestlist, setGuestlist] = useState<Guestlist | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchGuestlist = async () => {
      const id = params.id as string;
      const list = await store.getGuestlistById(id);
      if (list) {
        setGuestlist(list);
      }
    };
    fetchGuestlist();
  }, [params.id]);

  const handleStatusUpdate = async (guestId: string, status: Guest['status']) => {
    if (!guestlist) return;
    await store.updateGuest(guestlist.id, guestId, { status });
    const updated = await store.getGuestlistById(guestlist.id);
    if (updated) setGuestlist(updated);
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!guestlist || !confirm('Are you sure you want to remove this guest?')) return;
    await store.deleteGuest(guestlist.id, guestId);
    const updated = await store.getGuestlistById(guestlist.id);
    if (updated) setGuestlist(updated);
  };

  const handleToggleActive = async () => {
    if (!guestlist) return;
    await store.updateGuestlist(guestlist.id, { isActive: !guestlist.isActive });
    const updated = await store.getGuestlistById(guestlist.id);
    if (updated) setGuestlist(updated);
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}/event/${guestlist?.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!guestlist) {
    return (
      <main className="min-h-screen bg-neopop-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">Guestlist not found</p>
          <Link href="/organizer">
            <NeoPopButton variant="purple">Back to Dashboard</NeoPopButton>
          </Link>
        </div>
      </main>
    );
  }

  const filteredGuests = guestlist.guests.filter(guest => {
    if (filter === 'all') return true;
    return guest.status === filter;
  });

  const stats = {
    total: guestlist.guests.length,
    approved: guestlist.guests.filter(g => g.status === 'approved').length,
    pending: guestlist.guests.filter(g => g.status === 'pending').length,
    rejected: guestlist.guests.filter(g => g.status === 'rejected').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-neopop-dark">
      {/* Navigation */}
      <nav className="border-b border-neopop-darker p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neopop-purple rounded-lg flex items-center justify-center neopop-shadow-purple">
              <ListChecks className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">RocksList</h1>
          </Link>
          <Link href="/organizer">
            <NeoPopButton variant="yellow" size="sm">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back to Dashboard
            </NeoPopButton>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-8 mb-8 neopop-shadow-purple">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{guestlist.eventName}</h2>
                <p className="text-xl text-gray-300">{guestlist.name}</p>
              </div>
              <button onClick={handleToggleActive}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase text-sm ${
                  guestlist.isActive 
                    ? 'bg-neopop-green text-neopop-dark' 
                    : 'bg-gray-600 text-gray-300'
                } neopop-shadow-black cursor-pointer hover:scale-105 transition-transform`}>
                  {guestlist.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  {guestlist.isActive ? 'Active' : 'Inactive'}
                </div>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-neopop-yellow" />
                <span>{formatDate(guestlist.eventDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-neopop-yellow" />
                <span>{guestlist.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-neopop-yellow" />
                <span>{guestlist.maxGuests ? `${stats.total}/${guestlist.maxGuests} guests` : `${stats.total} guests`}</span>
              </div>
            </div>

            {guestlist.description && (
              <p className="text-gray-300 mb-6">{guestlist.description}</p>
            )}

            <NeoPopButton 
              variant="purple" 
              size="sm" 
              onClick={copyShareLink}
              className="w-full md:w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 inline mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 inline mr-2" />
                  Share Registration Link
                </>
              )}
            </NeoPopButton>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-6 neopop-shadow-black">
              <div className="text-gray-400 text-sm uppercase mb-2">Total</div>
              <div className="text-4xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-green p-6 neopop-shadow-black">
              <div className="text-gray-400 text-sm uppercase mb-2">Approved</div>
              <div className="text-4xl font-bold text-neopop-green">{stats.approved}</div>
            </div>
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-yellow p-6 neopop-shadow-black">
              <div className="text-gray-400 text-sm uppercase mb-2">Pending</div>
              <div className="text-4xl font-bold text-neopop-yellow">{stats.pending}</div>
            </div>
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-red p-6 neopop-shadow-black">
              <div className="text-gray-400 text-sm uppercase mb-2">Rejected</div>
              <div className="text-4xl font-bold text-neopop-red">{stats.rejected}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6 overflow-x-auto">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-3 rounded-lg font-bold uppercase text-sm whitespace-nowrap transition-all ${
                  filter === filterOption
                    ? 'bg-neopop-purple text-white neopop-shadow-purple'
                    : 'bg-neopop-darker text-gray-400 border-2 border-neopop-darker hover:border-neopop-purple'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          {/* Guests List */}
          {filteredGuests.length === 0 ? (
            <div className="text-center py-20 bg-neopop-darker rounded-lg border-2 border-dashed border-neopop-purple">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400">
                {filter === 'all' ? 'No guests yet' : `No ${filter} guests`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-6 neopop-shadow-black"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{guest.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          guest.status === 'approved' 
                            ? 'bg-neopop-green text-neopop-dark'
                            : guest.status === 'pending'
                            ? 'bg-neopop-yellow text-neopop-dark'
                            : 'bg-neopop-red text-white'
                        }`}>
                          {guest.status === 'approved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {guest.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                          {guest.status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                          {guest.status}
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-300">
                        <p>{guest.email}</p>
                        {guest.phone && <p>{guest.phone}</p>}
                        <p className="text-sm">
                          Plus ones: {guest.plusOnes} • Registered {formatDate(guest.registeredAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {guest.status !== 'approved' && (
                        <NeoPopButton
                          variant="green"
                          size="sm"
                          onClick={() => handleStatusUpdate(guest.id, 'approved')}
                        >
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Approve
                        </NeoPopButton>
                      )}
                      {guest.status !== 'rejected' && (
                        <NeoPopButton
                          variant="red"
                          size="sm"
                          onClick={() => handleStatusUpdate(guest.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4 inline mr-1" />
                          Reject
                        </NeoPopButton>
                      )}
                      {guest.status !== 'pending' && (
                        <NeoPopButton
                          variant="yellow"
                          size="sm"
                          onClick={() => handleStatusUpdate(guest.id, 'pending')}
                        >
                          <Clock className="w-4 h-4 inline mr-1" />
                          Pending
                        </NeoPopButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 