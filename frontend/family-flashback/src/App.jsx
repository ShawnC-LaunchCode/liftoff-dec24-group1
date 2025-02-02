import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Tree from './components/tree';
import Map from './components/map';
import Blog from './components/blog'
import BlogCreate from './components/BlogCreate';
import BlogEdit from './components/BlogEdit';
import Support from './components/support';
import Signup from './components/signup';
import Login from './components/login';
import Footer from './components/footer';
import About from './components/about';
import Privacy from './components/privacy';
import Terms from './components/terms';




function App() {

  const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("session="))
  ?.split("=")[1];

  

  return (
    <>
        <Router>
          <div className='App'>
            <Header />
            <Routes>
              <Route path="/tree" element={<Tree />} />
              <Route path="/map" element={<Map />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/create" element={<BlogCreate />} />
              <Route path="/blog/edit" element={<BlogEdit />} />
              <Route path="/support" element={<Support />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
            <h1>Session ID: {cookieValue}</h1>
            <Footer />
          </div>
        </Router>
    </>
  )
}

export default App
