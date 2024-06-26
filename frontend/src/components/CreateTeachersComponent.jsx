import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import api from './apiHandler';
import { TailSpin } from 'react-loader-spinner';

const CreateTeachersComponent = () => {

  const nameRef = useRef(null);
  
  useEffect(() => {
    nameRef.current.focus();
  }, []);


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    semesters: ''
  });

  const hanldeInputs = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.name == '' || formData.description == ''|| formData.semesters == ''){
      toast("Please fill up the form first.", {className: 'custom-toast-fail'});
      return;
    }
    if(formData.name.length > 50){
      toast("The name cannot be the greater than 50 characters", {className: 'custom-toast-fail'});
      console.log(formData.name.length);
      return;
    }
    
    if(formData.description.length > 1600){
      toast("The name cannot be the greater than 1600 characters", {className: 'custom-toast-fail'});
      console.log(formData.description.length);
      return;
    }

    if(formData.semesters.length > 600){
      toast("The semesters field cannot be the greater than 600 characters", {className: 'custom-toast-fail'});
      console.log(formData.semesters.length);
      return;
    }
    try{
      setLoading(true);
      const response = await api.post('teachers/', formData);
      if(response.status == 201){
        toast("The teacher is added.", {className: 'custom-toast'});
      }
    }catch(error){
      toast("Couldn't add the teacher", {className: 'custom-toast-fail'});
      console.log(error)
    }finally{
      setLoading(false);
      setFormData({
        name: '',
        description: '',
        semesters: ''
      });
    }
  }

  return (
    <div className='h-auto w-full text-gray-300 text-3xl mt-5'>
        <form onSubmit={handleSubmit} className='h-[70vh] lg:h-[80vh] w-full mt-8 flex flex-col gap-5 px-6'>
          <div className='text-xl flex flex-col h-[12%] justify-around '>
            <label htmlFor="name">Teacher's Name</label>
            <input ref={nameRef} onChange={hanldeInputs} value={formData.name} className='bg-gray-800 rounded h-2/3 mt-2 focus:outline-none focus:outline-2 focus:outline-gray-600 p-2' type="text" name='name' id='name' autoComplete='off'/>
          </div>
          <div className='text-xl flex flex-col h-[24%] lg:h-[26%] justify-around '>
            <label htmlFor="description">Teacher's Description</label>
            <textarea onChange={hanldeInputs} value={formData.description} className='bg-gray-800 rounded h-2/3 mt-2 focus:outline-none focus:outline-2 focus:outline-gray-600 p-2 resize-none' name="description" id="description" ></textarea>
          </div>
          <div className='text-xl flex flex-col h-[12%] justify-around '>
            <label htmlFor="semesters">Semester(s) he/she teaches</label>
            <input onChange={hanldeInputs} value={formData.semesters} className='bg-gray-800 rounded h-2/3 mt-2 focus:outline-none focus:outline-2 focus:outline-gray-600 p-2' type="text" name='semesters' id='semesters' autoComplete='off'/>
          </div>
          <div className='text-xl flex flex-col h-[5%] lg:h-[10%] justify-center items-center mt-10'>
            <button className={`bg-orange-600 text-black text-2xl rounded h-full w-full hover:bg-orange-500 active:bg-orange-400 flex justify-center items-center ${loading && 'pointer-events-none' }`}>
              {loading ? (<TailSpin color="white" height={24} width={20} /> ) : ('Create')}
            </button>
          </div>
        </form>
    </div>
  )
}

export default CreateTeachersComponent
