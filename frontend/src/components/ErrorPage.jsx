import { faCircleArrowLeft, faHome, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  return (
    <div className='h-screen w-screen bg-gray-900 text-3xl text-white flex justify-center items-center flex-col gap-5 text-center'>
      <FontAwesomeIcon className='text-8xl text-red-500 w-2/3' icon={faTriangleExclamation} />
      <h1 className='text-4xl w-2/3 text-red-500'>Sorry the page you're trying to reach doesn't exist or you're not following a proper route.</h1>
      <div className='w-2/3 flex justify-around items-center mt-4'>
        <Link to='' className='flex justify-center items-center gap-2 hover:text-white text-green-500 transition-all duration-100 cursor-pointer text-2xl'>
          <FontAwesomeIcon icon={faHome} />
          <h1>Go Back To Home Page</h1>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
