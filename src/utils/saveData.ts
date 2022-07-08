import { Settings } from '../components/Settings';
import { Statistic } from '../components/Statistic';

function getSaveFilePath(filename: string): string {
  const globals = global.location.search;
  return `${globals.substring(globals.indexOf('=') + 1)}\\${filename}`;
}

export function saveStats(statistics: Statistic[]) {
  const path = getSaveFilePath('userdata.json');

  try {
    window.Main.writeFile(path, JSON.stringify(statistics));
  } catch (err) {
    console.error(err);
  }
}

export function loadStats(): Statistic[] {
  const path = getSaveFilePath('userdata.json');

  try {
    const output = window.Main.readFile(path);

    return JSON.parse(JSON.parse(output));
  } catch (err) {
    return [];
  }
}

export function saveSettings(settings: Settings) {
  const path = getSaveFilePath('settings.json');

  try {
    window.Main.writeFile(path, JSON.stringify(settings));
  } catch (err) {
    console.error(err);
  }
}

export function loadSettings(): Settings {
  const path = getSaveFilePath('settings.json');

  try {
    const output = window.Main.readFile(path);

    return JSON.parse(JSON.parse(output));
  } catch (err) {
    return new Settings(false);
  }
}
