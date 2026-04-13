export const generateMockInsights = (text) => {
  const seed = text ? text.length : 50;
  const rand = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

  return {
    totalReviews: rand(50, 120),
    negativeSentiment: rand(20, 45),
    topIssue: 'Oil Level',
    featureSentiment: {
      oil: { positive: 30, neutral: 25, negative: 45 },
      spice: { positive: 40, neutral: 30, negative: 30 },
      quantity: { positive: 50, neutral: 30, negative: 20 },
      taste: { positive: 65, neutral: 20, negative: 15 },
    },
    trends: [
      { month: 'Jan', oilComplaints: 20, spiceComplaints: 15, quantityComplaints: 10 },
      { month: 'Feb', oilComplaints: 25, spiceComplaints: 18, quantityComplaints: 12 },
      { month: 'Mar', oilComplaints: 30, spiceComplaints: 20, quantityComplaints: 15 },
      { month: 'Apr', oilComplaints: 28, spiceComplaints: 22, quantityComplaints: 18 },
      { month: 'May', oilComplaints: 35, spiceComplaints: 19, quantityComplaints: 20 },
      { month: 'Jun', oilComplaints: 40, spiceComplaints: 25, quantityComplaints: 22 },
    ],
    recommendations: [
      {
        issue: 'High Oil Content',
        action: 'Reduce oil by 10-15% in preparation',
        priority: 'high',
        confidence: 92,
      },
      {
        issue: 'Spice Level Inconsistency',
        action: 'Standardize spice levels, add low-spice option',
        priority: 'medium',
        confidence: 78,
      },
      {
        issue: 'Portion Size',
        action: 'Increase portion size by 10% or add extra portion option',
        priority: 'medium',
        confidence: 71,
      },
      {
        issue: 'Taste Quality Drop',
        action: 'Review recipe consistency across shifts',
        priority: 'low',
        confidence: 65,
      },
    ],
    customizations: [
      {
        name: 'Low Oil Version',
        description: 'Same dish prepared with 30% less oil',
        priceAdd: 0,
        revenueOpportunity: 'Captures health-conscious segment (~25% of complaints)',
      },
      {
        name: 'Extra Portion (+₹20)',
        description: 'Larger serving size for hungry customers',
        priceAdd: 20,
        revenueOpportunity: 'Potential ₹2,000/day extra revenue at 100 orders',
      },
      {
        name: 'Low Spice Option',
        description: 'Milder version for sensitive customers',
        priceAdd: 0,
        revenueOpportunity: 'Retains ~15% customers who avoid spicy food',
      },
      {
        name: 'High Protein Add-on (+₹30)',
        description: 'Extra egg or paneer for protein boost',
        priceAdd: 30,
        revenueOpportunity: 'Fitness-focused upsell opportunity',
      },
    ],
  };
};
