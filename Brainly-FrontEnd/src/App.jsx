import React from 'react';
import { SignUp } from './pages/SignUp';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { DashBoard } from './pages/dashboard';
import Homepage from './components/Homepage';
import { Features } from './components/Features';




function App() {
return <BrowserRouter>

      

<Routes>

<Route path='/' element={<Homepage />} />
<Route path='/signup' element={<SignUp />} />
<Route path='/signin' element={<SignIn />} />
<Route path='dashboard' element={<DashBoard />} />
<Route path="/features" element={<Features />} />
</Routes>
</BrowserRouter> 

}

export default App
