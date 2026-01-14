'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getPhotoUrl } from '@/lib/image-helpers';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Masonry from 'react-masonry-css';
import Navigation from './Navigation';
import ContactForm from './ContactForm';

type Category = 'all' | 'landscape' | 'minimalist';

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
        src: getPhotoUrl(photo.filename),
        alt: photo.alt,
        title: photo.title,
        width: photo.width,
        height: photo.height,
        location: photo.location,
        dateTaken: photo.dateTaken,
        description: photo.description
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('https://formspree.io/f/xreegnoj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({ name: '', email: '', message: '' });
                setIsContactOpen(false);
                alert('Message sent successfully!');
            } else {
                throw new Error('Failed to send');
            }
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Failed to send message. Please try again.');
        }
        setIsSubmitting(false);
    };

    const breakpointColumns = {
        default: 3,
        1280: 2,
        768: 1
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navigation
                logo={settings.logoFilename}
                title={settings.title}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setIsContactOpen={setIsContactOpen}
            />

            <main className="flex-1 p-4 md:p-8">
                <Masonry
                    breakpointCols={breakpointColumns}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                >
                    {filteredPhotos.map((photo, index) => (
                        <div
                            key={photo.id}
                            className="group relative w-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer transition-opacity duration-300"
                            onClick={() => setLightboxIndex(index)}
                        >
                            <Image
                                src={getPhotoUrl(photo.filename)}
                                alt={photo.alt}
                                width={photo.width}
                                height={photo.height}
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Hover metadata overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                                {photo.location && (
                                    <p className="text-white/80 text-sm">{photo.location}</p>
                                )}
                                <p className="text-white/60 text-sm">{new Date(photo.dateTaken).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                            </div>
                        </div>
                    ))}
                </Masonry>
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
                    slide: ({ slide }) => {
                        const slideData = slide as typeof lightboxPhotos[number];
                        return (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="relative flex-1 w-full flex items-center justify-center" style={{ maxHeight: 'calc(100% - 100px)' }}>
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt || ''}
                                        width={2400}
                                        height={1600}
                                        style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </div>
                                <div className="w-full text-center py-4 px-6 bg-black/50">
                                    <h3 className="text-white font-semibold text-xl">{slideData.title}</h3>
                                    <div className="text-white/80 text-sm mt-1">
                                        {slideData.location && <span>{slideData.location}</span>}
                                        {slideData.location && slideData.dateTaken && <span className="mx-2">•</span>}
                                        {slideData.dateTaken && (
                                            <span>{new Date(slideData.dateTaken).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                                        )}
                                    </div>
                                    {slideData.description && (
                                        <p className="text-white/70 text-sm mt-2 max-w-2xl mx-auto">{slideData.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    }
                }}
            />
        </div>
    );
};

export default PortfolioLayout;