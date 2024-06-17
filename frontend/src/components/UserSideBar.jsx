import { useContext, useState } from 'react';
import { LoggedInContext } from '../pages/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SideBarContext } from '../pages/UserHomePage';

const UserSideBar = () => {

    const {setLoggedIn} = useContext(LoggedInContext);
    const navigate = useNavigate();

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
        {/* <div className={`h-[full] w-[5vw] absolute ${toggleSidebar ? ('left-2 top-2'): (' left-2 top-60')} text-white text-xl`}>
            <FontAwesomeIcon icon={faBars} />
        </div> */}
        <div className='text-white h-full w-[50vw] lg:w-[15%] bg-gradient-to-r border-r border-gray-500 p-4 flex justify-between flex-col relative'>
            <div className='h-2/3 w-full flex flex-col gap-5 mt-10'>
                <div className='h-[10%] text-sm lg:h-[15%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer'>
                    <h1 className=''>Teachers</h1>
                </div>
                <div className='h-[10%] text-sm lg:h-[15%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer'>
                    <h1 className=''>Comments</h1>
                </div>
                <div className='h-[10%] text-sm lg:h-[15%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer'>
                    <h1 className=''>Your Comments</h1>
                </div>
                <div className='h-[10%] text-sm lg:h-[15%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer'>
                    <h1 className=''>Write Comment</h1>
                </div>
            </div>
            <div className='h-1/3 w-full flex flex-col justify-end'>
                <div className='h-[20%] text-sm lg:h-[30%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer'>
                    <h1 className=''>Delete Account</h1>
                </div>
                <button onClick={logOut} className='h-[20%] text-sm lg:h-[30%] w-full rounded hover:bg-gray-800 transition-hover duration-100 text-gray-400 hover:text-white flex justify-center items-center cursor-pointer '>
                    <h1 className=''>Log Out</h1>
                </button>
            </div>
        </div>
    
    
    </>
  )
}

export default UserSideBar
