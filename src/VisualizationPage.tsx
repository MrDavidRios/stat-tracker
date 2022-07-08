import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import { Entry, Statistic } from './components/Statistic';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import { useState } from 'react';
import Dropdown from './components/Dropdown';
import format from 'date-fns/format';
import { presetFilterColors } from './utils/themeColors';
import tinycolor from 'tinycolor2';
Chart.register(...registerables);

export function VisualizationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat } = location.state as { stat: Statistic };

  const sortedEntries = _.orderBy(stat.entries, ['date'], ['asc']);
  stat.entries = sortedEntries;

  const [filterIdx, updateFilterIdx] = useState(0);

  const data = {
    datasets:
      stat.filters[filterIdx]?.valueOptions.length > 0
        ? stat.filters[filterIdx].valueOptions.map((valueOption, valueOptionIdx) => ({
            id: valueOptionIdx,
            label: valueOption.name,
            data: stat.entries
              .filter(entry => entry.filters[filterIdx]?.valueIdx === valueOptionIdx)
              .map((entry, idx, entries) => ({ x: getDatePercentage(new Date(entry.date), entries), y: entry.value })),
            fill: true,
            borderColor: valueOption.color,
            backgroundColor: tinycolor(valueOption.color).lighten(20).setAlpha(0.7).toString(),
          }))
        : [
            {
              id: 1,
              label: stat.statName,
              data: stat.entries.map(entry => ({ x: getDatePercentage(new Date(entry.date), stat.entries), y: entry.value })),
              fill: true,
              borderColor: presetFilterColors[0],
              backgroundColor: tinycolor(presetFilterColors[0]).lighten(20).setAlpha(0.7).toString(),
            },
          ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        display: false,
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
            return format(new Date(stat.entries[idx].date), 'MMMM dd yyyy, h:mm a');
          },
        },
      },
    },
  };

  return (
    <div id="visualizationPageWrapper" className="background">
      <header>
        <button className="back-arrow-btn hover-background" onClick={() => navigate('/', { replace: true })} title="Back">
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
