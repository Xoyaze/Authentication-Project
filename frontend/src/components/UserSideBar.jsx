import { useContext } from 'react';
import { LoggedInContext } from '../pages/AuthProvider';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChalkboardUser, faComment, faComments, faPenNib, faRightFromBracket, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SideBarContext } from '../pages/UserHomePage';

const UserSideBar = () => {

    const {setLoggedIn} = useContext(LoggedInContext);
    const navigate = useNavigate();

    const navClasses = `h-[10%] text-sm lg:h-[15%] w-full rounded hover:bg-gray-700 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center gap-2 cursor-pointer `;

    const logOut = () => {
        try{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setLoggedIn(false);
        toast("Logout successfull.", {className: 'custom-toast'});
        }catch(error){
        toast("Some error occured during logout: " + error, {className: 'custom-toast-fail'});
        }finally{
        navigate('/');
        }
    }

    const {toggleSidebar, setToggleSideBar} = useContext(SideBarContext);



  return (
    <>
        <div className={`h-[5vh] w-[5vw] absolute ${toggleSidebar ? ('left-4 top-4'): ('left-2 top-3')} text-white text-xl lg:hidden z-30 transition-all duration-100`}>
            {toggleSidebar ? (
                <button onClick={() => setToggleSideBar(!toggleSidebar)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            ): (
                <button onClick={() => setToggleSideBar(!toggleSidebar)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            )}
        </div>
        <div className={`lg:hidden h-[5vh] w-full bg-[rgba(0,0,0,0.2)] text-gray-400 absolute top-2 left-0 z-10 ${toggleSidebar ? 'flex' : 'hidden'} justify-end items-center gap-5 pr-5 text-sm transition-all ease duration-200 animation`}>
            <NavLink to='' className='flex justify-center items-center gap-1 hover:text-white'>
                <FontAwesomeIcon icon={faComment} />
                <h1 className=''>Comments</h1>
            </NavLink>
            <NavLink to='teachers' className='flex justify-center items-center gap-1 hover:text-white'>
                <FontAwesomeIcon icon={faChalkboardUser} />
                <h1 className=''>Teachers</h1>
            </NavLink>
            <NavLink to='usercomments' className='flex justify-center items-center gap-1 hover:text-white'> 
                <FontAwesomeIcon icon={faComments} />
                <h1 className=''>Your</h1>
            </NavLink>
            <NavLink to='writecomments' className='flex justify-center items-center gap-1 hover:text-white'> 
                <FontAwesomeIcon icon={faPenNib} />
                <h1 className=''>Write</h1>
            </NavLink>
        </div>
        <div className='text-white h-full w-[50vw] lg:w-[15%] bg-gradient-to-r border-r-2 border-gray-500 p-4 hidden lg:flex justify-between flex-col relative'>
            <div className='h-2/3 w-full flex flex-col gap-5'>
                <NavLink to='teachers' className={({ isActive }) => ( isActive ? `bg-gray-800 text-white ${navClasses}` : `bg-none ${navClasses} `)}>
                    <FontAwesomeIcon icon={faChalkboardUser} />
                    <h1 className=''>Teachers</h1>
                </NavLink>
                <NavLink to='' className={({ isActive }) => ( isActive ? `bg-gray-800 text-white ${navClasses}` : `bg-none ${navClasses} `)}>
                    <FontAwesomeIcon icon={faComment} />
                    <h1 className=''>Comments</h1>
                </NavLink>
                <NavLink to='usercomments' className={({ isActive }) => ( isActive ? `bg-gray-800 text-white ${navClasses}` : `bg-none ${navClasses} `)}>
                    <FontAwesomeIcon icon={faComments} />
                    <h1 className=''>Your Comments</h1>
                </NavLink>
                <NavLink to='writecomments' className={({ isActive }) => ( isActive ? `bg-gray-800 text-white ${navClasses}` : `bg-none ${navClasses} `)}>
                    <FontAwesomeIcon icon={faPenNib} />
                    <h1 className=''>Write Comment</h1>
                </NavLink>
            </div>
            <div className='h-1/3 w-full flex flex-col justify-end'>
                {/* <div className='h-[20%] text-sm lg:h-[30%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center gap-2 cursor-pointer'>
                    <FontAwesomeIcon icon={faTrash} />
                    <h1 className=''>Delete Account</h1>
                </div> */}
                <button onClick={logOut} className='h-[20%] text-sm lg:h-[30%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center gap-2 cursor-pointer '>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <h1 className=''>Log Out</h1>
                </button>
            </div>
        </div>
    
    
    </>
  )
}

export default UserSideBar
