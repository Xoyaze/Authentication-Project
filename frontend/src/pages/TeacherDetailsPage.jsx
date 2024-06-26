import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../components/apiHandler';
import { SideBarContext } from './UserHomePage';
import { TailSpin } from 'react-loader-spinner';
import teacher from './../assets/teacher.gif';

const TeacherDetailsPage = () => {
    
  const {toggleSidebar} = useContext(SideBarContext);

    const { teacherId } = useParams();
    const [details, setDetails] = useState([])

    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchFucntion = async() => {
        setLoading(true);
        try{
            const response = await api.get(`teachers/teacherById/?id=${teacherId}`);
            setDetails(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error.response.data);
        }finally{
            setLoading(false);
        }
        }
        fetchFucntion();
    }, [teacherId]);
  
    return (
    <div className='h-auto overflow-y-scroll mb-6  w-full flex flex-col lg:flex-row px-4 text-white text-2xl gap-8'>

        {loading ? (
            <div className={`${toggleSidebar ? 'mt-16' : 'ml-12 mt-1'} text-4xl lg:text-4xl text-gray-400 transition-all duration-100 flex gap-2 items-center`}>
                <h1>Loading...</h1>
                <TailSpin height={30} width={30} color='gray' />
            </div>
        ): (
            <div className='lg:h-[140vh] w-full flex flex-col px-4 text-white text-2xl gap-8 lg:gap-10 lg:mt-6 lg:w-3/4 lg:pb-20'>
                <h1 className={`${toggleSidebar ? 'mt-16' : 'ml-12 mt-1'} text-4xl lg:text-4xl text-yellow-300 transition-all duration-100 lg:mt-4 lg:ml-0 overflow-hidden`}>{details.name}</h1>
                <h1 className='text-orange-400'>Teacher Id: <span className='text-gray-300'>{details.id}</span></h1>
                <div className='h-auto w-[80%] lg:w-full flex flex-col gap-2 text-gray-300'>
                    <h1 className='text-orange-400 w-full'>Teacher Description</h1>
                    <h1 className='text-xl'>{details.description}</h1>
                </div>
                <div className='h-auto w-[80%] flex flex-col gap-2'>
                    <h1 className='text-orange-400'>Semesters They Teach</h1>
                    <h1 className='text-xl text-gray-300'>{details.semesters}</h1>
                </div>
                <div className='h-auto w-[90%] flex justify-start gap-6 text-xl '>
                    <Link to={'/teachers'} className='text-black border-gray bg-orange-500 rounded hover:text-white hover:bg-gray-950 hover:border hover:border-orange-500 py-1 px-3 lg:py-1 lg:px-3 transition-hover duration-100 active:bg-yellow-600 active:text-black'>Go back</Link>
                    <Link to={`/writecomments/${details.id}`} className='text-black border-gray bg-orange-500 rounded hover:text-white hover:bg-gray-950 hover:border hover:border-orange-500 py-1 px-3 lg:py-1 lg:px-3 transition-hover duration-100 active:bg-yellow-600 active:text-black'>Comment</Link>
                </div>
            </div>
        )}
        <div className='transfrom scale-x-[-1] w-1/2 lg:block hidden'>
            <img src={teacher} alt="" />
        </div>

    </div>
  );
}

export default TeacherDetailsPage;
