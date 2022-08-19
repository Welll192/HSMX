import { Link } from 'react-router-dom';
import { obtenerTOKEN } from '../../Redux/Actions';
import { useSelector, useDispatch } from 'react-redux';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const token = useSelector(state => state.token)
  const dispatch = useDispatch();
  return (
    <header className={classes.header}>
      
      <Link to='/'>
        <div className={classes.logo}>HSMX</div>
      </Link>
      <nav>
        <ul>
          {token===""?<>
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          </>:null}
          {token!=="" ? <>
            <li>
              <Link to='/profile'>Contacts</Link>
            </li>
          <li>
            <button onClick={() => dispatch(obtenerTOKEN(""))}>Logout</button>
          </li>
          </>:null}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
