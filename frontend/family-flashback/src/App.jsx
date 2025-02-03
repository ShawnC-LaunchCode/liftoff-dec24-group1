import './App.css'
import Header from './components/header';
import Home from './components/home';
import Account from './components/account'
import Tree from './components/tree';
import Map from './components/map';
import History from './components/History'
import Support from './components/support';
import ViewPerson from './components/viewPerson';
import Signup from './components/signup';
import Login from './components/login';
import Footer from './components/footer';
import About from './components/about';
import Privacy from './components/privacy';
import Terms from './components/terms';
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
              <Route path="/history" element={<History />} />
              <Route path="/support" element={<Support />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/person-details" element={<ViewPerson/>}/>
            </Routes>
            <Footer />
          </div>
        </Router>
    </>
  )
}

export default App
