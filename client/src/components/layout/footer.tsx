import { Link } from "wouter";
import { SiFacebook, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BriArtistry</h3>
            <p className="text-gray-600">
              Professional makeup and hair styling services for all occasions.
            </p>
            <div className="mt-4 flex gap-4">
              <a 
                href="https://www.facebook.com/briartistryinfo/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/briartistryglam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#gallery">Gallery</Link></li>
              <li><Link href="/#testimonials">Testimonials</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>4203 Portage st</li>
              <li>Kalamazoo, MI 49001</li>
              <li>
                <a href="mailto:briartistryinfo@gmail.com" className="hover:text-primary">
                  briartistryinfo@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:2693644407" className="hover:text-primary">
                  (269) 364-4407
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Mon-Fri: 9am - 7pm</li>
              <li>Saturday: 9am - 5pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-500">
          <p className="mb-2">Find us on instagram @briartistryglam</p>
          <p>&copy; {new Date().getFullYear()} BriArtistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}