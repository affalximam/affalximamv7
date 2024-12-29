"use client";

import React, { lazy, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Span } from 'next/dist/trace';

export default function breadcrumb() {

    const pathname = usePathname();

    // Ambil URL path dan pecah menjadi array berdasarkan '/'
    const pathArray = pathname.split('/').filter((path) => path);

    // Fungsi untuk membangun URL untuk setiap breadcrumb
    const buildHref = (index: number) => {
        return '/' + pathArray.slice(0, index + 1).join('/');
    };

    return (
        <>
            <div className="breadcumb">
                <a href="/" className="text-decoration-none text-white">home</a>
                {pathArray.map((path, index) => (
                    <span key={index}>
                        <i className="bi bi-chevron-right mx-2 fs-5"></i>
                        <a href={buildHref(index)} className="text-decoration-none text-white">
                            {path.charAt(0).toLowerCase() + path.slice(1).replace(/-/g, ' ')}
                        </a>
                    </span>
                ))}
            </div>
        </>
    );

}

