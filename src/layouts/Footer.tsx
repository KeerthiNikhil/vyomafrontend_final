import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
<footer className="bg-blue-900 text-gray-200">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-4">
            VYOMA
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            VYOMA is a multi-vendor e-commerce platform connecting trusted
            local and branded shops for a seamless shopping experience.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-white cursor-pointer">
              Returns & Refunds
            </li>
            <li className="hover:text-white cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-white font-semibold mb-4">We Operate In</h3>
          <ul className="space-y-2 text-sm">
            <li>Mangalore</li>
            <li>Surathkal</li>
            <li>Udupi</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} VYOMA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
