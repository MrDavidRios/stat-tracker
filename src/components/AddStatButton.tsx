import { useNavigate } from 'react-router-dom';
import { Statistic } from './Statistic';

export const AddStatButton = ({ statistics }: { statistics: Statistic[] }) => {
  const navigate = useNavigate();

  console.log(statistics.length);

  return (
    <button
      id="addStatButton"
      className="horizontally-centered-absolute big-btn"
      onClick={() => {
        navigate('/StatEditPage', { state: { stat: new Statistic('Stat Name', [], []), idx: statistics.length, statAmount: statistics.length, adding: true } });
      }}
    >
      <div>
        <i className="bi bi-plus-lg"></i>
      </div>
      Add Stat
    </button>
  );
};
