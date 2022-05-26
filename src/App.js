import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Calculator />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
