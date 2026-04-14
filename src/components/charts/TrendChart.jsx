import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const METRIC_COLORS = {
  oilComplaints: '#8b5cf6',
  spiceComplaints: '#3b82f6',
  quantityComplaints: '#10b981',
};

function AnomalyDot({ cx, cy, payload, anomalyMonths }) {
  if (!anomalyMonths || !anomalyMonths.has(payload.month)) return null;
  return <circle cx={cx} cy={cy} r={7} fill="#f59e0b" stroke="#fff" strokeWidth={2} />;
}

export default function TrendChart({ data, anomalies = [] }) {
  const anomalyMonths = new Set(anomalies.map((a) => a.month));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '12px' }} />

        {anomalyMonths.map((month) => (
          <ReferenceLine
            key={month}
            x={month}
            stroke="#f59e0b"
            strokeDasharray="4 3"
            label={{ value: '⚠', position: 'top', fontSize: 14 }}
          />
        ))}

        <Line
          type="monotone"
          dataKey="oilComplaints"
          name="Oil"
          stroke={METRIC_COLORS.oilComplaints}
          strokeWidth={2.5}
          dot={(props) => <AnomalyDot {...props} anomalyMonths={anomalyMonths} />}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="spiceComplaints"
          name="Spice"
          stroke={METRIC_COLORS.spiceComplaints}
          strokeWidth={2.5}
          dot={(props) => <AnomalyDot {...props} anomalyMonths={anomalyMonths} />}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="quantityComplaints"
          name="Quantity"
          stroke={METRIC_COLORS.quantityComplaints}
          strokeWidth={2.5}
          dot={(props) => <AnomalyDot {...props} anomalyMonths={anomalyMonths} />}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
