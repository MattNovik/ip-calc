import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Calc from './components/Calc';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Calc />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
