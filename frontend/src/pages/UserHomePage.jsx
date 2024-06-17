import { createContext, useState } from 'react'
import UserSideBar from '../components/UserSideBar'
import UserTeachers from '../components/UserTeachers'


export const SideBarContext = createContext();

const UserHomePage = () => {

  const [toggleSidebar, setToggleSideBar] = useState(false);

  return (
    <SideBarContext.Provider value={{toggleSidebar, setToggleSideBar}}>
      <div className='bg-gray-900 h-[95vh] w-full flex justify-between'>
        <UserSideBar />
        <UserTeachers />
      </div>
    </SideBarContext.Provider>
  )
}

export default UserHomePage
