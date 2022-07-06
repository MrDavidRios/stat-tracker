import { useLocation, useNavigate } from 'react-router-dom';
import { Statistic } from './components/Statistic';

export function VisualizationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { stat } = location.state as { stat: Statistic };

  return (
    <div id="visualizationPageWrapper">
      <header>
        <button className="back-arrow-btn" onClick={() => navigate('/', { replace: true })} title="Back">
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>{stat.statName}</h2>
      </header>
    </div>
  );
}
