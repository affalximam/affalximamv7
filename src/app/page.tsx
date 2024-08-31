"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTypewriter } from 'react-simple-typewriter';
import Navbar from '../components/navbar';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Image from 'next/image';

interface Service {
	id: number;
	name: string;
	icons: string;
	description: string;
	whatsapp: string;
  }

	const baseUrl = 'http://localhost';
	
export default function Home() {

	const [profileDescription, setProfileDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [services, setServices] = useState([]);

	const [text] = useTypewriter({
		words: ['Software Development', 'Pentester', 'IT Network'],
		loop: 0,
	});

	// Simpan token yang Anda dapatkan
	const token = '5|LCnDQN8NzzlrTprlBObqAZokdizIY1yQZsAGWEWL410f4c93';

	useEffect(() => {
        // Fetch profile image
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/about-me/profile%20image`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const imagePath = response.data.data.result;
                setImageUrl(`${baseUrl}${imagePath}`);
                console.log(setImageUrl);
            } catch (error) {
                console.error('Failed to fetch profile image:', error);
            }
        };

        fetchProfileImage();
    }, [token]);

    useEffect(() => {
        // Fetch profile description
        const fetchProfileDescription = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/about/about-me/profile%20description`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                let description = response.data.data.result.content;
				const words = description.split(' ');
                if (words.length > 50) {
                    description = words.slice(0, 75).join(' ') + ' . . .';
                }
                setProfileDescription(description);
            } catch (error) {
				console.error('Failed to fetch profile description:', error);
            }
        };
		
        fetchProfileDescription();
    }, [token]);

	useEffect(() => {
		const fetchServices = async () => {
		try {
			const response = await axios.get(`${baseUrl}/api/services/read/desc/2`, {
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
	}, []);

	return (
		<>
			<Navbar />
			<section className="jumbotron bg-dark-1 d-flex flex-column justify-content-center align-items-center">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-font-open-sans-hebrew fw-bolder fst-italic text-white">HII THERE!</h1>
							<h1 className="font-font-open-sans-hebrew fw-bolder fst-italic text-white">I&apos;m <span>affalximam</span></h1>
							<h2 className="font-font-open-sans-hebrew fw-bolder fst-italic text-white lh-base d-block mb-4">
								{text} 
							</h2>
							<div className="row d-flex flex-row social-link my-3">
								<a href="#" className="w-auto text-white"><i className="bi bi-github"></i></a>
								<a href="#" className="w-auto text-white"><i className="bi bi-instagram"></i></a>
								<a href="#" className="w-auto text-white"><i className="bi bi-linkedin"></i></a>
								<a href="#" className="w-auto text-white"><i className="bi bi-youtube"></i></a>
							</div>
							<a className="btn btn-lg btn-outline-light bg-transparent rounded-0">view more <i className="bi bi-arrow-down"></i></a>
						</div>
					</div>
				</div>
				<figure className="profile">
					{imageUrl && (
						<Image
							src={imageUrl}
							alt="Profile Image"
							fill
							style={{ objectFit: 'cover' }}
						/>
					)}
				</figure>
				<div className="vector-1">
					<Image src="/images/svg/vector-1.svg" fill objectFit="cover" alt="Example Image" />
				</div>
			</section>
			<section className="home-about bg-dark-2 text-white font-open-sans-hebrew py-5">
				<div className="container">
					<div className="row py-5">
						<h2 className="text-center fw-bolder">about me</h2>
					</div>
					<div className="row pb-5">
						<p className='fs-4'>{profileDescription}</p>
						<a href="#" className="btn btn-lg btn-outline-light bg-transparent rounded-0 w-auto px-5 py-3 fs-4">view more</a>
					</div>
				</div>
			</section>
			<section className="home-services bg-dark-3 text-white text-center py-5">
				<div className="container">
					<div className="row py-5">
						<h2>Services</h2>
					</div>
					<div className="row pb-5">
						{services.map((service) => (
							<div
							key={service.id} // Pindahkan properti key ke elemen div terluar
							className="col-lg-4 py-3 px-lg-2 px-md-5 px-5"
							>
							<a
								className="card bg-dark-4 text-white text-decoration-none py-5 px-5 col-12 col-md-6 w-100"
								href={service.whatsapp} // Opsional: Gunakan link WhatsApp jika diperlukan
							>
								<figure className="home-services-icons m-auto rounded-2 align-content-center">
								<div dangerouslySetInnerHTML={{ __html: service.icons }} />
								</figure>
								<h3 className="my-3">{service.name}</h3>
								<p>{service.description}</p>
							</a>
							</div>
						))}
						<div className="col-lg-4 py-3 px-lg-2 px-md-5 px-5">
							<a className="card bg-dark-4 text-white text-decoration-none py-5 px-5">
								<i className="bi bi-arrow-right color-gold-1 m-auto rounded-2"></i>
								<h3 className="my-3">More</h3>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, ullam.</p>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="home-project bg-dark-2 py-5 text-white text-center">
				<div className="container">
					<div className="row py-5">
						<h2 className="fw-bolder font-open-sans-hebrew">Latest Project</h2>
					</div>
					<div className="row">
						<div className="col-lg-4 mb-4 px-5 px-lg-2">
							<div className="card m-auto rounded-0 bg-transparent text-white font-open-sans-hebrew">
								<figure className="card-img-top">
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-content d-flex flex-column justify-content-center align-content-center">
									<h3 className="mb-0">Project 3</h3>
									<a href="" className="btn btn-md btn-outline-light bg-transparent text-white w-50 m-auto rounded-4 my-2">View Detail</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-4 px-5 px-lg-2">
							<div className="card m-auto rounded-0 bg-transparent text-white font-open-sans-hebrew">
								<figure className="card-img-top">
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-content d-flex flex-column justify-content-center align-content-center">
									<h3 className="mb-0">Project 3</h3>
									<a href="" className="btn btn-md btn-outline-light bg-transparent text-white w-50 m-auto rounded-4 my-2">View Detail</a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-4 px-5 px-lg-2">
							<div className="card m-auto rounded-0 bg-transparent text-white font-open-sans-hebrew">
								<figure className="card-img-top">
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-content d-flex flex-column justify-content-center align-content-center">
									<h3 className="mb-0">Project 3</h3>
									<a href="" className="btn btn-md btn-outline-light bg-transparent text-white w-50 m-auto rounded-4 my-2">View Detail</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="home-blog bg-dark-3 text-white font-open-sans-hebrew">
				<div className="vector-2">
					<Image src="/images/svg/vector-2.svg" alt="background" fill objectFit="cover" />
				</div>
				<div className="container">
					<div className="row py-5">
						<h2 className="fw-bolder font-open-sans-hebrew text-center">Blog</h2>
					</div>
					<div className="row">
						<div className="col-lg-4 mb-4">
							<a href='' className="card p-0 bg-dark-5 text-white text-decoration-none">
								<figure className="card-img-top">
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-body">
									<h3 className="card-title fs-5">Mengenal BreachForums, Blackmarket tempat hacker menjual data hasil peretasan.</h3>
									<p className="card-text fs-6">Breached forum adalah forum online sebagai tempat publikasi, penjualan serta pembelian data hasil peretasan. Data yang di publikasi bisa berupa dump database yang biasanya berisi informasi penting seperti data pribadi penduduk, nomor telepon sampai data rahasia negara tersedia disini . . .</p>
									<p className="card-text fs-6">affalximam - 26 Juli 2024</p>
								</div>
							</a>
						</div>
						<div className="col-lg-4 mb-4">
							<a href='' className="card p-0 bg-dark-5 text-white text-decoration-none">
								<figure className="card-img-top">
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-body">
									<h3 className="card-title fs-5">Mengenal BreachForums, Blackmarket tempat hacker menjual data hasil peretasan.</h3>
									<p className="card-text fs-6">Breached forum adalah forum online sebagai tempat publikasi, penjualan serta pembelian data hasil peretasan. Data yang di publikasi bisa berupa dump database yang biasanya berisi informasi penting seperti data pribadi penduduk, nomor telepon sampai data rahasia negara tersedia disini . . .</p>
									<p className="card-text fs-6">affalximam - 26 Juli 2024</p>
								</div>
							</a>
						</div>
						<div className="col-lg-4 mb-4">
							<a href='' className="card p-0 bg-dark-5 text-white text-decoration-none">
								<figure className="card-img-top">
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" fill objectFit="cover" />
								</figure>
								<div className="card-body">
									<h3 className="card-title fs-5">Mengenal BreachForums, Blackmarket tempat hacker menjual data hasil peretasan.</h3>
									<p className="card-text fs-6">Breached forum adalah forum online sebagai tempat publikasi, penjualan serta pembelian data hasil peretasan. Data yang di publikasi bisa berupa dump database yang biasanya berisi informasi penting seperti data pribadi penduduk, nomor telepon sampai data rahasia negara tersedia disini . . .</p>
									<p className="card-text fs-6">affalximam - 26 Juli 2024</p>
								</div>
							</a>
						</div>
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