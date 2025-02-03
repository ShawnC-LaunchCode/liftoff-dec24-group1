import './App.css'
import Header from './components/header';
import Home from './components/home';
import Account from './components/account'
import Tree from './components/tree';
import Map from './components/map';
import Blog from './components/blog';
import Support from './components/support';
import Signup from './components/signup';
import Login from './components/login';
import Footer from './components/footer';
import About from './components/about';
import Privacy from './components/privacy';
import Terms from './components/terms';
import BlogEdit from './components/blogEdit';
import BlogCreate from './components/BlogCreate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect} from 'react'

function App() {

  return (
    <>
        <Router>
          <div className='App'>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
              <Route path="/tree" element={<Tree />} />
              <Route path="/map" element={<Map />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/create" element={<BlogCreate />} />
              
              <Route path="/blog/edit" element={<BlogEdit />} />
              <Route path="/support" element={<Support />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
            <Footer />
          </div>
        </Router>
    </>
  )
}

export default App
