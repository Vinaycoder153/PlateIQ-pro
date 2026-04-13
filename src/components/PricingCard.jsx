import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingCard({ tier, price, description, features, highlighted, cta }) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? 'bg-gradient-to-b from-purple-600 to-blue-700 text-white shadow-2xl shadow-purple-500/30 scale-105'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg'
      }`}
    >
      {highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow">
          Most Popular
        </span>
      )}

      <div>
        <h3
          className={`text-lg font-bold mb-1 ${
            highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}
        >
          {tier}
        </h3>
        <p className={`text-sm ${highlighted ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
          {description}
        </p>
      </div>

      <div className="flex items-end gap-1">
        <span
          className={`text-4xl font-black ${highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}
        >
          {price}
        </span>
        {price !== 'Free' && (
          <span className={`text-sm mb-1 ${highlighted ? 'text-purple-200' : 'text-gray-400'}`}>
            /mo
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              className={`w-4 h-4 mt-0.5 shrink-0 ${highlighted ? 'text-purple-200' : 'text-purple-600 dark:text-purple-400'}`}
            />
            <span
              className={`text-sm ${highlighted ? 'text-purple-100' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/auth"
        className={`mt-2 text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
          highlighted
            ? 'bg-white text-purple-700 hover:bg-purple-50 shadow-lg'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-purple-500/30'
        }`}
      >
        {cta || 'Get Started'}
      </Link>
    </div>
  );
}
