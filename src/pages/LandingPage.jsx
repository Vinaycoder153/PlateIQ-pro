import { Link } from 'react-router-dom';
import {
  BarChart2,
  TrendingUp,
  Lightbulb,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Upload,
  Brain,
  Target,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import TestimonialCard from '../components/TestimonialCard';

const features = [
  {
    icon: BarChart2,
    title: 'Sentiment Analysis',
    description: 'Automatically categorize reviews by sentiment across oil, spice, quantity, and taste dimensions.',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: TrendingUp,
    title: 'Trend Detection',
    description: 'Spot complaint trends before they hurt your ratings. Visual charts updated in real time.',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: Lightbulb,
    title: 'AI Recommendations',
    description: 'Get specific, actionable advice on recipe changes with confidence scores.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FileText,
    title: 'CSV Import',
    description: 'Bulk upload reviews from any platform — Zomato, Swiggy, Google, or your own POS.',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Customer review data is anonymized and never shared with third parties.',
    gradient: 'from-red-500 to-pink-600',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Paste reviews and get AI-powered insights in under 3 seconds.',
    gradient: 'from-indigo-500 to-purple-600',
  },
];

const pricingTiers = [
  {
    tier: 'Free',
    price: 'Free',
    description: 'Perfect for trying out PlateIQ',
    features: ['50 reviews/month', 'Basic sentiment analysis', 'Oil & spice charts', 'Email support'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    tier: 'Pro',
    price: '₹999',
    description: 'For growing restaurants',
    features: [
      '500 reviews/month',
      'Full sentiment analysis',
      'Trend detection',
      'AI recommendations',
      'CSV import',
      'Priority support',
    ],
    cta: 'Start Pro',
    highlighted: true,
  },
  {
    tier: 'Premium',
    price: '₹2,499',
    description: 'For restaurant chains',
    features: [
      'Unlimited reviews',
      'Multi-location dashboard',
      'Custom AI models',
      'API access',
      'White-label reports',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'Owner',
    restaurant: 'Spice Garden, Mumbai',
    quote: 'PlateIQ helped us cut oil complaints by 40% in just one month. Our ratings jumped from 3.8 to 4.4 on Zomato.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Head Chef',
    restaurant: 'The Dosa House, Bangalore',
    quote: 'The AI suggestions are spot-on. We added a low-spice menu option and saw a 15% increase in new customers.',
    rating: 5,
  },
  {
    name: 'Rahul Gupta',
    role: 'Operations Manager',
    restaurant: 'Biryani Bros (12 outlets)',
    quote: "Managing 12 outlets used to be a nightmare. PlateIQ's multi-location dashboard changed everything.",
    rating: 5,
  },
];

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Reviews',
    description: 'Paste reviews directly or upload a CSV from any review platform.',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Analysis',
    description: 'Our AI processes every review and extracts structured insights in seconds.',
  },
  {
    icon: Target,
    step: '03',
    title: 'Take Action',
    description: 'Receive specific menu and recipe recommendations with priority scores.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-purple-200 dark:border-purple-800">
            <Zap className="w-4 h-4" />
            AI-Powered Restaurant Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            Turn Customer Reviews
            <br />
            into{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Menu Decisions
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered insights, trends, and automatic improvements. Stop guessing what your customers
            want — PlateIQ tells you exactly what to fix.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-purple-500/30 text-base"
            >
              Start Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-lg transition-all text-base"
            >
              Analyze Reviews
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-400">
            {['No credit card required', 'Free 30-day trial', '500+ restaurants trust us'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                You have thousands of reviews.
                <span className="text-red-500"> But no time to read them all.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Restaurateurs spend hours manually reading reviews, trying to spot patterns. By the time
                you identify a problem — like too much oil in the curry — hundreds of customers have
                already complained and left.
              </p>
              <ul className="space-y-3">
                {[
                  'Miss critical complaints buried in text',
                  'Lose customers to fixable issues',
                  'React weeks too late to trends',
                ].map((pain) => (
                  <li key={pain} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    {pain}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400">PlateIQ Analysis</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Oil Complaints', pct: 45, color: 'bg-red-400' },
                    { label: 'Spice Complaints', pct: 30, color: 'bg-yellow-400' },
                    { label: 'Quantity Complaints', pct: 20, color: 'bg-blue-400' },
                    { label: 'Positive Feedback', pct: 65, color: 'bg-green-400' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-300">
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2 ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                    🤖 AI Recommendation: Reduce oil by 10-15% — 92% confidence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                improve your restaurant
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              PlateIQ analyzes reviews across all dimensions and gives you a clear roadmap for improvement.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">How PlateIQ works</h2>
            <p className="text-gray-500 dark:text-gray-400">From raw reviews to actionable decisions in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-2 tracking-widest">
                  STEP {s.step}
                </span>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-gray-300 dark:text-gray-600">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500 dark:text-gray-400">Start free. Upgrade when you're ready to grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.tier} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Loved by restaurant owners
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join 500+ restaurants that have improved their ratings with PlateIQ.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5">
            Ready to make smarter menu decisions?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
            Join restaurants that use PlateIQ to turn feedback into growth.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-purple-500/30 text-lg"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
