'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { getPhotoUrl, getLogoUrl } from '@/lib/image-helpers';
import { format } from 'date-fns';
import Navigation from './Navigation';
import ContactForm from './ContactForm';

interface Photo {
    id: string;
    filename: string;
    title: string;
    category: 'landscape' | 'minimalist';
    alt: string;
    dateTaken: string;
    location: string;
    description?: string;
    width: number;
    height: number;
}

interface SiteSettings {
    title: string;
    description: string;
    logoFilename?: string;
}
interface PhotoJournalProps {
    photos: Photo[];
    settings: SiteSettings;
}


export default function PhotoJournal({ photos, settings }: PhotoJournalProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ name: '', email: '', message: '' });
                setIsContactOpen(false);
                alert('Message sent successfully!');
            }
        } catch {
            alert('Failed to send message. Please try again.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation
                title="Photo Journal"
                logo={settings.logoFilename}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                setIsContactOpen={setIsContactOpen}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Photo Journal</h1>
                    <div className="relative">
                        {/* Timeline bar */}
                        <div className="absolute left-0 md:left-1/2 w-0.5 h-full bg-gray-200 transform -translate-x-1/2" />

                        {/* Photos */}
                        <div className="space-y-12">
                            {photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                        } items-center gap-8`}
                                >
                                    {/* Date marker */}
                                    <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform -translate-x-1/2" />

                                    {/* Content */}
                                    <div className="flex-1 w-full md:w-1/2">
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <div className="relative aspect-[4/3]">
                                                <Image
                                                    src={getPhotoUrl(photo.filename)}
                                                    alt={photo.alt}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h2 className="font-semibold text-xl mb-2">{photo.title}</h2>
                                                <div className="text-sm text-gray-600">
                                                    <p>{format(new Date(photo.dateTaken), 'MMMM d, yyyy')}</p>
                                                    <p>{photo.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 w-full md:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <ContactForm
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                formData={formData}
                setFormData={setFormData}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
