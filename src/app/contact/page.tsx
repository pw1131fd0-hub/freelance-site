'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.error || 'Failed to send message.'}`);
      }
    } catch (error) {
      setMessage('❌ Error sending message. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      <nav className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="text-sm font-bold hover:text-blue-600 dark:hover:text-blue-400">
          ← Back to Home
        </Link>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Connect with iiNumbers</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 max-w-2xl">
          Interested in building AI-oriented solutions or have a specific challenge? Drop a message below.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-12">
          <div className="space-y-8">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-blue-600 transition-colors">
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-lg placeholder-gray-300 dark:placeholder-gray-700"
                placeholder="How should we call you?"
              />
            </div>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-blue-600 transition-colors">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-lg placeholder-gray-300 dark:placeholder-gray-700"
                placeholder="your@email.com"
              />
            </div>

            <div className="border-b border-gray-200 dark:border-gray-800 pb-2 focus-within:border-blue-600 transition-colors">
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-lg placeholder-gray-300 dark:placeholder-gray-700 resize-none"
                placeholder="What's on your mind?"
              />
            </div>
          </div>

          {message && (
            <div className={`text-sm font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-24 pt-12 border-t border-gray-100 dark:border-gray-900">
          <p className="text-gray-500 dark:text-gray-500 text-sm font-mono">
            Direct: <a href="mailto:contact@iinumbers.com" className="hover:text-blue-600 underline">contact@iinumbers.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}