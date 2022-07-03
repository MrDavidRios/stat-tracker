import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddEntryModal } from './AddEntryModal';
import { Statistic } from './Statistic';

export const StatCard = ({ stat, idx, statAmount, addEntryCallback }: { stat: Statistic; idx: number; statAmount: number; addEntryCallback: Function }) => {
  // Make highlights here.
  // In order (highest to lowest priority):
  // - Number of entries
  // - Filters & different options (2 different options minimum)

  const navigate = useNavigate();

  const [displayAddEntryModal, setAddEntryModalStatus] = useState(false);

  return (
    <div className="stat-card" title="View Stats">
      <button className="add-button" title="Add Entry" onClick={() => setAddEntryModalStatus(true)}>
        <i className="bi bi-plus-lg"></i>
      </button>
      <p className="stat-name">{stat.statName}</p>
      <p className="stat-highlights">{stat.entries.length === 0 ? 'No Entries' : stat.entries.length === 1 ? '1 Entry' : stat.entries.length + ' Entries'}</p>
      <button className="edit-button" title="Edit" onClick={() => navigate('/StatEditPage', { state: { stat: stat, idx: idx, statAmount: statAmount } })}>
        <i className="bi bi-pencil-fill"></i>
      </button>
      {displayAddEntryModal ? <AddEntryModal stat={stat} idx={idx} addEntryCallback={addEntryCallback} closeModal={() => setAddEntryModalStatus(false)} /> : ''}
    </div>
  );
};
