import './App.css'
import Header from './components/header';
import Tree from './components/tree';
import Map from './components/map';
import History from './components/History'
import Support from './components/support';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
            <Header />
            <Routes>
                <Route path="/tree" element={<Tree />} />
                <Route path="/map" element={<Map />} />
                <Route path="/history" element={<History />} />
                <Route path="/support" element={<Support />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
