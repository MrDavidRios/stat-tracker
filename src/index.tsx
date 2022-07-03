import ReactDOM from 'react-dom';
import { App } from './App';
import 'bootstrap';

import './styles/css/index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { StatEditPage } from './StatEditPage';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/StatEditPage" element={<StatEditPage />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
