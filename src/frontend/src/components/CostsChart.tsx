import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';


const DEFAULT_DATA = [
    {
        year: 1,
        with: 20000,
        without: 12000,
    },
    {
        year: 2,
        with: 30000,
        without: 24000,
    },
    {
        year: 3,
        with: 38000,
        without: 36000,
    },
    {
        year: 4,
        with: 46000,
        without: 48000,
    }
]

const CostsChart: React.FC = () => {
    return <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DEFAULT_DATA}>
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="with" />
            <Line type="monotone" dataKey="without" />
        </LineChart>
    </ResponsiveContainer>
}

export default CostsChart;