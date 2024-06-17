import React, { useContext } from 'react'
import { SideBarContext } from '../pages/UserHomePage';

const UserTeachers = () => {

  const {toggleSidebar, setToggleSideBar} = useContext(SideBarContext);


  return (
    <div className='text-white h-full w-[85%] p-4'>
        <h1>Teacher compoennts</h1>
    </div>
  )
}

export default UserTeachers
