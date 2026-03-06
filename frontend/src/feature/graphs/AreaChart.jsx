import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function CustomAreaChart({ data, height = 220 }) {
  const byDate = {};
  if (data && data.length > 0) {
    data
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const date = t.transaction_date;
        byDate[date] = (byDate[date] || 0) + Number(t.amount);
      });
  }

  const chartData = Object.entries(byDate)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, total]) => ({
      name: new Date(date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }),
      value: total,
    }));

  return (
    <div style={{ width: '100%', height }}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 30, right: 20, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#fff' }} />
        <YAxis
          tick={{ fontSize: 10, fill: '#fff' }}
          tickFormatter={(v) => `₱${v.toLocaleString()}`}
          width={60}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          formatter={(value) => [`₱${value.toLocaleString()}`, 'Spent']}
        />
        <Area type="natural" dataKey="value" stroke="#c4b5fd" fill="#8b5cf6" fillOpacity={0.5} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}
