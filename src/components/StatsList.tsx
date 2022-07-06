import { StatCard } from './StatCard';
import { Statistic } from './Statistic';

export const StatsList = ({ statistics, addEntryCallback }: { statistics: Statistic[]; addEntryCallback: Function }) => {
  return (
    <div id="statsList">
      {statistics.map((statistic, idx) => (
        <StatCard key={idx} stat={statistic} idx={idx} statAmount={statistics.length} addEntryCallback={addEntryCallback} />
      ))}
    </div>
  );
};
