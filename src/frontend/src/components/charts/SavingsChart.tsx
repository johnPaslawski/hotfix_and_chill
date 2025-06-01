import type { SavingsRecord } from "@/services/CalculatorService";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";

interface SavingsChart {
  savings: SavingsRecord[];
}

const SavingsChart: React.FC<SavingsChart> = ({ savings }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={savings} margin={{ bottom: 10, left: 40 }}>
        <defs>
          <linearGradient id="colorSum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00c853" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00c853" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={"year"}
          label={{ value: 'Rok', position: 'insideBottom', offset: -5 }}
          interval={2}
          tick={{ fontSize: 12, fill: '#555' }}
          axisLine={{ stroke: '#ccc' }}
          tickLine={{ stroke: '#ccc' }}
        />
        <YAxis
          label={{ value: 'Oszczędności [PLN]', angle: -90, position: 'insideLeft', offset: -20 }}
          tick={{ fontSize: 12, fill: '#555' }}
          axisLine={{ stroke: '#ccc' }}
          tickLine={{ stroke: '#ccc' }}
        />
        <Tooltip
          formatter={(value: number) => `${value.toFixed(2)} zł`}
          contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 4, color: '#fff' }}
          labelStyle={{ color: '#aaa' }}
        />
        <CartesianGrid strokeDasharray="3 3" />

        <Bar
          dataKey="sum"
          fill="url(#colorSum)"
          radius={[10, 10, 0, 0]}
          isAnimationActive={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SavingsChart;
