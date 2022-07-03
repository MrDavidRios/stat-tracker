import { Statistic } from './Statistic';

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
