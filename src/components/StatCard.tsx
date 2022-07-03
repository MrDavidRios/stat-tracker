import { useNavigate } from 'react-router-dom';
import { Statistic } from './Statistic';

export const StatCard = ({ stat, idx, statAmount }: { stat: Statistic; idx: number; statAmount: number }) => {
  // Make highlights here.
  // In order (highest to lowest priority):
  // - Number of entries
  // - Filters & different options (2 different options minimum)

  const multipleEntries = !!(stat.entries.length > 1 || stat.entries.length === 0);

  const navigate = useNavigate();

  return (
    <div className="stat-card" title="View Stats">
      <button className="add-button" title="Add Entry">
        <i className="bi bi-plus-lg"></i>
      </button>
      <p className="stat-name">{stat.statName}</p>
      <p className="stat-highlights">{multipleEntries ? stat.entries.length + ' entries' : '1 entry'}</p>
      <button className="edit-button" title="Edit" onClick={() => navigate('/StatEditPage', { state: { stat: stat, idx: idx, statAmount: statAmount } })}>
        <i className="bi bi-pencil-fill"></i>
      </button>
    </div>
  );
};
