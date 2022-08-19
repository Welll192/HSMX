import { Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const token = useSelector(state => state.token)
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!token && (
            <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
      
        <Route path='/profile'exact>
          {token && <UserProfile />}
          {!token && <Redirect to='/auth' />}
        </Route>

        
        <Route path='*'>
          <Redirect to='/profile' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
