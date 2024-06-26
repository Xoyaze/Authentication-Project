import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SideBarContext } from './UserHomePage';
import api from '../components/apiHandler';
import { TailSpin } from 'react-loader-spinner';

const CommentDetailPage = () => {
    const { toggleSidebar } = useContext(SideBarContext);
    const { commentId } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [date, setDate] = useState('');
    const [differenceInDays, setDifferenceInDays] = useState('');
    const [differenceInHours, setDifferenceInHours] = useState('');

    useEffect(() => {
        const fetchFunction = async () => {
            setLoading(true);
            try {
                const response = await api.get(`comments/commentById/?id=${commentId}`);
                setDetails(response.data);
                setDate(response.data.created_at);

                // Calculate time difference in days
                const createdAtDate = new Date(response.data.created_at);
                const differenceInMilliseconds = currentDate - createdAtDate;
                const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));  
                setDifferenceInHours(differenceInHours);
                setDifferenceInDays(differenceInDays);
                console.log(response.data);
            } catch (error) {
                console.log(error.response.data);
            } finally {
                setLoading(false);
            }
        };
        fetchFunction();
    }, [commentId, currentDate]); 

    return (
        <div className={`text-white h-auto overflow-y-scroll w-full ${toggleSidebar ? 'pt-16' : 'pt-3'} px-4 lg:pt-4 transition-all duration-150 pb-20`}>
            <h1 className={`${toggleSidebar ? 'ml-0' : 'ml-8'} text-2xl lg:text-4xl text-yellow-300 mb-12`}>Comment Details</h1>
            {loading ? (
                <div className='flex justify-center items-center h-1/2 w-full'>
                    <TailSpin height={60} width={60} color='gray' />
                </div>
            ) : (
                details && (
                    <div className='h-[80vh] w-full px-4 flex flex-col gap-6'>
                        <div className='h-auto w-full flex gap-6 items-end'>
                            <h1 className='text-3xl text-green-500'>{details.user?.username || 'Unknown User'}</h1>
                            <h3 className='text-sm text-gray-500'>{differenceInDays == 0 ? (differenceInHours + ' hours ago') : (differenceInDays + ' days ' + differenceInHours + " hours ago")}</h3>
                        </div>
                        <p className='text-gray-300'>{details.text || 'No comment text available'}</p>
                        <h1>Commented On: <span className='text-yellow-500'>{details.teacher?.name || 'Unknown Teacher'}</span></h1>
                        <Link to={'/'} className='text-black border-gray bg-orange-500 rounded hover:text-white hover:bg-gray-950 hover:border w-1/4 hover:border-orange-500 py-1 px-3 lg:py-1 lg:px-3 transition-hover duration-100 active:bg-yellow-600 active:text-black lg:w-1/12'>Go back</Link>
                    </div>
                )
            )}
        </div>
    );
};

export default CommentDetailPage;
