"use client";
import React from 'react';
import { useTypewriter} from 'react-simple-typewriter';
import Navbar from '../components/navbar';
import Contact from '../components/contact';
import Footer from '../components/footer'
import Image from 'next/image';

export default function Home() {

	const [text] = useTypewriter({
		words: ['Software Development', 'Pentester', 'IT Network'],
		loop: 0,
	});

	return (
		<>
			<Navbar />
			<section className="jumbotron bg-dark-1 d-flex flex-column justify-content-center align-items-center">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-font-open-sans-hebrew fw-bolder fst-italic text-white">HII THERE!</h1>
							<h1 className="font-font-open-sans-hebrew fw-bolder fst-italic text-white">&apos;I&apos;m &lt;span&gt;affalximam&lt;/span&gt;</h1>
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
					<Image src="/images/webp/me-1.webp" alt="" layout="fill" objectFit="cover"/>
				</figure>
				<div className="vector-1">
					<Image src="/images/svg/vector-1.svg" alt="background" layout="fill" objectFit="cover" />
				</div>
			</section>
			<section className="home-about bg-dark-2 text-white font-open-sans-hebrew py-5">
				<div className="container">
					<div className="row py-5">
						<h2 className="text-center fw-bolder">about me</h2>
					</div>
					<div className="row pb-5">
						<p className='fs-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet ante diam. Pellentesque porttitor vehicula nibh at venenatis. Suspendisse imperdiet turpis libero, ut fermentum mauris posuere nec. Quisque accumsan velit ut sem varius, ac pulvinar mi vulputate. Pellentesque tempus elit quam, in consectetur nunc mattis eu. Mauris pharetra ante id suscipit accumsan. Aenean bibendum lobortis quam, eget ullamcorper nulla. Nullam sed dolor nec dui fringilla semper   . . . .</p>
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
						<div className="col-lg-4 py-3 px-lg-2 px-md-5 px-5">
							<a className="card bg-dark-4 text-white text-decoration-none py-5 px-5">
								<i className="bi bi-pencil-fill color-gold-1 m-auto rounded-2"></i>
								<h3 className="my-3">Writing</h3>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, enim.</p>
							</a>
						</div>
						<div className="col-lg-4 py-3 px-lg-2 px-md-5 px-5">
							<a className="card bg-dark-4 text-white text-decoration-none py-5 px-5">
								<i className="bi bi-gear-wide-connected color-gold-1 m-auto rounded-2"></i>
								<h3 className="my-3">Development</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, totam?</p>
							</a>
						</div>
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
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" layout="fill" objectFit="cover" />
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
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" layout="fill" objectFit="cover" />
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
									<Image src="/images/png/port-AFFALXIMAM-V4.png" alt="" layout="fill" objectFit="cover" />
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
					<Image src="/images/svg/vector-2.svg" alt="background" layout="fill" objectFit="cover" />
				</div>
				<div className="container">
					<div className="row py-5">
						<h2 className="fw-bolder font-open-sans-hebrew text-center">Blog</h2>
					</div>
					<div className="row">
						<div className="col-lg-4 mb-4">
							<a href='' className="card p-0 bg-dark-5 text-white text-decoration-none">
								<figure className="card-img-top">
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" layout="fill" objectFit="cover" />
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
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" layout="fill" objectFit="cover" />
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
									<Image src="/images/png/image-1.png" className="card-Image-top" alt="" layout="fill" objectFit="cover" />
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
					<Image src="/images/svg/vector-3.svg" alt="background" layout="fill" objectFit="cover" />
				</div>
			</section>
			<Contact />
			<Footer />
		</>
	);
}