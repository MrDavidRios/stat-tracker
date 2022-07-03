import { StatCard } from './components/StatCard';
import { Statistic } from './components/Statistic';

export const StatsList = ({ statistics }: { statistics: Statistic[] }) => {
  return (
    <div id="statsList">
      {statistics.map((statistic, idx) => (
        <StatCard key={idx} stat={statistic} idx={idx} />
      ))}
    </div>
  );
};
