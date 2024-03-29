import { useEffect, useState } from 'react';
import { Entry, Statistic } from './components/Statistic';
import { StartupToggle } from './components/StartupToggle';
import { loadSettings, loadStats, saveSettings, saveStats } from './utils/saveData';
import { StatsList } from './components/StatsList';
import { AddStatButton } from './components/AddStatButton';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import { DarkThemeToggle } from './components/DarkThemeToggle';
import { Settings } from './components/Settings';

export function App(this: any) {
  const loadedStats = loadStats();
  const loadedSettings = loadSettings();
  const location = useLocation();

  const [statistics, setStatistics] = useState(loadedStats);

  const [autoStartup, setAutoStartup] = useState(window.Main.autoStartupStatus());
  const [darkTheme, setDarkTheme] = useState(loadedSettings.darkTheme);

  if (darkTheme) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  console.log(statistics);

  // State
  if ((location as any).state?.modifiedStat !== undefined) {
    const modifiedStat = (location.state as { modifiedStat: { stat: Statistic; idx: number } }).modifiedStat;

    const newArr = [...statistics];
    newArr[modifiedStat.idx] = modifiedStat.stat;

    if (!_.isEqual(statistics, newArr)) setStatistics(newArr);
  }

  if ((location as any).state?.statToDeleteIdx !== undefined) {
    const { statToDeleteIdx: idxToDelete, statAmount } = location.state as { statToDeleteIdx: number; statAmount: number };
    const newArr = [...statistics].filter((_statistic, idx) => idx !== idxToDelete);

    if (statistics.length === statAmount) setStatistics(newArr);
  }

  if ((location as any).state?.statToAdd !== undefined) {
    console.log(location.state);
    const { statToAdd, statAmount } = location.state as { statToAdd: Statistic; statAmount: number };
    const newArr = [...statistics];
    newArr.push(statToAdd);

    if (statistics.length === statAmount) setStatistics(newArr);
  }

  function addEntry(idx: number, entry: Entry) {
    const newArr = [...statistics];
    const newStat = structuredClone(newArr[idx]) as Statistic;

    newStat.entries.push(entry);
    newArr[idx] = newStat;

    setStatistics(newArr);
  }

  useEffect(() => {
    saveStats(statistics);
    saveSettings(new Settings(darkTheme));
  });

  return (
    <div id="mainWrapper" className="background">
      <header>
        <h1>Your Stats</h1>
        <div id="toggleWrapper">
          <StartupToggle enabled={autoStartup} callback={setAutoStartup} />
          <DarkThemeToggle enabled={darkTheme} callback={setDarkTheme} />
        </div>
      </header>
      <StatsList statistics={statistics} addEntryCallback={addEntry} />
      <AddStatButton statistics={statistics} />
    </div>
  );
}

/**
 * Colors:
 * - background: #fcfcfc
 * - slighly darker grey: #efefef
 * - accent: #a898d7
 */
