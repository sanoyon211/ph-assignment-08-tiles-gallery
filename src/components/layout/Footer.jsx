import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from 'react-icons/fa';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tighter">
              TILE<span className="text-primary">GALLERY</span>
            </h2>
            <p className="text-sm leading-relaxed opacity-80">
              Discover the finest collection of artistic tiles that transform
              your spaces into masterpieces. Quality craftsmanship meets modern
              design.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaGithub].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ),
              )}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">
              Quick Explore
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/all-tiles"
                  className="hover:text-primary transition-colors"
                >
                  Artistic Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span>123 Design Street, Creative District, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-primary" />
                <span>hello@tilegallery.com</span>
              </li>
            </ul>
          </div>
          {/* Newsletter Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest text-sm">
              Join Our Newsletter
            </h3>
            <p className="text-xs mb-6 opacity-70">
              Get the latest design trends and collection updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-800 border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-2.5 rounded-lg hover:bg-secondary transition-colors">
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium opacity-50 uppercase tracking-widest">
          <p>
            &copy; {new Date().getFullYear()} Tile Gallery. Crafted for
            perfection.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
