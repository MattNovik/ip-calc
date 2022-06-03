import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Calculator from './components/Calculator';
import Error404 from './components/404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Calculator />} />
        <Route element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default App;
