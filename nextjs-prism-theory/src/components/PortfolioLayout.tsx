'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { X } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Navigation from './Navigation';
import ContactForm from './ContactForm';

type Category = 'all' | 'landscape' | 'minimalist';

interface SanityImage {
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

interface Photo {
    _id: string;
    title: string;
    category: 'landscape' | 'minimalist';
    image: SanityImage;
    alt: string;
}

interface SiteSettings {
    logo?: SanityImage;
    title: string;
    description?: string;
}

interface PortfolioLayoutProps {
    photos: Photo[];
    settings: SiteSettings;
}

const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ photos, settings }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setSelectedCategory('all');
    }, []);

    const filteredPhotos = selectedCategory === 'all'
        ? photos
        : photos.filter(photo => photo.category === selectedCategory);

    const lightboxPhotos = filteredPhotos.map(photo => ({
        src: urlForImage(photo.image).url(),
        alt: photo.alt,
        title: photo.title,
        width: 2400,
        height: 1600
    }));

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
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Failed to send message. Please try again.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation
                logo={settings.logo}
                title={settings.title}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setIsContactOpen={setIsContactOpen}
            />

            <main className="flex-1 p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-max [&:has(*:hover)>*:not(:hover)]:opacity-50">
                    {filteredPhotos.map((photo, index) => (
                        <div
                            key={photo._id}
                            className="group relative w-full h-auto overflow-hidden bg-gray-100 rounded-lg cursor-pointer transition-opacity duration-300"
                            onClick={() => setLightboxIndex(index)}
                        >
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={urlForImage(photo.image).width(1200).height(900).url()}
                                    alt={photo.alt}
                                    width={1200}
                                    height={900}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                            </div>
                        </div>
                    ))}
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

            <Lightbox
                open={lightboxIndex >= 0}
                close={() => setLightboxIndex(-1)}
                index={lightboxIndex}
                slides={lightboxPhotos}
                render={{
                    slide: ({ slide }) => (
                        <Image
                            src={slide.src}
                            alt={slide.alt || ''}
                            width={2400}
                            height={1600}
                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                        />
                    )
                }}
            />
        </div>
    );
};

export default PortfolioLayout;