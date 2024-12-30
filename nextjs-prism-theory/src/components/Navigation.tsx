'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Menu, X } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';

interface SanityImage {
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

interface NavigationProps {
    logo?: SanityImage;
    title: string;
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
    selectedCategory?: string;
    setSelectedCategory?: (category: 'all' | 'landscape' | 'minimalist') => void;
    setIsContactOpen: (value: boolean) => void;
}

export default function Navigation({
    logo,
    title,
    isMenuOpen,
    setIsMenuOpen,
    selectedCategory,
    setSelectedCategory,
    setIsContactOpen
}: NavigationProps) {
    return (
        <>
            <nav className={`fixed md:relative w-64 h-full bg-white border-r transition-all duration-300 z-50 
                ${isMenuOpen ? 'left-0' : '-left-64 md:left-0'}`}>
                <div className="flex flex-col h-full p-6">
                    <Link
                        href="/"
                        className="flex items-center mb-12"
                        onClick={() => setSelectedCategory?.('all')}
                    >
                        {logo ? (
                            <div className="relative w-200 h-200">
                                <Image
                                    src={urlForImage(logo).width(200).height(200).url()}
                                    alt={title}
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                    loading="eager"
                                    priority
                                />
                            </div>
                        ) : (
                            <Camera className="h-16 w-16 text-gray-900" />
                        )}
                    </Link>

                    <div className="flex flex-col space-y-4">
                        {setSelectedCategory && (
                            <>
                                <button
                                    onClick={() => setSelectedCategory('landscape')}
                                    className={`text-left px-2 py-1 text-gray-600 hover:text-gray-900 ${selectedCategory === 'landscape' ? 'font-semibold' : ''}`}
                                >
                                    Landscape
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('minimalist')}
                                    className={`text-left px-2 py-1 text-gray-600 hover:text-gray-900 ${selectedCategory === 'minimalist' ? 'font-semibold' : ''}`}
                                >
                                    Minimalist
                                </button>
                            </>
                        )}
                        <Link
                            href="/journal"
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                        >
                            Photo Journal
                        </Link>
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-900"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </nav>

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed md:hidden left-4 top-4 z-50 bg-white rounded-md p-2 shadow-md"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </>
    );
}
