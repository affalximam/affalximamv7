export default function contact() {
    return (
        <section className="contact py-5 font-open-sans-hebrew text-white">
            <div className="container">
                <div className="row py-5">
                    <h2 className="text-center fw-bolder">Contact Me</h2>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-xl-2">
                        <div className="row">
                            <div className="col-lg-12 col-md-4 col-4">
                                <div className="card bg-transparent text-white text-center">
                                    <a href="" className="text-black bg-gold-1 rounded-5 m-auto d-flex flex-row justify-content-center align-items-center align-content-center">
                                        <i className="bg bi-geo-alt p-0 m-0"></i>
                                    </a>
                                    <h3 className="mt-2">Address</h3>
                                    <p>Kalibening, Banjarnegara, Jawa Tengah, Indonesia</p>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-4 col-4">
                                <div className="card bg-transparent text-white text-center">
                                    <a href="" className="text-black bg-gold-1 rounded-5 m-auto d-flex flex-row justify-content-center align-items-center align-content-center">
                                        <i className="bg bi-telephone p-0 m-0"></i>
                                    </a>
                                    <h3 className="mt-2">Phone</h3>
                                    <p>+62 859 7317 0278</p>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-4 col-4">
                                <div className="card bg-transparent text-white text-center">
                                    <a href="" className="text-black bg-gold-1 rounded-5 m-auto d-flex flex-row justify-content-center align-items-center align-content-center">
                                        <i className="bg bi-send p-0 m-0"></i>
                                    </a>
                                    <h3 className="mt-2">Email</h3>
                                    <p>affalximam@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-xl-10">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-floating mb-3">
                                    <label for="floatingInput bg-transparent" className="label-input-nama">Nama</label>
                                    <input type="text" className="form-control bg-transparent rounded-2 text-white input-nama" id="floatingInput" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-floating mb-3">
                                    <label for="floatingInput bg-transparent" className="label-input-email">Email</label>
                                    <input type="email" className="form-control bg-transparent rounded-2 text-white input-email" id="floatingInput" placeholder="email@example.com" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-floating mb-3">
                                    <label for="floatingInput bg-transparent" className="label-input-subject">Subject</label>
                                    <input type="text" className="form-control bg-transparent rounded-2 text-white input-subject" id="floatingInput" placeholder="Subject" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div class="form-floating mb-3">
                                    <label for="floatingTextarea" className="label-textarea-message">Message</label>
                                    <textarea class="form-control bg-transparent rounded-2 text-white textarea-message" placeholder="Message" id="floatingTextarea"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 offset-6 col-lg-3 offset-lg-9">
                                <button className="btn btn-lg bg-gold-1 w-100 text-white">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}