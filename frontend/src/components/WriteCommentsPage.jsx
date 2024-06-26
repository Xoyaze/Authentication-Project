import { useContext, useEffect, useRef, useState } from 'react'
import { SideBarContext } from '../pages/UserHomePage';
import { TailSpin } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import api from './apiHandler';
import { toast } from 'react-toastify';

const WriteCommentsPage = () => {
  const {toggleSidebar} = useContext(SideBarContext);
  const teacherIdRef = useRef();
  const commentRef = useRef();
  const { teacherId } = useParams()

  const [formData, setFormData] = useState({
    teacher_id: '',
    text: ''
  })

  useEffect(() => {
    if (teacherId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teacher_id: parseInt(teacherId, 10)
      }));
      commentRef.current.focus();
    } else {
      teacherIdRef.current.focus();
    }
  }, [teacherId]);


  const [nameLoading, setNameLoading] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  useEffect(() => {
    const fetchFucntion = async() => {
      setNameLoading(true);
      if(formData.teacher_id == ''){
        setNameLoading(false);
        return;
      }
      try{
        const teacherToSendID = parseInt(formData.teacher_id, 10);
        const response = await api.get(`teachers/teacherById/?id=${teacherToSendID}`);
        if(response.data.name){
          setTeacherName(response.data.name);
        }
      }catch(error){
        console.log(error.response.data);
        setTeacherName(error.response.data.detail);
      }finally{
        setNameLoading(false);
      }
    }
    fetchFucntion();
  }, [formData.teacher_id]);
  
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'teacherId' ? (value === '' ? '' : parseInt(value)) : value
    }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(formData.teacher_id == '' || formData.text == ''){
      toast("Fill up the form first", {className: 'custom-toast-fail'});
      setLoading(false);
      return;
    }
    const sendData = async() => {
      try{
        const response = await api.post(`comments/`, formData);
        console.log(response.data.detail)
        toast("Created the comment.", {className: 'custom-toast'});  
      }catch(error){
        console.log(error.response);
        toast("Couldn't create the comment: " + error.response.data.detail, {className: 'custom-toast-fail'});
      }finally{
        setLoading(false);
        setFormData({
          teacher_id: '',
          text: ''
        })
      }
    }
    sendData();
  }



  return (
    <div className={`text-white h-auto overflow-y-scroll w-full ${toggleSidebar ? 'pt-16' : 'pt-3'} px-4 lg:pt-4 transition-all duration-150 pb-20`}>
    <h1 className={`${toggleSidebar ? 'ml-0' : 'ml-8'} text-2xl lg:text-4xl text-yellow-300 mb-12`}>Write Comments From Here</h1>
    <div>
    <form onSubmit={handleSubmit} className='h-[70vh] lg:h-[80vh] w-full mt-8 flex flex-col gap-4 px-2'>
          <div className='text-xl flex flex-col h-[20%] lg:h-[20%] gap-4'>
            {nameLoading ? (
                <TailSpin height={24} width={24} color='gray' />
              ): (
                <h1 className='text-2xl text-yellow-500'>{teacherName || "Teacher's Name Appears Here"}</h1>
            )}
            <input placeholder='Enter the teacher id' onChange={handleInputs} ref={teacherIdRef} value={formData.teacher_id} className='bg-gray-800 rounded h-[40%] mt-2 focus:outline-none focus:outline-2 focus:outline-gray-600 p-2' type="number" name='teacher_id' id='teacher_id' autoComplete='off'/>
          </div>
          <div className='text-xl flex flex-col h-[40%] lg:h-[50%] justify-around'>
            <label htmlFor="text">Your Comment</label>
            <textarea onChange={handleInputs} value={formData.text} ref={commentRef} className='bg-gray-800 rounded h-2/3 mt-2 focus:outline-none focus:outline-2 focus:outline-gray-600 p-2 resize-none' name="text" id="text" ></textarea>
          </div>
          <div className='text-xl flex flex-col h-[5%] lg:h-[10%] justify-center items-center mt-10'>
            <button className={`bg-orange-600 text-black text-2xl rounded h-full w-full hover:bg-orange-500 active:bg-orange-400 flex justify-center items-center ${loading && 'pointer-events-none' }`}>
              {loading ? (<TailSpin color="white" height={24} width={24} />) : ('Create')}
            </button>
          </div>
        </form>
    </div>
</div>
  )
}

export default WriteCommentsPage
