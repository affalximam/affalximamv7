"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Navbar from '../../components/navbar-2';
import Breadcrumb from '../../components/breadcrumb';
import Contact from '../../components/contact';
import Footer from '../../components/footer';
import Image from 'next/image';

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function About() {
    const [profileDescription, setProfileDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [Skills, setSkills] = useState<any[]>([]);
    const [columns, setColumns] = useState([
        { id: 'col1', content: 'Profile Description', type: 'profileDescription' },
        { id: 'col2', content: 'Profile Image', type: 'profileImage' },
        { id: 'col3', content: 'Skills', type: 'skills' },
    ]);
    const [CertCourse, setCertCourse] = useState<any[]>([]);
    const [CertOrganization, setCertOrganization] = useState<any[]>([]);
    const [CertChampions, setCertChampions] = useState<any[]>([]);


    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/about-me/profile%20image`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const imagePath = response.data.data.result;
                setImageUrl(`${baseUrl}${imagePath}`);
            } catch (error) {
                console.error('Failed to fetch profile image:', error);
            }
        };
        fetchProfileImage();
        const intervalId = setInterval(fetchProfileImage, 30000); 
        return () => clearInterval(intervalId);
    }, [token]);

useEffect(() => {
    const fetchProfileDescription = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/about/about-me/profile%20description`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let description = response.data.data.result.content;
            setProfileDescription(description);
        } catch (error) {
            console.error('Failed to fetch profile description:', error);
        }
    };
    fetchProfileDescription();
    const intervalId = setInterval(fetchProfileDescription, 30000); 
        return () => clearInterval(intervalId);
}, [token]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/skills-icons`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSkills(response.data.data.result);
            } catch (error) {
                console.error('Failed to fetch Skills:', error);
            }
        };
        fetchSkills();
        const intervalId = setInterval(fetchSkills, 30000); 
        return () => clearInterval(intervalId);
    }, [token]);

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(columns);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setColumns(items);
    };

    useEffect(() => {
        const fetchCertCourse = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/certificate/read/desc/certificate-course`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCertCourse(response.data.data.result);
            } catch (error) {
                console.error('Failed to fetch CertCourse:', error);
            }
        };
        fetchCertCourse();
        const intervalId = setInterval(fetchCertCourse, 30000); 
        return () => clearInterval(intervalId);
    }, [token]);

    useEffect(() => {
        const fetchCertOrganization = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/certificate/read/desc/certificate-organization`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCertOrganization(response.data.data.result);
            } catch (error) {
                console.error('Failed to fetch CertOrganization:', error);
            }
        };
        fetchCertOrganization();
        const intervalId = setInterval(fetchCertOrganization, 30000); 
        return () => clearInterval(intervalId);
    }, [token]);

    useEffect(() => {
        const fetchCertChampions = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/certificate/read/desc/certificate-champions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCertChampions(response.data.data.result);
            } catch (error) {
                console.error('Failed to fetch Cert champions:', error);
            }
        };
        fetchCertChampions();
        const intervalId = setInterval(fetchCertChampions, 30000); 
        return () => clearInterval(intervalId);
    }, [token]);

    useEffect(() => {
        const modal = document.getElementById('imageModal') as HTMLDivElement;
        const modalImg = document.getElementById('modalImage') as HTMLImageElement;
        const closeBtn = document.getElementById('closeBtn') as HTMLSpanElement;
    
        if (modal && modalImg && closeBtn) {
          // Buka modal saat gambar diklik
          document.querySelectorAll('.modal-trigger').forEach(item => {
            item.addEventListener('click', (event: Event) => {
              const imgElement = event.target as HTMLImageElement;
              if (imgElement) {
                modal.style.display = 'flex';
                modalImg.src = imgElement.getAttribute('data-src')!;
              }
            });
          });
    
          // Tutup modal saat tombol "X" diklik
          closeBtn.onclick = () => {
            modal.style.display = 'none';
          };
    
          // Bersihkan event listener saat komponen dibongkar
          return () => {
            document.querySelectorAll('.modal-trigger').forEach(item => {
              item.removeEventListener('click', () => {});
            });
          };
        }
      }, [CertCourse]);

    return (
        <>
            <Navbar />
            <div className="jumbotron-2 jumbotron-about d-flex justify-content-center align-items-center">
                <div className="vector-4">
                    <Image src="/images/svg/vector-4.svg" fill objectFit="cover" alt="Example Image" />
                </div>
                <div className="row text-center text-white py-5 z-1">
                    <h1>about</h1>
                </div>
                <div className="vector-5">
                    <Image src="/images/svg/vector-5.svg" fill objectFit="cover" alt="Example Image" />
                </div>
            </div>

            <section className="about-me bg-dark-6 text-white font-open-sans-hebrew py-5">
                <div className="row px-3 px-md-5 fs-4 text-decoration-none py-5 w-100">
                    <Breadcrumb />
                </div>
                <div className="row text-center py-3 fs-1 w-100">
                    <h1 className="text-white font-open-sans-hebrew">about me</h1>
                </div>
                <div className="container">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="columns" direction="horizontal">
                            {(provided) => (
                                <div className="row" {...provided.droppableProps} ref={provided.innerRef}>
                                    {columns.map((col, index) => (
                                        <Draggable key={col.id} draggableId={col.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className='col-xl-4 d-flex align-items-stretch'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {col.type === 'profileDescription' && (
                                                        <>
                                                            <div className="card w-100 p-2 rounded-2 bg-dark-6">
                                                                <p className="text-justify fs-4 text-white">
                                                                    {profileDescription}
                                                                </p>
                                                            </div>
                                                        </>
                                                    )}
                                                    {col.type === 'profileImage' && (
                                                        <>
                                                            <div className="card w-100 p-2 rounded-2 bg-dark-6">
                                                                <figure className='about-me-profile-image'>
                                                                    {imageUrl && (
                                                                        <Image
                                                                            src={imageUrl}
                                                                            alt="Profile Image"
                                                                            fill
                                                                            style={{ objectFit: 'cover' }}
                                                                            loading='eager'
                                                                        />
                                                                    )}
                                                                </figure>
                                                            </div>
                                                        </>
                                                    )}
                                                    {col.type === 'skills' && (
                                                        <>
                                                            <div className="card w-100 p-2 rounded-2 bg-dark-6">
                                                                <div className="row text-center fs-2 pb-5">
                                                                    <h3 className="text-white">Skills</h3>
                                                                </div>
                                                                <div className="row">
                                                                    {Skills.length > 0 ? (
                                                                        Skills.map((skill) => (
                                                                            <div key={skill.id} className="col-3">
                                                                                <figure className="skills-icons">
                                                                                    <Image
                                                                                        src={`${baseUrl}${skill.content}`}
                                                                                        alt={skill.name}
                                                                                        fill
                                                                                        style={{ objectFit: 'cover' }}
                                                                                        loading="lazy"
                                                                                    />
                                                                                </figure>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <p>No Skill Available</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </section>

            <section className="certificate bg-dark-3 pt-5">
                <div className="container">

                    <div className="row text-center text-white py-5 fs-2">
                        <h2>course certificates</h2>
                    </div>
                    <div className="row py-3">
                        {CertCourse.length > 0 ? (
                            CertCourse.map((CertCourseDetails) => (
                                <div key={CertCourseDetails.id} className="col-xl-3 col-lg-4 col-6">
                                    <figure className="bg-secondary">
                                        <Image
                                            className="modal-trigger"
                                            src={`${baseUrl}${CertCourseDetails.content}`}
                                            alt={CertCourseDetails.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                            data-src={`${baseUrl}${CertCourseDetails.content}`} // Tambahkan data-src
                                        />
                                    </figure>
                                </div>
                            ))
                        ) : (
                            <p className='text-center text-white'>Not Available</p>
                        )}
                    </div>

                    <div className="row text-center text-white py-5 fs-2">
                        <h2>course organization</h2>
                    </div>
                    <div className="row py-3">
                        {CertOrganization.length > 0 ? (
                            CertOrganization.map((CertOrganizationDetails) => (
                                <div key={CertOrganizationDetails.id} className="col-xl-3 col-lg-4 col-6">
                                     <figure className="bg-secondary">
                                        <Image
                                            className="modal-trigger"
                                            src={`${baseUrl}${CertOrganizationDetails.content}`}
                                            alt={CertOrganizationDetails.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                            data-src={`${baseUrl}${CertOrganizationDetails.content}`} // Tambahkan data-src
                                        />
                                    </figure>
                                </div>
                            ))
                        ) : (
                            <p className='text-center text-white'>Not Available</p>
                        )}
                    </div>

                    <div className="row text-center text-white py-5 fs-2">
                        <h2>champions certificates</h2>
                    </div>
                    <div className="row py-3">
                        {CertChampions.length > 0 ? (
                            CertChampions.map((CertChampionsDetails) => (
                                <div key={CertChampionsDetails.id} className="col-xl-3 col-lg-4 col-6">
                                    <figure className="bg-secondary">
                                        <Image
                                            className="modal-trigger"
                                            src={`${baseUrl}${CertChampionsDetails.content}`}
                                            alt={CertChampionsDetails.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                            data-src={`${baseUrl}${CertChampionsDetails.content}`} // Tambahkan data-src
                                        />
                                    </figure>
                                </div>
                            ))
                        ) : (
                            <p className='text-center text-white'>Not Available</p>
                        )}
                    </div>

                    {/* Modal Gambar */}
                    <div id="imageModal" className="modal" style={{ display: 'none' }}>
                        <span id="closeBtn" className="close z-1">&times;</span>
                        <Image
                            id="modalImage"
                            src=""
                            alt=""
                            layout="fill"
                            objectFit="contain"
                            className='modal-content bg-transparent'
                        />
                    </div>
                </div>
                <div className="vector-3">
					<Image src="/images/svg/vector-3.svg" alt="background" fill objectFit="cover" />
				</div>
			</section>
			<Contact />
			<Footer />
        </>
    );
}
function fetchProfileImage(): void {
    throw new Error('Function not implemented.');
}

