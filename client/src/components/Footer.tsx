export default function FooterComponent() {
  return (
    <footer className="py-3 bg-secondary text-light">
      <ul className="nav justify-content-center border-bottom pb-2 mb-2">
        <li className="nav-item">
          <a
            href="#"
            className="nav-link px-2 text-white"
            onClick={(e) => e.preventDefault()}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link px-2 text-white"
            onClick={(e) => e.preventDefault()}
          >
            Features
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link px-2 text-white"
            onClick={(e) => e.preventDefault()}
          >
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link px-2 text-white"
            onClick={(e) => e.preventDefault()}
          >
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#"
            className="nav-link px-2 text-white"
            onClick={(e) => e.preventDefault()}
          >
            About
          </a>
        </li>
      </ul>
      <p className="text-center">&#169; 2025 Chat-App, Inc</p>
    </footer>
  );
}
