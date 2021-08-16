import { Switch, Route, Redirect } from 'react-router-dom';
import {useContext} from 'react';

import Layout from './Components/Layout/Layout';
import UserProfile from './Components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from '../src/store/auth-context';

function App() {
 const AuthCTX=useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
       
        {
        !AuthCTX.isLoggedIn &&
        <Route path='/auth'>
          <AuthPage />
        </Route>
        }
       
        {
        AuthCTX.isLoggedIn &&
          <Route path='/profile'>
              <UserProfile />
          </Route>
        }
          <Route path='*'>
              <Redirect to='/' />
          </Route>

      </Switch>
    </Layout>
  );
}

export default App;
