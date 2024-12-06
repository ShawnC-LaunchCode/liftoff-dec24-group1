import './App.css'
import Header from './components/header';
import Tree from './components/tree';
import Map from './components/map';
import Blog from './components/blog';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
            <Header />
            <Routes>
                <Route path="/tree" element={<Tree />} />
                <Route path="/map" element={<Map />} />
                <Route path="/blog" element={<Blog />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
