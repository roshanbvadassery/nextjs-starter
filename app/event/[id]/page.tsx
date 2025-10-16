'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { store } from '@/lib/store';
import { Guestlist } from '@/lib/types';
import { Calendar, MapPin, Users, CheckCircle, ListChecks, PartyPopper, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function EventRegistration() {
  const params = useParams();
  const [guestlist, setGuestlist] = useState<Guestlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plusOnes: '0',
  });

  useEffect(() => {
    const fetchGuestlist = async () => {
      const id = params.id as string;
      const list = await store.getGuestlistById(id);
      
      if (!list) {
        setError('Event not found');
      } else if (!list.isActive) {
        setError('This event is no longer accepting registrations');
      } else {
        setGuestlist(list);
      }
      
      setLoading(false);
    };
    fetchGuestlist();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestlist) return;

    // Check capacity
    if (guestlist.maxGuests && guestlist.guests.length >= guestlist.maxGuests) {
      setError('Sorry, this event is at full capacity');
      return;
    }

    const guest = await store.addGuest(guestlist.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      plusOnes: parseInt(formData.plusOnes),
      status: 'pending',
    });

    if (guest) {
      setRegistered(true);
    } else {
      setError('Failed to register. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-neopop-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neopop-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading event...</p>
        </div>
      </main>
    );
  }

  if (error || !guestlist) {
    return (
      <main className="min-h-screen bg-neopop-dark flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-neopop-red rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0_0_hsl(0,84%,40%)]">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{error || 'Event Not Found'}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {error === 'Event not found' 
              ? 'The event you\'re looking for doesn\'t exist or has been removed.'
              : error === 'This event is no longer accepting registrations'
              ? 'Registration for this event has been closed by the organizer.'
              : 'Please contact the event organizer for assistance.'}
          </p>
          <Link href="/">
            <NeoPopButton variant="purple">Back to Home</NeoPopButton>
          </Link>
        </div>
      </main>
    );
  }

  if (registered) {
    return (
      <main className="min-h-screen bg-neopop-dark flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-32 h-32 bg-neopop-green rounded-2xl flex items-center justify-center mx-auto mb-8 neopop-shadow-green animate-bounce">
            <CheckCircle className="w-16 h-16 text-neopop-dark" />
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">You're On The List! 🎉</h2>
          <p className="text-xl text-gray-300 mb-2">
            Your registration for <span className="text-neopop-yellow font-bold">{guestlist.eventName}</span> has been submitted.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            The organizer will review and approve your request shortly. You'll be notified via email.
          </p>
          <Link href="/">
            <NeoPopButton variant="purple">Back to Home</NeoPopButton>
          </Link>
        </div>
      </main>
    );
  }

  const spotsLeft = guestlist.maxGuests 
    ? guestlist.maxGuests - guestlist.guests.length 
    : null;

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
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Event Info Card */}
          <div className="mb-8 text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-neopop-green rounded-2xl flex items-center justify-center mx-auto neopop-shadow-green">
                <PartyPopper className="w-10 h-10 text-neopop-dark" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">{guestlist.eventName}</h2>
            {guestlist.description && (
              <p className="text-xl text-gray-300 mb-6">{guestlist.description}</p>
            )}
          </div>

          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-8 mb-6 neopop-shadow-purple">
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-6 h-6 text-neopop-yellow" />
                <span>{formatDate(guestlist.eventDate)}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-6 h-6 text-neopop-yellow" />
                <span>{guestlist.venue}</span>
              </div>
              {guestlist.maxGuests && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="w-6 h-6 text-neopop-yellow" />
                  <span>
                    {spotsLeft! > 0 
                      ? `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} remaining` 
                      : 'Event is at full capacity'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-green p-8 neopop-shadow-green">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase">Register Now</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="plusOnes" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Number of Plus Ones
                  </label>
                  <select
                    id="plusOnes"
                    name="plusOnes"
                    value={formData.plusOnes}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="0">Just me</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                  </select>
                </div>
              </div>
            </div>

            <NeoPopButton 
              type="submit" 
              variant="green" 
              className="w-full"
              disabled={spotsLeft !== null && spotsLeft <= 0}
            >
              <CheckCircle className="w-5 h-5 inline mr-2" />
              {spotsLeft !== null && spotsLeft <= 0 ? 'Event Full' : 'Submit Registration'}
            </NeoPopButton>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Your registration will be reviewed by the event organizer
          </p>
        </div>
      </div>
    </main>
  );
} 