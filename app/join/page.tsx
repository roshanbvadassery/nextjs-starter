'use client';

import Link from 'next/link';
import { NeoPopButton } from '@/components/neopop-button';
import { ListChecks, Link as LinkIcon, Mail, MessageCircle } from 'lucide-react';

export default function JoinPage() {
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

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-block mb-8">
            <div className="w-32 h-32 bg-neopop-yellow rounded-2xl flex items-center justify-center mx-auto neopop-shadow-yellow">
              <LinkIcon className="w-16 h-16 text-neopop-dark" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Looking to Join an Event?
          </h2>
          
          <p className="text-2xl text-gray-300 mb-12">
            You'll need a unique event link from the organizer to register.
          </p>

          {/* How to Get a Link */}
          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-purple p-8 mb-12 neopop-shadow-purple text-left">
            <h3 className="text-3xl font-bold text-neopop-purple mb-6 text-center">
              How to Get Your Event Link
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-neopop-yellow rounded-lg flex items-center justify-center neopop-shadow-black">
                    <Mail className="w-6 h-6 text-neopop-dark" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Check Your Email or Messages</h4>
                  <p className="text-gray-300">
                    The event organizer should have sent you a unique registration link via email, text, or social media.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-neopop-green rounded-lg flex items-center justify-center neopop-shadow-black">
                    <MessageCircle className="w-6 h-6 text-neopop-dark" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Contact the Organizer</h4>
                  <p className="text-gray-300">
                    If you haven't received a link, reach out to the event organizer and ask them to share it with you.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-neopop-pink rounded-lg flex items-center justify-center neopop-shadow-black">
                    <LinkIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Look for the Link</h4>
                  <p className="text-gray-300">
                    The link will look something like: <code className="text-neopop-yellow">rockslist.com/event/abc123</code>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-neopop-darker rounded-lg border-2 border-neopop-green p-6 mb-12 neopop-shadow-green">
            <p className="text-white text-lg">
              <span className="font-bold text-neopop-green">🔒 Privacy Protected:</span> Each event has its own private link, ensuring only invited guests can register.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-gray-400 text-lg mb-6">
              Are you an event organizer?
            </p>
            <Link href="/organizer/create">
              <NeoPopButton variant="purple" size="lg">
                Create Your Event
              </NeoPopButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neopop-darker py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 RocksList. Made with 💜 for event organizers everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
} 