'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { store } from '@/lib/store';
import { organizerSession } from '@/lib/organizer-session';
import { Guestlist } from '@/lib/types';
import { Plus, Calendar, Users, MapPin, ArrowRight, ListChecks } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OrganizerDashboard() {
  const [guestlists, setGuestlists] = useState<Guestlist[]>([]);

  useEffect(() => {
    const fetchGuestlists = async () => {
      const sessionId = organizerSession.getSession();
      const lists = await store.getGuestlists();
      
      // Filter to only show guestlists created by this organizer
      const myLists = sessionId 
        ? lists.filter(list => list.createdBy === sessionId)
        : [];
      
      setGuestlists(myLists);
    };
    fetchGuestlists();
  }, []);

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
          <Link href="/organizer/create">
            <NeoPopButton variant="yellow" size="sm">
              <Plus className="w-4 h-4 inline mr-1" />
              New Guestlist
            </NeoPopButton>
          </Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Your Guestlists</h2>
            <p className="text-xl text-gray-300">
              Manage all your event guestlists in one place
            </p>
          </div>

          {/* Empty State */}
          {guestlists.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-neopop-purple rounded-2xl flex items-center justify-center mx-auto mb-6 neopop-shadow-purple">
                <ListChecks className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No Guestlists Yet</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                Create your first guestlist and start managing your event registrations
              </p>
              <Link href="/organizer/create">
                <NeoPopButton variant="purple" size="lg">
                  <Plus className="w-5 h-5 inline mr-2" />
                  Create Your First Guestlist
                </NeoPopButton>
              </Link>
            </div>
          ) : (
            /* Guestlists Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guestlists.map((guestlist) => {
                const totalGuests = guestlist.guests.length;
                const approvedGuests = guestlist.guests.filter(g => g.status === 'approved').length;
                const pendingGuests = guestlist.guests.filter(g => g.status === 'pending').length;

                return (
                  <Link href={`/organizer/guestlist/${guestlist.id}`} key={guestlist.id}>
                    <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-6 hover:border-neopop-yellow transition-all cursor-pointer neopop-shadow-purple hover:neopop-shadow-yellow group">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-neopop-yellow transition-colors">
                          {guestlist.eventName}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          guestlist.isActive 
                            ? 'bg-neopop-green text-neopop-dark' 
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {guestlist.isActive ? 'Active' : 'Inactive'}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(guestlist.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{guestlist.venue}</span>
                        </div>
                      </div>

                      <div className="bg-neopop-dark rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Total Guests</span>
                          <span className="text-white font-bold text-xl">{totalGuests}</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-neopop-green"></div>
                            <span className="text-gray-400">{approvedGuests} Approved</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-neopop-yellow"></div>
                            <span className="text-gray-400">{pendingGuests} Pending</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-neopop-purple group-hover:text-neopop-yellow transition-colors">
                        <span className="font-bold uppercase text-sm">Manage List</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 