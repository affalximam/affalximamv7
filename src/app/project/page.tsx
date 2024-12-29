"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar-2';
import Breadcrumb from '../../components/breadcrumb';
import Contact from '../../components/contact';
import Footer from '../../components/footer';
import Image from 'next/image';

const baseUrl = 'http://127.0.0.1:8000';


export default function Project() {
    const [projects, setProjects] = useState<any[]>([]);
    const [perPage, setPerPage] = useState<number>(0);
    const [totalProjects, setTotalProjects] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1); // Default page = 1

    const token = '9|IC2PgkGWEZhQxkrfQz0t4W0Jz8tRKgU88QzhLMXFc7c69427';

    useEffect(() => {
        const fetchProjects = async (page: number) => {
            try {
                const response = await axios.get(`${baseUrl}/api/project/read/desc/12/${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    const projectData = response.data.data;
                    setProjects(projectData.data); // Project array
                    setPerPage(projectData.per_page); // Items per page
                    setTotalProjects(projectData.total); // Total projects
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
    
        // Fetch initial data based on current page
        fetchProjects(currentPage);
    
        // Set interval with passing current page as argument
        const intervalId = setInterval(() => fetchProjects(currentPage), 20000); 
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentPage, token]);

    // Calculate total pages based on totalProjects and perPage, ensuring values are valid
    const totalPages = perPage > 0 ? Math.ceil(totalProjects / perPage) : 0;

    // Handlers for pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    return (
        <>
            <Navbar />
            <div className="jumbotron-2 jumbotron-project d-flex justify-content-center align-items-center">
                <div className="vector-4">
                    <Image src="/images/svg/vector-4.svg" fill objectFit="cover" alt="Example Image" />
                </div>
                <div className="row text-center text-white py-5 z-1">
                    <h1>project</h1>
                </div>
                <div className="vector-5">
                    <Image src="/images/svg/vector-5.svg" fill objectFit="cover" alt="Example Image" />
                </div>
            </div>

            <section className="project bg-dark-6 text-white font-open-sans-hebrew pt-5">
                <div className="row px-3 px-md-5 fs-4 text-decoration-none py-5 w-100">
                    <Breadcrumb />
                </div>
                <div className="row text-center py-3 fs-1 w-100">
                    <h1 className="text-white font-open-sans-hebrew">project</h1>
                </div>
                <div className="container">
                    <div className="row">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project.id} className="col-xxl-3 col-lg-4 col-sm-6 mb-4 px-5 px-lg-2 d-flex align-items-stretch">
                                    <div className="card m-auto rounded-0 bg-dark-5 text-white font-open-sans-hebrew w-100 h-100 d-flex flex-column">
                                        <figure className="card-img-top">
                                            {/* Menggunakan Next.js Image component dengan prop yang benar */}
                                            <Image
                                                src={`${baseUrl}${project.images}`}
                                                alt={project.name}
                                                layout="fill"
                                                objectFit="cover"
                                                loading="lazy"
                                            />
                                        </figure>
                                        <div className="ps-3 pb-3">
                                            <h2 className="font-open-sans-hebrew fw-bold">{project.name}</h2>
                                            <p>{project.description}</p>
                                            {project.preview_link && (
                                                <a href={project.preview_link} className="btn btn-sm text-white me-2">
                                                    Preview <i className="bi bi-play"></i>
                                                </a>
                                            )}
                                            {project.github_link && (
                                                <a href={project.github_link} className="btn btn-sm text-white">
                                                    GitHub <i className="bi bi-github"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No project available</p>
                        )}
                    </div>
                    <div className="row project-pageinaction d-flex justify-content-center mt-5">
                        <a
                            className={`w-auto mx-2 btn btn-md bg-gold-1 bg-gold-1-hover border-2 border-light text-white`}
                            onClick={(e) => {
                                if (currentPage > 1) {
                                    e.preventDefault();
                                    handlePrevPage();
                                }
                            }}
                        >
                            <i className="bi bi-chevron-double-left"></i> prev
                        </a>


                        {[...Array(totalPages)].map((_, index) => (
                            <a
                                key={index + 1}
                                href={`/project/${index + 1}`}
                                className={`w-auto mx-2 btn btn-md ${currentPage === index + 1 ? 'bg-gold-1 bg-gold-1-hover border-2 border-light text-white' : 'bg-transparent border-2 border-gold-1 border-gold-1-hover text-white'
                                    }`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </a>
                        ))}

                        {currentPage >= totalPages && (
                            <a
                                className={`w-auto mx-2 btn btn-md bg-gold-1 bg-gold-1-hover border-2 border-light text-white`}
                                >
                                next <i className="bi bi-chevron-double-right"></i>
                            </a>
                        )}

                        {currentPage < totalPages && (
                            <a
                                href={`/project/${currentPage + 1}`}
                                className={`w-auto mx-2 btn btn-md bg-transparent border-2 border-gold-1 border-gold-1-hover text-white`}
                                >
                                next <i className="bi bi-chevron-double-right"></i>
                            </a>
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
