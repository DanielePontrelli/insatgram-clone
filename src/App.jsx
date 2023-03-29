import Header from "./components/Header";
import {Route, Routes} from 'react-router-dom';
import Auth from './pages/Authentication';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Logout from './pages/Logout';
import { authCheck } from './store/actions/handleAuth';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';

function App() {

  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  },[])

  return (
    <div className="App">
      <Header isAuthenticated={token} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path ="/profile" element={<MyProfile />}/>
        <Route exact path="/auth" element={<Auth />}/>
        <Route exact path="/logout" element={<Logout />}/>
      </Routes>
    </div>
  );
}

export default App;
