import { Route, Routes } from 'react-router-dom';
import Dashboards from 'pages/Dashboards';
import Login from 'pages/Login';
import NoMatch from 'pages/NoMatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboards />} />
      <Route path="Login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
