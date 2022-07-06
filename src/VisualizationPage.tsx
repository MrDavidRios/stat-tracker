import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Statistic } from './components/Statistic';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import dayjs from 'dayjs';
Chart.register(...registerables);

export function VisualizationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat } = location.state as { stat: Statistic };

  const sortedEntries = _.orderBy(stat.entries, ['date'], ['asc']);
  stat.entries = sortedEntries;

  const allEntriesInSameMonth = stat.entries.every(e => dayjs(stat.entries[0].date).isSame(e.date, 'month'));
  const allEntriesInSameWeek = stat.entries.every(e => dayjs(stat.entries[0].date).isSame(e.date, 'week'));
  const allEntriesInSameDay = stat.entries.every(e => dayjs(stat.entries[0].date).isSame(e.date, 'day'));
  const allEntriesInSameMinute = stat.entries.every(e => dayjs(stat.entries[0].date).isSame(e.date, 'minute'));

  let timeUnit: string;

  timeUnit = 'month';

  if (allEntriesInSameMonth) timeUnit = 'week';
  if (allEntriesInSameWeek) timeUnit = 'day';
  if (allEntriesInSameDay) timeUnit = 'minute';
  if (allEntriesInSameMinute) timeUnit = 'second';

  console.log(timeUnit);

  const data = {
    datasets: [
      {
        id: 1,
        label: stat.statName,
        data: stat.entries.map(entry => ({ x: entry.date, y: entry.value })),
        fill: true,
        backgroundColor: 'rgba(120, 226, 255, 0.5)',
        borderColor: '#03c6fc',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        type: 'time',

        ticks: {
          maxTicksLimit: 15,
        },

        time: {
          unit: timeUnit,
          stepSize: timeUnit === 'minute' ? 5 : 1,
        },
      },
    },
  };

  return (
    <div id="visualizationPageWrapper">
      <header>
        <button className="back-arrow-btn" onClick={() => navigate('/', { replace: true })} title="Back">
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>{stat.statName}</h2>
      </header>
      <main>
        <Line data={data} options={options as any} />
      </main>
    </div>
  );
}
