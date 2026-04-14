/* ─── Language Detection ─────────────────────────────────── */

const LANG_PATTERNS = {
  Hindi: { pattern: /[\u0900-\u097F]/, code: 'hi' },
  Tamil: { pattern: /[\u0B80-\u0BFF]/, code: 'ta' },
  Telugu: { pattern: /[\u0C00-\u0C7F]/, code: 'te' },
  Bengali: { pattern: /[\u0980-\u09FF]/, code: 'bn' },
  Kannada: { pattern: /[\u0C80-\u0CFF]/, code: 'kn' },
  Arabic: { pattern: /[\u0600-\u06FF]/, code: 'ar' },
  Chinese: { pattern: /[\u4E00-\u9FFF]/, code: 'zh' },
};

const HINDI_LATIN_WORDS = [
  'bahut', 'zyada', 'kam', 'achha', 'bura', 'tel', 'mirch', 'khana', 'maza',
  'swaad', 'thoda', 'bilkul', 'nahi', 'hai', 'tha', 'aur', 'lekin',
];

export function detectLanguage(text) {
  if (!text || !text.trim()) return { code: 'en', name: 'English', confidence: 100 };

  for (const [name, { pattern, code }] of Object.entries(LANG_PATTERNS)) {
    if (pattern.test(text)) return { code, name, confidence: 97 };
  }

  const lower = text.toLowerCase();
  const hindiMatches = HINDI_LATIN_WORDS.filter((w) => lower.includes(w)).length;
  if (hindiMatches >= 2) return { code: 'hi', name: 'Hinglish', confidence: 82 };

  return { code: 'en', name: 'English', confidence: 99 };
}

/* ─── Keyword Dictionaries ───────────────────────────────── */

const FEATURE_KEYWORDS = {
  oil: {
    negative: [
      'oily', 'too much oil', 'greasy', 'dripping oil', 'very oily', 'excess oil',
      'swimming in oil', 'oil floating', 'tel zyada', 'bahut tel', 'chikna',
    ],
    positive: [
      'not oily', 'less oil', 'light', 'healthy', 'low oil', 'good oil',
    ],
    neutral: ['oil', 'fried', 'cooked'],
  },
  spice: {
    negative: [
      'too spicy', 'very spicy', 'burning', 'extra spice', 'too hot', 'spice level high',
      'bahut mirch', 'zyada teekha', 'mouth on fire', 'overpowering spice',
    ],
    positive: [
      'perfectly spiced', 'good spice', 'mild', 'balanced spice', 'just right spice',
    ],
    neutral: ['spicy', 'spice', 'chili', 'pepper', 'masala'],
  },
  quantity: {
    negative: [
      'small portion', 'less quantity', 'not enough', 'tiny portion', 'too little',
      'kam matra', 'chota', 'insufficient', 'not filling', 'hungry after',
    ],
    positive: [
      'good portion', 'large portion', 'generous', 'filling', 'enough food', 'big portion',
    ],
    neutral: ['portion', 'serving', 'quantity', 'amount', 'size'],
  },
  taste: {
    negative: [
      'tasteless', 'bland', 'no taste', 'bad taste', 'stale', 'horrible taste',
      'awful', 'disgusting', 'not tasty', 'bekar', 'kharab',
    ],
    positive: [
      'delicious', 'amazing taste', 'great taste', 'yummy', 'tasty', 'fantastic',
      'wonderful', 'excellent', 'superb', 'maza aaya', 'swaadisht',
    ],
    neutral: ['taste', 'flavor', 'flavour', 'swaad'],
  },
};

/* ─── Text Analysis ──────────────────────────────────────── */

function countMatches(lowerText, keywords) {
  return keywords.reduce((count, kw) => count + (lowerText.includes(kw) ? 1 : 0), 0);
}

function analyzeFeature(lowerText, feature) {
  const kws = FEATURE_KEYWORDS[feature];
  const neg = countMatches(lowerText, kws.negative);
  const pos = countMatches(lowerText, kws.positive);
  const neu = countMatches(lowerText, kws.neutral);
  const total = neg + pos + neu || 1;
  return {
    negativeSignals: neg,
    positiveSignals: pos,
    neutralSignals: neu,
    totalSignals: total,
  };
}

export function extractFeatures(text) {
  if (!text || !text.trim()) return null;
  const lower = text.toLowerCase();
  const features = {};
  for (const feature of ['oil', 'spice', 'quantity', 'taste']) {
    features[feature] = analyzeFeature(lower, feature);
  }
  return features;
}

/* ─── Anomaly Detection ──────────────────────────────────── */

const ANOMALY_THRESHOLD_SIGMA = 1.5;

function detectAnomalies(trends) {
  const anomalies = [];
  const keys = ['oilComplaints', 'spiceComplaints', 'quantityComplaints'];
  for (const key of keys) {
    const values = trends.map((t) => t[key]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
    values.forEach((v, i) => {
      if (Math.abs(v - mean) > ANOMALY_THRESHOLD_SIGMA * std) {
        anomalies.push({
          month: trends[i].month,
          metric: key.replace('Complaints', ''),
          value: v,
          mean: Math.round(mean),
          direction: v > mean ? 'spike' : 'drop',
        });
      }
    });
  }
  return anomalies;
}

/* ─── Main AI Generator ──────────────────────────────────── */

export const generateMockInsights = (text) => {
  const hasText = text && text.trim().length > 0;
  const wordCount = hasText ? text.split(/\s+/).length : 0;
  const reviewLines = hasText ? text.split(/\n|[.!?]+/).filter((l) => l.trim().length > 5) : [];
  const estimatedReviews = Math.max(reviewLines.length, Math.round(wordCount / 12), 5);

  const langResult = detectLanguage(text || '');
  const extractedFeatures = extractFeatures(text || '');

  /* ── Derive feature sentiment from actual text ── */
  const featureSentiment = {};
  const featureComplaintRates = {};

  for (const feature of ['oil', 'spice', 'quantity', 'taste']) {
    let neg, pos, neu;
    if (extractedFeatures && extractedFeatures[feature].totalSignals > 1) {
      const f = extractedFeatures[feature];
      const total = f.negativeSignals + f.positiveSignals + f.neutralSignals;
      // Normalize so neg + pos + neu always equals 100
      const rawNeg = Math.round((f.negativeSignals / total) * 100) + 5;
      const rawPos = Math.round((f.positiveSignals / total) * 100) + 10;
      neg = Math.min(90, rawNeg);
      pos = Math.min(90, rawPos);
      // Neutral absorbs the remainder to guarantee sum === 100
      neu = Math.max(0, 100 - neg - pos);
    } else {
      const defaults = {
        oil: { neg: 45, pos: 30, neu: 25 },
        spice: { neg: 30, pos: 40, neu: 30 },
        quantity: { neg: 20, pos: 50, neu: 30 },
        taste: { neg: 15, pos: 65, neu: 20 },
      };
      neg = defaults[feature].neg;
      pos = defaults[feature].pos;
      neu = defaults[feature].neu;
    }
    featureSentiment[feature] = { positive: pos, neutral: neu, negative: neg };
    featureComplaintRates[feature] = neg;
  }

  /* ── Sort features by complaint rate ── */
  const sortedFeatures = Object.entries(featureComplaintRates).sort((a, b) => b[1] - a[1]);
  const topIssueEntry = sortedFeatures[0];
  const topIssue = topIssueEntry
    ? topIssueEntry[0].charAt(0).toUpperCase() + topIssueEntry[0].slice(1)
    : 'Oil Level';

  /* ── Trend data ── */
  const baseOil = featureComplaintRates.oil || 20;
  const baseSpice = featureComplaintRates.spice || 15;
  const baseQty = featureComplaintRates.quantity || 10;

  const trends = [
    { month: 'Jan', oilComplaints: Math.round(baseOil * 0.5), spiceComplaints: Math.round(baseSpice * 0.6), quantityComplaints: Math.round(baseQty * 0.7) },
    { month: 'Feb', oilComplaints: Math.round(baseOil * 0.62), spiceComplaints: Math.round(baseSpice * 0.72), quantityComplaints: Math.round(baseQty * 0.8) },
    { month: 'Mar', oilComplaints: Math.round(baseOil * 0.75), spiceComplaints: Math.round(baseSpice * 0.8), quantityComplaints: Math.round(baseQty * 0.9) },
    { month: 'Apr', oilComplaints: Math.round(baseOil * 0.7), spiceComplaints: Math.round(baseSpice * 0.88), quantityComplaints: Math.round(baseQty * 1.1) },
    { month: 'May', oilComplaints: Math.round(baseOil * 0.875), spiceComplaints: Math.round(baseSpice * 0.76), quantityComplaints: Math.round(baseQty * 1.3) },
    { month: 'Jun', oilComplaints: baseOil, spiceComplaints: baseSpice, quantityComplaints: baseQty },
  ];

  const anomalies = detectAnomalies(trends);

  /* ── Recommendations ── */
  const recTemplates = {
    oil: {
      issue: 'High Oil Content',
      action: 'Reduce oil by 10–15% in preparation; switch to healthier oil variants',
      impact: 'Expected 20–30% reduction in oil complaints; improves health perception',
    },
    spice: {
      issue: 'Spice Level Inconsistency',
      action: 'Standardise spice levels across shifts; introduce a low-spice menu option',
      impact: 'Retains ~15% spice-sensitive customers; reduces negative reviews by ~18%',
    },
    quantity: {
      issue: 'Portion Size Too Small',
      action: 'Increase portion size by 10% or offer an extra-portion add-on at ₹20',
      impact: 'Increases perceived value; boosts repeat orders by ~12%',
    },
    taste: {
      issue: 'Taste Quality Drop',
      action: 'Audit recipe consistency across kitchen shifts; refresh ingredient sourcing',
      impact: 'Recovering taste scores can lift overall rating by 0.3–0.5 stars',
    },
  };

  const recommendations = sortedFeatures.map(([feature], idx) => {
    const tmpl = recTemplates[feature];
    const conf = Math.min(97, Math.max(60, 95 - idx * 8 - (hasText ? 0 : 5)));
    const priority = idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low';
    return { ...tmpl, priority, confidence: conf };
  });

  /* ── Customisations ── */
  const customizations = [
    {
      name: 'Low Oil Version',
      description: 'Same dish prepared with 30% less oil using an air-fry technique',
      priceAdd: 0,
      revenueOpportunity: 'Captures health-conscious segment (~25% of complaints)',
    },
    {
      name: 'Extra Portion (+₹20)',
      description: 'Larger serving size for value-hungry customers',
      priceAdd: 20,
      revenueOpportunity: 'Potential ₹2,000/day extra revenue at 100 orders',
    },
    {
      name: 'Low Spice Option',
      description: 'Milder version cooked with 50% reduced chili for sensitive palates',
      priceAdd: 0,
      revenueOpportunity: 'Retains ~15% customers who avoid spicy food',
    },
    {
      name: 'High Protein Add-on (+₹30)',
      description: 'Extra egg or paneer for a nutrition-boosted meal',
      priceAdd: 30,
      revenueOpportunity: 'Fitness-focused upsell — avg ₹3,000/day potential',
    },
  ];

  return {
    totalReviews: estimatedReviews,
    negativeSentiment: featureComplaintRates[topIssue.toLowerCase()] || 35,
    topIssue,
    language: langResult,
    extractedFeatures,
    featureSentiment,
    trends,
    anomalies,
    recommendations,
    customizations,
  };
};
