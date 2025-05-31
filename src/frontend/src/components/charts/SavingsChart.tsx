import type { SavingsRecord } from "@/services/CalculatorService";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianAxis,
} from "recharts";

interface SavingsChart {
  savings: SavingsRecord[];
}

const SavingsChart: React.FC<SavingsChart> = ({ savings }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={savings}>
        <XAxis />
        <YAxis />
        <Tooltip />
        <CartesianAxis />

        <Bar dataKey="sum" fill="var(--color-green-500)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SavingsChart;
