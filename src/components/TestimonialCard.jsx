import { Star } from 'lucide-react';

export default function TestimonialCard({ name, role, restaurant, quote, rating }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-1">
        {Array.from({ length: rating || 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-400">{role} · {restaurant}</p>
        </div>
      </div>
    </div>
  );
}
