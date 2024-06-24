import { useContext, useEffect, useState } from 'react'
import { SideBarContext } from '../pages/UserHomePage';
import CreateTeachersComponent from './CreateTeachersComponent';
import ViewTeachersComponent from './ViewTeachersComponent';

const UserTeachers = () => {

  const {toggleSidebar} = useContext(SideBarContext);
  const [teacherViewToggle, setTeacherViewToggle] = useState(true);

  const teacherLinkClasses = `hover:text-orange-600 hover:border-orange-600 border-b-2 h-full flex justify-center items-center cursor-pointer`;


  return (
    <div className={`text-white h-auto overflow-y-scroll w-full ${toggleSidebar ? 'pt-16' : 'pt-3'} px-4 lg:pt-4 transition-all duration-150 pb-20`}>
        <h1 className={`${toggleSidebar ? 'ml-0' : 'ml-8'} text-2xl lg:text-4xl text-yellow-300`}>Create Or View Existing Teachers</h1>
        <div className='h-[5vh] w-full  mt-4 flex justify-around items-center text-xl'>
          <button onClick={() => setTeacherViewToggle(true)} className={ teacherViewToggle ? `border-orange-500 text-orange-500 ${teacherLinkClasses}` : `${teacherLinkClasses}`}>
            <h1>View Teachers</h1>
          </button>
          <button onClick={() => setTeacherViewToggle(false)} className={ !teacherViewToggle ? `border-orange-500 text-orange-500 ${teacherLinkClasses}` : `${teacherLinkClasses}`}>
            <h1>Create Teachers</h1>
          </button>
        </div>
        {teacherViewToggle ? (
          <ViewTeachersComponent />
        ): (
          <CreateTeachersComponent />
        )}
    </div>
  )
}

export default UserTeachers
