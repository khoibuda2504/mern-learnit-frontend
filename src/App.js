import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import About from './views/About';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PostContextProvider from './contexts/PostContext';
function App(props) {
  return (
    <PostContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Auth {...props} authRoute='login' />} />
            <Route exact path='/register' element={<Auth {...props} authRoute='register' />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </PostContextProvider>
  );
}

export default App;
