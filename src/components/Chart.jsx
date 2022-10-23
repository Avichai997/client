import './Chart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const dashboards = [
  {
    "_id": "632045c710278e519345fdd1",
    "order": 12,
    "name": "דשבורד 12",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:56:39.299Z",
    "updatedAt": "2022-09-13T08:56:39.299Z",
    "id": "632045c710278e519345fdd1"
  },
  {
    "_id": "632045c110278e519345fdce",
    "order": 11,
    "name": "דשבורד 11",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:56:33.791Z",
    "updatedAt": "2022-09-13T08:56:33.791Z",
    "id": "632045c110278e519345fdce"
  },
  {
    "_id": "632045bd10278e519345fdcb",
    "order": 10,
    "name": "דשבורד 10",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:56:29.769Z",
    "updatedAt": "2022-09-13T08:56:29.769Z",
    "id": "632045bd10278e519345fdcb"
  },
  {
    "_id": "632045b510278e519345fdc8",
    "order": 9,
    "name": "דשבורד 9",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:56:21.998Z",
    "updatedAt": "2022-09-13T08:56:21.998Z",
    "id": "632045b510278e519345fdc8"
  },
  {
    "_id": "6320459810278e519345fdc4",
    "order": 8,
    "name": "דשבורד 8",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:55:52.963Z",
    "updatedAt": "2022-09-13T08:55:52.963Z",
    "id": "6320459810278e519345fdc4"
  },
  {
    "_id": "6320459510278e519345fdc1",
    "order": 7,
    "name": "דשבורד 7",
    "url": "https://portal.shual.org.il/portal/apps/opsdashboard/index.html#/a707975851c643f2b46b4acea170a209",
    "includeShualCityId": [
      100,
      101
    ],
    "excludeShualCityId": [
      105
    ],
    "customerTypeId": "62ea79dbd152c7c170473ae0",
    "createdAt": "2022-09-13T08:55:49.316Z",
    "updatedAt": "2022-09-13T08:55:49.316Z",
    "id": "6320459510278e519345fdc1"
  },
];

const Chart = () => {
  return (
    <div className='chart'>
      <div className="chart-title">עדכון דשבורדים</div>
      <ResponsiveContainer width='100%' aspect={ 2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='uv'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#colorUv)'
          />
          <Area
            type='monotone'
            dataKey='pv'
            stroke='#82ca9d'
            fillOpacity={1}
            fill='url(#colorPv)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
