import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Legend, Area, CartesianGrid } from 'recharts';
import { type SummaryRecord } from '@/services/CalculatorService';

interface CostsChartProps {
    costs: SummaryRecord[],
}

const CostsChart: React.FC<CostsChartProps> = ({costs}) => {
    return <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={costs}>
            <XAxis dataKey={"year"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="1 1"/>

            <Area type="monotone" name='bez instalacji' dataKey="without" stroke='red' fill='red' fillOpacity={1}/>
            <Area type="monotone" name='z instalacją' dataKey="with" stroke='limegreen' fill='limegreen' fillOpacity={1}/>
        </AreaChart>
    </ResponsiveContainer>
}

export default CostsChart;