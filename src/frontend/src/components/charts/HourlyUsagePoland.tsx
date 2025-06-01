import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  LineChart,
} from "recharts";

export interface HourlyUsage {
    date: string,
    value: number
}

interface HourlyUsagePoland {
  usage: HourlyUsage[];
}

const HorlyUsagePoland: React.FC<HourlyUsagePoland> = ({ usage }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={usage} margin={{ bottom: 10, left: 40 }}>
        <defs>
          <linearGradient id="colorSum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00c853" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00c853" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={"date"}
          label={{ value: 'Godzina', position: 'insideBottom', offset: -5 }}
          interval={2}
          tick={{ fontSize: 12, fill: '#555' }}
          axisLine={{ stroke: '#ccc' }}
          tickLine={{ stroke: '#ccc' }}
        />
        <YAxis
          label={{ value: 'Użycie (MW)', angle: -90, position: 'insideLeft', offset: -20 }}
          tick={{ fontSize: 12, fill: '#555' }}
          axisLine={{ stroke: '#ccc' }}
          tickLine={{ stroke: '#ccc' }}
        />
        <Tooltip
          formatter={(value: number) => `${value.toFixed(2)} MW`}
          contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 4, color: '#fff' }}
          labelStyle={{ color: '#aaa' }}
        />
        <CartesianGrid strokeDasharray="3 3" />

        <Line
          dataKey="value"
          fill="url(#colorSum)"
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HorlyUsagePoland;
