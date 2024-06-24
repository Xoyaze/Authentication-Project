import { useContext } from 'react'
import { SideBarContext } from '../pages/UserHomePage';

const UserCommentsPage = () => {
  const {toggleSidebar} = useContext(SideBarContext);

  return (
    <div className={`text-white h-full w-[85%] ${toggleSidebar ? 'pt-16' : 'pt-4'} px-4 lg:pt-4 transition-all duration-150`}>
        <h1 className={`${toggleSidebar ? 'ml-0' : 'ml-8'}`}>Your comments here</h1>
    </div>
  )
}

export default UserCommentsPage