"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar-2';
import Breadcrumb from '../../../components/breadcrumb';
import Contact from '../../../components/contact';
import Footer from '../../../components/footer';
import Image from 'next/image';

function extractParagraphs(content: string) {
    // Ekstrak semua elemen <p> dari konten menggunakan regex
    const paragraphs = content.match(/<p[^>]*>(.*?)<\/p>/gi) || [];

    // Gabungkan semua elemen <p> menjadi satu teks dan pisahkan dengan spasi
    const fullText = paragraphs.map(p => p.replace(/<[^>]+>/g, '')).join(' ');

    // Bagi teks menjadi array kata, ambil 20 kata pertama
    const limitedText = fullText.split(' ').slice(0, 20).join(' ');

    return limitedText;
}

const baseUrl = 'http://127.0.0.1:8000';

interface BlogProps {
    params: {
        page?: string;
    };
}

export default function Blog({ params }: BlogProps) {
    const [blog, setBlog] = useState<any[]>([]);
    const [perPage, setPerPage] = useState<number>(0);
    const [totalBlog, setTotalBlog] = useState<number>(0);
    const currentPage = parseInt(params.page || '1');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/${currentPage}`);
                console.log('Response data:', response.data); // Log respons
                if (response.data.data.success) {
                    setBlog(response.data.data.result.data); // Ini benar
                    console.log('Blog data:', response.data.data.result.data); // Log data blog
                } 
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };        
    
        fetchBlog();
        const intervalId = setInterval(fetchBlog, 5000); 
        return () => clearInterval(intervalId);
    }, []);
    

    return (
        <>
            <Navbar />
            <div className="jumbotron-2 jumbotron-blog d-flex justify-content-center align-items-center">
                <div className="vector-4">
                    <Image src="/images/svg/vector-4.svg" fill objectFit="cover" alt="Example Image" />
                </div>
                <div className="row text-center text-white py-5 z-1">
                    <h1>blog</h1>
                </div>
                <div className="vector-5">
                    <Image src="/images/svg/vector-5.svg" fill objectFit="cover" alt="Example Image" />
                </div>
            </div>

            <section className="blog bg-dark-6 text-white font-open-sans-hebrew pt-5">
                <div className="row px-3 px-md-5 fs-4 text-decoration-none py-5 w-100">
                    <Breadcrumb />
                </div>
                <div className="row text-center py-3 fs-1 w-100">
                    <h1 className="text-white font-open-sans-hebrew">blog</h1>
                </div>
                <div className="container">
                    <div className="row">
                        {blog.length > 0 ? (
                            blog.map((blog) => (
                                <div key={blog.id} className="col-xxl-4 col-md-6 mb-4 px-5 px-lg-2 d-flex align-items-stretch">
                                    <a 
                                        href={`/blog/read/${blog.title}`}
                                        className="card m-auto rounded-0 bg-dark-5 text-white font-open-sans-hebrew w-100 h-100 d-flex flex-column text-decoration-none">
                                        <figure className="card-img-top">
                                            {/* Menggunakan Next.js Image component dengan prop yang benar */}
                                            <Image
                                                src={`${baseUrl}${blog.thumbnail}`}
                                                alt={blog.title}
                                                layout="fill"
                                                objectFit="cover"
                                                loading="lazy"
                                            />
                                        </figure>
                                        <div className="px-3 pb-3">
                                            <h2 className="font-open-sans-hebrew fw-bold">{blog.title}</h2>
                                            <p className="text-justify">
                                                {extractParagraphs(blog.content)}{blog.content.split(' ').length > 30 && ' ...'}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No blog available</p>
                        )}
                    </div>
                </div>
                <div className="vector-3 mt-5">
					<Image src="/images/svg/vector-3.svg" alt="background" fill objectFit="cover" />
				</div>
            </section>

            <Contact />
            <Footer />
        </>
    );
}
