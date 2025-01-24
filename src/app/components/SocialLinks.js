import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export default function SocialLinks() {
  return (
    <div className="flex justify-center mt-6 space-x-6">
      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
      >
        <FaFacebookF size={20} className="text-white" />
      </a>

      {/* X (anteriormente Twitter) */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 transition-colors duration-300"
      >
        <RxCross1 size={20} className="text-white" />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors duration-300"
      >
        <FaInstagram size={20} className="text-white" />
      </a>

      {/* TikTok */}
      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-gray-700 transition-colors duration-300"
      >
        <FaTiktok size={20} className="text-white" />
      </a>
    </div>
  );
}
