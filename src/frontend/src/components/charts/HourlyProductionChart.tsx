import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';
import type { HourlyUsage } from './HourlyUsagePoland';

interface HourlyProductionChartProps {
    costs: HourlyUsage[],
}

const HourlyProductionChart: React.FC<HourlyProductionChartProps> = ({costs}) => {
    return <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={costs} margin={{ bottom: 10, left: 40 }}>
            <defs>
                <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e676" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00e676" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey={"date"}
                interval={3500}
                tick={{ fontSize: 12, fill: '#555' }}
                axisLine={{ stroke: '#ccc' }}
                tickLine={{ stroke: '#ccc' }}
            />
            <YAxis
                label={{ value: 'Energia (GW)', angle: -90, position: 'insideLeft', offset: -20 }}
                tick={{ fontSize: 12, fill: '#555' }}
                axisLine={{ stroke: '#ccc' }}
                tickLine={{ stroke: '#ccc' }}
            />
            <Tooltip
                formatter={(value: number) => `${value.toFixed(2)} GW`}
                contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 4, color: '#fff' }}
                labelStyle={{ color: '#aaa' }}
            />
  
            <CartesianGrid strokeDasharray="3 3" />

            <Area
                type="monotone"
                name="Energia"
                dataKey="value"
                stroke="#00e676"
                fill="url(#colorWith)"
                isAnimationActive={false}
            />
        </AreaChart>
    </ResponsiveContainer>
}

export default HourlyProductionChart;