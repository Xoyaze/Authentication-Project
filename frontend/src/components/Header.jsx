import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { LoggedInContext } from '../pages/AuthProvider';

const Header = () => {

  const {loggedIn} = useContext(LoggedInContext);

  return (
    <div className={`h-[5vh] lg:h-[8vh] lg:pt-2 lg:text-xl bg-gray-900 flex justify-end items-center text-gray-200 pr-5 gap-x-5 ${loggedIn ? ('hidden'): ('')}`}>
        <NavLink className='hover:text-white transition-hover duration-150 cursor-pointer flex justify-center items-center active:text-green-500' to=''>
          <FontAwesomeIcon icon={faHouse} />
          <span className='ml-1'>Home</span>
        </NavLink>
        <NavLink className='hover:text-white px-1 text-black text-md bg-gradient-to-r from-orange-600 to-orange-700 lg:px-4 py-1 border border-white rounded-xl transition-hover duration-150 cursor-pointer flex justify-center items-center active:text-green-500' to='signIn'>
          <span className='ml-1'>Log In</span>
        </NavLink>
    </div>
  )
}

export default Header;