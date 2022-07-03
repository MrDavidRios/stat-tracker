import { StatCard } from './components/StatCard';
import { Statistic } from './components/Statistic';

export const StatsList = ({ statistics, addEntryCallback }: { statistics: Statistic[]; addEntryCallback: Function }) => {
  return (
    <div id="statsList">
      {statistics.map((statistic, idx) => (
        <StatCard key={idx} stat={statistic} idx={idx} statAmount={statistics.length} addEntryCallback={addEntryCallback} />
      ))}
    </div>
  );
};
