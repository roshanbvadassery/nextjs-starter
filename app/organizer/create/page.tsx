'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { store } from '@/lib/store';
import { organizerSession } from '@/lib/organizer-session';
import { ArrowLeft, Sparkles, ListChecks } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CreateGuestlist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    eventName: '',
    eventDate: '',
    venue: '',
    description: '',
    maxGuests: '',
    createdBy: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate and store organizer session
    const sessionId = organizerSession.generateSessionId(formData.createdBy);
    organizerSession.setSession(sessionId);
    
    const guestlist = await store.addGuestlist({
      name: formData.name,
      eventName: formData.eventName,
      eventDate: formData.eventDate,
      venue: formData.venue,
      description: formData.description,
      maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
      createdBy: sessionId, // Store session ID instead of name
      isActive: true,
    });

    if (guestlist) {
      router.push(`/organizer/guestlist/${guestlist.id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

      {/* Form Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-neopop-purple rounded-2xl flex items-center justify-center mx-auto neopop-shadow-purple">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">Create Guestlist</h2>
            <p className="text-xl text-gray-300">
              Set up your event and start accepting registrations
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-8 neopop-shadow-purple">
              <div className="space-y-6">
                <div>
                  <label htmlFor="eventName" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    required
                    value={formData.eventName}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="Summer Beach Party 2025"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Guestlist Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="VIP List, General Admission, etc."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="maxGuests" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                      Max Guests
                    </label>
                    <input
                      type="number"
                      id="maxGuests"
                      name="maxGuests"
                      value={formData.maxGuests}
                      onChange={handleChange}
                      className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                      placeholder="Leave empty for unlimited"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="venue" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Venue *
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    required
                    value={formData.venue}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="The Beach Club, 123 Ocean Ave"
                  />
                </div>

                <div>
                  <label htmlFor="createdBy" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    required
                    value={formData.createdBy}
                    onChange={handleChange}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-white font-bold mb-2 uppercase tracking-wider text-sm">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="neopop-input w-full px-4 py-3 text-white focus:outline-none resize-none"
                    placeholder="Tell guests about your event..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/organizer" className="flex-1">
                <NeoPopButton type="button" variant="red" className="w-full">
                  Cancel
                </NeoPopButton>
              </Link>
              <NeoPopButton type="submit" variant="green" className="flex-1">
                <Sparkles className="w-5 h-5 inline mr-2" />
                Create Guestlist
              </NeoPopButton>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 