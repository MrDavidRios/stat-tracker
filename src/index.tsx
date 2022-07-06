import ReactDOM from 'react-dom';
import { App } from './App';
import 'bootstrap';

import './styles/css/index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { StatEditPage } from './StatEditPage';
import { VisualizationPage } from './VisualizationPage';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/StatEditPage" element={<StatEditPage />} />
      <Route path="/VisualizationPage" element={<VisualizationPage />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
