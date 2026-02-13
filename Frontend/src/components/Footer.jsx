import { Link } from "react-router";

function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="hover:text-sky-700">Home</Link>
          <Link to="/services" className="hover:text-sky-700">Services</Link>
          <Link to="/contact" className="hover:text-sky-700">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
