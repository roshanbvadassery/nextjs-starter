'use client';

import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { Users, ListChecks, Sparkles, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neopop-dark">
      {/* Navigation */}
      <nav className="border-b border-neopop-darker p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neopop-purple rounded-lg flex items-center justify-center neopop-shadow-purple">
              <ListChecks className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">RocksList</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/organizer">
              <NeoPopButton variant="yellow" size="sm">
                For Organizers
              </NeoPopButton>
            </Link>
            <a href="#how-it-works" className="scroll-smooth">
              <NeoPopButton variant="green" size="sm">
                How It Works
              </NeoPopButton>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="px-6 py-2 bg-neopop-pink rounded-full neopop-shadow-pink">
              <span className="text-white font-bold uppercase tracking-wider text-sm">
                ✨ Guestlist Management Made Easy
              </span>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Manage Your
            <br />
            <span className="text-neopop-yellow">Event Guestlists</span>
            <br />
            Like a Pro
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            The ultimate platform for party promoters and event organizers to create, 
            manage, and track guestlists with style.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/organizer/create">
              <NeoPopButton variant="purple" size="lg">
                <Sparkles className="w-5 h-5 inline mr-2" />
                Create Guestlist
              </NeoPopButton>
            </Link>
            <a href="#how-it-works" className="scroll-smooth">
              <NeoPopButton variant="yellow" size="lg">
                <Users className="w-5 h-5 inline mr-2" />
                Learn More
              </NeoPopButton>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300">Simple, secure, and stylish guestlist management</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 mb-20">
          {/* For Organizers */}
          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-8 neopop-shadow-purple">
            <h3 className="text-3xl font-bold text-neopop-purple mb-4">👔 For Organizers</h3>
            <ol className="space-y-4 text-gray-300 text-lg">
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">1.</span>
                <span>Create your guestlist with event details</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">2.</span>
                <span>Get a unique registration link for your event</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">3.</span>
                <span>Share the link with potential guests</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">4.</span>
                <span>Review and approve registrations from your dashboard</span>
              </li>
            </ol>
          </div>

          {/* For Guests */}
          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-green p-8 neopop-shadow-green">
            <h3 className="text-3xl font-bold text-neopop-green mb-4">🎉 For Guests</h3>
            <ol className="space-y-4 text-gray-300 text-lg">
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">1.</span>
                <span>Receive a unique event link from the organizer</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">2.</span>
                <span>Click the link to see event details</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">3.</span>
                <span>Fill in your information and submit</span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-neopop-yellow">4.</span>
                <span>Wait for organizer approval and enjoy the event!</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-neopop-darker p-8 rounded-lg border-2 border-neopop-purple neopop-shadow-purple">
            <div className="w-16 h-16 bg-neopop-purple rounded-lg flex items-center justify-center mb-4 neopop-shadow-black">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Easy Creation</h3>
            <p className="text-gray-300">
              Create and customize guestlists in seconds. Set capacity limits, event details, and more.
            </p>
          </div>

          <div className="bg-neopop-darker p-8 rounded-lg border-2 border-neopop-yellow neopop-shadow-yellow">
            <div className="w-16 h-16 bg-neopop-yellow rounded-lg flex items-center justify-center mb-4 neopop-shadow-black">
              <Users className="w-8 h-8 text-neopop-dark" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Guest Management</h3>
            <p className="text-gray-300">
              Approve, reject, or manage registrations with a beautiful interface designed for speed.
            </p>
          </div>

          <div className="bg-neopop-darker p-8 rounded-lg border-2 border-neopop-green neopop-shadow-green">
            <div className="w-16 h-16 bg-neopop-green rounded-lg flex items-center justify-center mb-4 neopop-shadow-black">
              <ListChecks className="w-8 h-8 text-neopop-dark" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-time Updates</h3>
            <p className="text-gray-300">
              Track registrations and manage your guestlist in real-time with instant updates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neopop-purple to-neopop-pink p-12 rounded-2xl neopop-shadow-black">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Rock Your Events?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of organizers using RocksList to manage their events.
            </p>
            <Link href="/organizer/create">
              <NeoPopButton 
                variant="yellow" 
                size="lg"
                className="bg-white text-neopop-purple hover:bg-gray-100 shadow-[6px_6px_0_0_rgba(0,0,0,0.3)]"
              >
                Get Started Free
              </NeoPopButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neopop-darker py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 RocksList. Made with 💜 for event organizers everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
}
