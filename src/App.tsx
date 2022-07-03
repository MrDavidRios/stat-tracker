import { useEffect, useState } from 'react';
import { Statistic } from './components/Statistic';
import { StartupToggle } from './components/StartupToggle';
import { loadStats, saveStats } from './components/saveData';
import { StatsList } from './StatsList';
import { AddStatButton } from './components/AddStatButton';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

export function App(this: any) {
  const loadedStats = loadStats();

  const location = useLocation();

  const [statistics, setStatistics] = useState(loadedStats);

  const [autoStartup, setAutoStartup] = useState(window.Main.autoStartupStatus());

  if ((location as any).state?.modifiedStat !== undefined) {
    const modifiedStat = (location.state as { modifiedStat: { stat: Statistic; idx: number } }).modifiedStat;

    const newArr = [...statistics];
    newArr[modifiedStat.idx] = modifiedStat.stat;

    if (!_.isEqual(statistics, newArr)) setStatistics(newArr);
  }

  function addEntry(statistic: Statistic, idx: number) {
    const newArr = [...statistics];
    newArr[idx] = statistic;
    setStatistics(newArr);
  }

  function deleteStatistic(statisticIdx: number) {
    setStatistics(statistics.filter((_statistic, idx) => idx !== statisticIdx));
  }

  useEffect(() => {
    saveStats(statistics);
  });

  return (
    <div id="mainWrapper">
      <header>
        <h1>Your Stats</h1>
        <StartupToggle enabled={autoStartup} callback={setAutoStartup} />
      </header>
      <StatsList statistics={statistics} />
      <AddStatButton />
    </div>
  );
}

/**
 * Colors:
 * - background: #fcfcfc
 * - slighly darker grey: #efefef
 * - accent: #a898d7
 */
