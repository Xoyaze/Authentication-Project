import { useContext, useEffect, useState } from 'react'
import { SideBarContext } from '../pages/UserHomePage';
import api from './apiHandler';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const CommentsPage = () => {

    const {toggleSidebar} = useContext(SideBarContext);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchComments = async() => {
        setLoading(true);
        try{
          const response = await api.get('comments/');
          console.log(response.data)
          setComments(response.data);
        }catch(error){
          console.log(error.response);
        }finally{
          setLoading(false);
        }
      }
      fetchComments();
    }, []);

    return (
      <div className={`text-white h-auto overflow-y-scroll w-full ${toggleSidebar ? 'pt-16' : 'pt-3'} px-4 lg:pt-4 transition-all duration-150 pb-20`}>
        <h1 className={`${toggleSidebar ? 'ml-0' : 'ml-8'} text-2xl lg:text-4xl text-yellow-300 mb-12`}>See What People Commented</h1>
        {loading ? (
          <div className='h-1/2 w-full flex items-center justify-center'>
            <TailSpin height={60} width={60} color='gray' />
          </div>
        ) : (
        <div className='h-auto w-full flex gap-5 flex-col items-center'>
          {comments.map(comment => (
            <div key={comment.id} className='h-[20vh] lg:h-[24vh] lg:w-5/6 lg:px-6 lg:py-4 w-full bg-[rgba(0,0,12,0.3)] rounded p-2 flex flex-col justify-center'>
              <div className='mb-4'>
                <h1 className='text-xl text-green-500 w-1/2 text-start line-clamp-1 lg:text-2xl'>{comment.user.username}</h1>
              </div>
              <div className='h-[80%] text-gray-300 text-xl'>
                <h1 className='line-clamp-2 lg:line-clamp-1'>{comment.text}</h1>
              </div>
              <div className='h-auto w-full flex justify-between'>
              <Link to={`/${comment.id}`} className='border border-orange-500 text-gray-300 hover:text-white p-1 hover:border-orange-900 active:border-yellow-300 active:text-yellow-300 active:bg-transparent rounded px-2 lg:px-4 transition-hover duration-100'>See Details</Link>
                <h1 className='text-xl text-yellow-500 w-1/2 text-end line-clamp-1'>{comment.teacher.name}</h1>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    )
}

export default CommentsPage;
