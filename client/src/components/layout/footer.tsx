import { Link } from "wouter";

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
              <li>123 Beauty Lane</li>
              <li>Los Angeles, CA 90001</li>
              <li>info@briartistry.com</li>
              <li>(555) 123-4567</li>
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
          <p>&copy; 2024 BriArtistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
