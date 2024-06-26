import { useEffect, useState } from 'react'
import api from './apiHandler';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
const ViewTeachersComponent = () => {

  
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFucntion = async() => {
      setLoading(true);
      try{
        const response = await api.get('teachers/');
        setTeachers(response.data);
      }catch(error){
        console.log(error.response.data);
      }finally{
        setLoading(false);
      }
    }
    fetchFucntion();
  }, []);


  return (
    <div className='h-auto w-full text-white mt-5 flex justify-center gap-6 flex-wrap'>

      {loading ? (
        <div className='h-[60vh] w-full flex justify-center items-center'>
          <TailSpin color="#00BFFF" height={60} width={60} />
        </div>
      ): (
        <div className='h-auto w-full text-white mt-5 flex justify-center gap-6 flex-wrap'>
          {teachers.map(teacher => (
            <div key={teacher.id} className='h-[20vh] lg:h-[26vh] w-[45%] bg-gray-950 border border-gray-700 rounded-xl mt-10 flex flex-col justify-between p-3 overflow-y-hiden gap-2'>
                <h1 className='text-2xl mt-2 line-clamp-1 text-orange-400'>{teacher.name}</h1>
                <p className=' line-clamp-3 text-gray-300 lg:line-clamp-2'>{teacher.description}</p>
                <div className='flex text-sm justify-between'>
                  <Link to={`/details/${teacher.id}`} className='border border-orange-500 text-gray-300 hover:text-white p-1 hover:border-orange-900 active:border-yellow-300 active:text-yellow-300 active:bg-transparent rounded lg:px-4 transition-hover duration-100'>Details</Link>
                  <Link to={`/writecomments/${teacher.id}`} className='text-black border-gray bg-orange-500 rounded hover:text-white hover:bg-gray-950 hover:border hover:border-orange-500 p-1 lg:px-4 transition-hover duration-100 active:bg-yellow-600 active:text-black'>Comment</Link>
                </div>
            </div>
          ))}
        </div>
      )}


    </div>
  ) 
}

export default ViewTeachersComponent;
