import { Link } from 'react-router-dom';
import { UtensilsCrossed, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PlateIQ</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI-powered restaurant review intelligence. Transform raw feedback into smart menu decisions and revenue growth.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors text-xs font-bold text-gray-300">
                𝕏
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Dashboard', 'API'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 mb-10 text-center">
          <h3 className="text-white text-2xl font-bold mb-2">Ready to transform your reviews?</h3>
          <p className="text-purple-100 text-sm mb-5">
            Join 500+ restaurants already using PlateIQ to grow smarter.
          </p>
          <Link
            to="/auth"
            className="inline-block px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors shadow-lg"
          >
            Start Free Today
          </Link>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2025 PlateIQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
