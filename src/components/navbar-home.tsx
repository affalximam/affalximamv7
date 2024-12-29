export default function navbar() {
    return (
		<nav className="navbar navbar-home navbar-expand-lg navbar-dark text-white px-lg-5 py-0">
            <div className="container-fluid">
                <a className="navbar-brand font-open-sans-hebrew fw-bolder" href="#">affalximam</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end text-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="/home">home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="/about">about</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="/services">services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="/project">project</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="/blog">blog</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-open-sans-hebrew fw-bold" href="#contact">contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}