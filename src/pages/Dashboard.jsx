import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart2,
  TrendingUp,
  Lightbulb,
  Upload,
  LogOut,
  Sun,
  Moon,
  UtensilsCrossed,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Loader2,
  Menu,
  X,
  Home,
  DollarSign,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { generateMockInsights } from '../utils/mockAI';
import SentimentChart from '../components/charts/SentimentChart';
import TrendChart from '../components/charts/TrendChart';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'sentiment', label: 'Sentiment', icon: BarChart2 },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
  { id: 'customizations', label: 'Menu Ideas', icon: DollarSign },
];

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  low: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [reviewText, setReviewText] = useState('');
  const [insights, setInsights] = useState(() => generateMockInsights(''));
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    if (!reviewText.trim() && !fileName) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setInsights(generateMockInsights(reviewText));
    setAnalyzed(true);
    setLoading(false);
    setActiveSection('overview');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReviewText(ev.target.result.slice(0, 2000));
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sectionComponents = {
    overview: <OverviewSection insights={insights} />,
    sentiment: <SentimentSection insights={insights} />,
    trends: <TrendsSection insights={insights} />,
    recommendations: <RecommendationsSection insights={insights} />,
    customizations: <CustomizationsSection insights={insights} />,
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PlateIQ
            </span>
          </Link>
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Analytics
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${
                  active
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white capitalize">
                {NAV_ITEMS.find((n) => n.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {analyzed
                  ? `${insights.totalReviews} reviews analyzed`
                  : 'Upload reviews to get started'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Review Upload Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Review Upload Panel
              </h2>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Paste customer reviews here… (e.g. 'The biryani was too oily today. Spice level was inconsistent. Portion was small for the price.')"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-purple-400 hover:text-purple-600 transition-all"
              >
                <Upload className="w-4 h-4" />
                {fileName || 'Upload CSV'}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || (!reviewText.trim() && !fileName)}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <BarChart2 className="w-4 h-4" />
                    Analyze Reviews
                  </>
                )}
              </button>
              {analyzed && !loading && (
                <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Analysis complete
                </span>
              )}
            </div>
          </div>

          {/* Dynamic section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg animate-pulse">
                <BarChart2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                AI is analyzing your reviews…
              </p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            sectionComponents[activeSection]
          )}
        </main>
      </div>
    </div>
  );
}

/* ────────────── Sub-sections ────────────── */

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

function OverviewSection({ insights }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Reviews"
          value={insights.totalReviews}
          sub="Analyzed this session"
          icon={FileText}
          color="bg-gradient-to-br from-purple-500 to-purple-700"
        />
        <StatCard
          label="Negative Sentiment"
          value={`${insights.negativeSentiment}%`}
          sub="of all reviews"
          icon={AlertCircle}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
        <StatCard
          label="Top Issue"
          value={insights.topIssue}
          sub="Most mentioned complaint"
          icon={TrendingUp}
          color="bg-gradient-to-br from-blue-500 to-blue-700"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Sentiment Breakdown</h3>
          <SentimentChart data={insights.featureSentiment} />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Complaint Trends</h3>
          <TrendChart data={insights.trends} />
        </div>
      </div>

      {/* Quick recommendations */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Top AI Recommendations</h3>
        <div className="space-y-3">
          {insights.recommendations.slice(0, 3).map((r) => (
            <div
              key={r.issue}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
            >
              <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{r.issue}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{r.action}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${PRIORITY_STYLES[r.priority]}`}
              >
                {r.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SentimentSection({ insights }) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
          Feature Sentiment Analysis
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Breakdown of positive, neutral, and negative feedback by food dimension.
        </p>
        <SentimentChart data={insights.featureSentiment} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(insights.featureSentiment).map(([key, val]) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5"
          >
            <h4 className="text-sm font-bold text-gray-900 dark:text-white capitalize mb-3">{key}</h4>
            <div className="space-y-2">
              {[
                { label: 'Positive', value: val.positive, color: 'bg-emerald-400' },
                { label: 'Neutral', value: val.neutral, color: 'bg-amber-400' },
                { label: 'Negative', value: val.negative, color: 'bg-red-400' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <div
                      className={`h-1.5 ${item.color} rounded-full`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendsSection({ insights }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Complaint Trend Analysis</h3>
      <p className="text-xs text-gray-400 mb-6">Monthly complaint trends for oil, spice, and quantity issues.</p>
      <TrendChart data={insights.trends} />

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Oil Complaints', key: 'oilComplaints', color: 'bg-purple-500' },
          { label: 'Spice Complaints', key: 'spiceComplaints', color: 'bg-blue-500' },
          { label: 'Quantity Complaints', key: 'quantityComplaints', color: 'bg-emerald-500' },
        ].map((item) => {
          const last = insights.trends[insights.trends.length - 1][item.key];
          const first = insights.trends[0][item.key];
          const change = (((last - first) / first) * 100).toFixed(0);
          return (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-start gap-3"
            >
              <span className={`w-3 h-3 rounded-full mt-1 shrink-0 ${item.color}`} />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Latest: {last} · {change > 0 ? `+${change}%` : `${change}%`} vs start
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecommendationsSection({ insights }) {
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
        <p className="text-sm text-purple-700 dark:text-purple-300">
          These recommendations are generated based on your review analysis. Higher confidence scores indicate stronger evidence from customer feedback.
        </p>
      </div>
      {insights.recommendations.map((r) => (
        <div
          key={r.issue}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{r.issue}</h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${PRIORITY_STYLES[r.priority]}`}>
                {r.priority} priority
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{r.action}</p>
          </div>
          <div className="shrink-0 text-center">
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  strokeDasharray={`${r.confidence} ${100 - r.confidence}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                {r.confidence}%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Confidence</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomizationsSection({ insights }) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-start gap-3">
        <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Smart customization suggestions based on your customer complaints. Each option can increase revenue or reduce churn.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {insights.customizations.map((c) => (
          <div
            key={c.name}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{c.name}</h3>
              {c.priceAdd > 0 ? (
                <span className="text-xs font-bold px-2.5 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full">
                  +₹{c.priceAdd}
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">
                  No extra cost
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{c.description}</p>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                💰 {c.revenueOpportunity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
