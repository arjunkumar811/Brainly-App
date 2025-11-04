

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/SignIn';
import { DashBoard } from './pages/dashboard';
import Homepage from './components/Homepage';
import { Features } from './components/Features';
import Signup from './pages/SignUp';
import { SharedBrain } from './pages/SharedBrain';

function App() {
return <BrowserRouter>
<Routes>
<Route path='/' element={<Homepage />} />
<Route path='/signup' element={<Signup />} />
<Route path='/signin' element={<Signin />} />
<Route path='dashboard' element={<DashBoard />} />
<Route path="/features" element={<Features />} />
<Route path="/brain/:shareId" element={<SharedBrain />} />
</Routes>
</BrowserRouter> 

}

export default App
