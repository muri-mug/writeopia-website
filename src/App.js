import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Root from './routes/root'
import Privacy from './routes/privacy';
import NotFound from './components/ui/not-found';

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
