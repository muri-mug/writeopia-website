import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './routes/root'
import Privacy from './routes/privacy';
import Download from "./routes/download"
import NotFound from './components/ui/not-found';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/download" element={<Download />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
