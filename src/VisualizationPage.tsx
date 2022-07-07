import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Entry, Statistic } from './components/Statistic';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useState } from 'react';
import Dropdown from './components/Dropdown';
import format from 'date-fns/format';
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
  if (allEntriesInSameDay) timeUnit = 'hour';
  if (allEntriesInSameMinute) timeUnit = 'second';

  const [filterIdx, updateFilterIdx] = useState(0);

  const data = {
    datasets:
      stat.filters[filterIdx].valueOptions.length > 0
        ? stat.filters[filterIdx].valueOptions.map((valueOption, valueOptionIdx) => ({
            id: valueOptionIdx,
            label: valueOption,
            data: stat.entries
              .filter(entry => entry.filters[filterIdx]?.valueIdx === valueOptionIdx)
              .map((entry, idx, entries) => ({ x: getDatePercentage(new Date(entry.date), entries), y: entry.value })),
            fill: true,
            borderColor: presetFilterColors[valueOptionIdx % presetFilterColors.length].primary,
            backgroundColor: presetFilterColors[valueOptionIdx % presetFilterColors.length].background,
          }))
        : [
            {
              id: 1,
              label: stat.statName,
              data: stat.entries.map(entry => ({ x: entry.date, y: entry.value })),
              fill: true,
              borderColor: presetFilterColors[0].primary,
              backgroundColor: presetFilterColors[0].background,
            },
          ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        display: false,

        ticks: {
          maxTicksLimit: 15,
        },

        time: {
          unit: timeUnit,
          stepSize: timeUnit === 'minute' ? 5 : 1,
        },
      },
      y: {
        type: 'linear',

        beginAtZero: true,
        min: 0, // minimum value
        max: _.maxBy(stat.entries, e => e.value)!.value + 2, // maximum value
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const idx = context[0].dataIndex;
            console.log(stat.entries[idx].date);
            return format(new Date(stat.entries[idx].date), 'MMMM dd yyyy, h:mm a');
          },
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
        {stat.filters.length > 1 ? (
          <div id="filterDropdownWrapper">
            <p>Filter: </p>
            <Dropdown options={stat.filters.map(e => e.name)} callback={(idx: number) => updateFilterIdx(idx)} />
          </div>
        ) : (
          ''
        )}
        <div id="chartContainer">
          <Line data={data as any} options={options as any} />
        </div>
      </main>
    </div>
  );
}

function getDatePercentage(date: Date, entries: Entry[]): number {
  const maxDate = new Date(Math.max(...entries.map(e => new Date(e.date).getTime())));
  const minDate = new Date(Math.min(...entries.map(e => new Date(e.date).getTime())));

  return (date.getTime() - minDate.getTime()) / (maxDate.getTime() - minDate.getTime());
}

const presetFilterColors = [
  { primary: '#00ff88', background: 'rgba(89, 255, 178, 0.5)' },
  { primary: '#3e62bd', background: 'rgba(62, 98, 189, 0.5)' },
  { primary: '#ffd814', background: 'rgba(255, 230, 105, 0.5)' },
  { primary: '#c300ff', background: 'rgba(225, 128, 255, 0.5)' },
  { primary: '#ff6a00', background: 'rgba(255, 106, 0, 0.5)' },
];
