"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar-2';
import Breadcrumb from '../../components/breadcrumb';
import Contact from '../../components/contact';
import Footer from '../../components/footer';
import Image from 'next/image';

const token = process.env.NEXT_PUBLIC_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Services() {
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
		const fetchServices = async () => {
		try {
			const response = await axios.get(`${baseUrl}/api/services/read/desc`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data.success) {
			setServices(response.data.data);
			}
		} catch (error) {
			console.error('Failed to fetch services:', error);
		}
		};

		fetchServices();
	}, [token]);

    return (
        <>
            <Navbar />
            <div className="jumbotron-2 jumbotron-services d-flex justify-content-center align-items-center">
                <div className="vector-4">
                    <Image src="/images/svg/vector-4.svg" fill objectFit="cover" alt="Example Image" />
                </div>
                <div className="row text-center text-white py-5 z-1">
                    <h1>services</h1>
                </div>
                <div className="vector-5">
                    <Image src="/images/svg/vector-5.svg" fill objectFit="cover" alt="Example Image" />
                </div>
            </div>

            <section className="services bg-dark-6 text-white font-open-sans-hebrew py-5">
                <div className="row px-3 px-md-5 fs-4 text-decoration-none py-5 w-100">
                    <Breadcrumb />
                </div>
                <div className="row text-center py-3 fs-1 w-100">
                    <h1 className="text-white font-open-sans-hebrew">services</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="row">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <div key={service.id} className="col-lg-4 py-3 px-lg-2 px-md-5 px-5 d-flex align-items-stretch">
                                        <div className="card bg-dark-4 text-white text-decoration-none py-5 px-5 col-12 col-md-6 w-100 h-100 d-flex flex-column">   
                                            <figure className="services-icons m-auto rounded-2 align-content-center">
                                                <Image src={`${baseUrl}${service.icons}`}
                                                fill alt="Example Image"
                                                objectFit='cover'/>
                                            </figure>
                                            <h3 className="my-3 text-center">{service.name}</h3>
                                            <p className="flex-grow-1">{service.description}</p>
                                            <div className="row">
                                                {service.whatsapp && (
                                                    <div className="col-4">
                                                   <a href={service.whatsapp} className="btn btn-sm btn-success w-100">Whatsapp</a>
                                                </div>
                                                )}
                                                {service.telegram && (
                                                    <div className="col-4">
                                                        <a href={service.telegram} className="btn btn-sm btn-primary w-100">Telegram</a>
                                                    </div>
                                                )}
                                                {service.instagram && (
                                                    <div className="col-4">
                                                        <a href={service.instagram} className="btn btn-sm btn-primary w-100">Instagram</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>						  
                                ))
                            ) : (
                                <p>No Service Available</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

			<Contact />
			<Footer />
        </>
    );
}
