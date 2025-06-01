import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Legend, Area, CartesianGrid } from 'recharts';
import { type SummaryRecord } from '@/services/CalculatorService';

interface CostsChartProps {
    costs: SummaryRecord[],
}

const CostsChart: React.FC<CostsChartProps> = ({costs}) => {
    return <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={costs} margin={{ bottom: 10, left: 40 }}>
            <defs>
                <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d4d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e676" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00e676" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey={"year"}
                label={{ value: 'Rok', position: 'insideBottom', offset: -15 }}
                interval={2}
                tick={{ fontSize: 12, fill: '#555' }}
                axisLine={{ stroke: '#ccc' }}
                tickLine={{ stroke: '#ccc' }}
            />
            <YAxis
                label={{ value: 'Koszt jednoroczny', angle: -90, position: 'insideLeft', offset: -20 }}
                tick={{ fontSize: 12, fill: '#555' }}
                axisLine={{ stroke: '#ccc' }}
                tickLine={{ stroke: '#ccc' }}
            />
            <Tooltip
                formatter={(value: number) => `${value.toFixed(2)} zł`}
                contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 4, color: '#fff' }}
                labelStyle={{ color: '#aaa' }}
            />
            <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ bottom: -16, backgroundColor: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: '4px' }}
            />
            <CartesianGrid strokeDasharray="3 3" />

            <Area
                type="monotone"
                name="Bez instalacji"
                dataKey="without"
                stroke="#ff4d4d"
                fill="url(#colorWithout)"
                isAnimationActive={true}
            />
            <Area
                type="monotone"
                name="Z instalacją"
                dataKey="with"
                stroke="#00e676"
                fill="url(#colorWith)"
                isAnimationActive={true}
            />
        </AreaChart>
    </ResponsiveContainer>
}

export default CostsChart;