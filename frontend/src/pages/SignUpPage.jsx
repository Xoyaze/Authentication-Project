import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { toast } from "react-toastify";
import axios from "axios";
import { LoggedInContext } from "./AuthProvider";

const SignUpPage = () => {

  const {setLoggedIn} = useContext(LoggedInContext);
  
  const username = useRef(null);
  useEffect(() => {
    username.current.focus();
  }, []);
  
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const handleInputs = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  

  const [rePassword, setRePassword] = useState('');
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
  }

  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if(formData.username.trim() == '' || formData.password.trim() == '' || rePassword.trim() == ''){
      toast("Please fill all of the fields in the form to sign up.", {className: 'custom-toast-fail'});
      setIsLoading(false);
      return;
    }
    
    if(rePassword.trim() !== formData.password.trim()){
      toast("The passwords do not match.", {className: 'custom-toast-fail'});
      setIsLoading(false);
      return;
    }
    
    try{
      const respoonse = await axios.post('http://localhost:8000/api/signup/', formData);
  
      if(!respoonse.status == 201){
        toast("Couldn't register the user.", {className: 'custom-toast-fail'})
        setIsLoading(false);
        return;
      }
      toast("The user is registered.", {className: 'custom-toast'});  
  
  
      try{
        const tokenResponse = await axios.post('http://localhost:8000/api/token/', formData);
        const tokenData = tokenResponse.data;
        localStorage.setItem('accessToken', tokenData.access);
        localStorage.setItem('refreshToken', tokenData.refresh);
        console.log("Access:" + tokenData.access + "Refresh: " + tokenData.refresh);
        toast("Login successfull.", {className: 'custom-toast'});  
        setLoggedIn(true);
        navigate('/')
      }catch(error){
        toast('Log in error: ' + error);
      }
    }catch(error){
      if(error.response.status == 400){
        toast(error.response.data.username[0], {className: 'custom-toast-fail'});
        return;
      }
      toast("Couldn't register the user due to the following error: " + error, {className: 'custom-toast-fail'});
    }finally{
      setIsLoading(false);
    }


    setIsLoading(false);
    setFormData({
      username: "",
      password: ""
    })
    setRePassword('');

  }



  return (
    <div className='h-[90vh] lg:h-[87vh] w-full flex justify-center bg-gray-900'>

      
      <form onSubmit={handleSubmit} className='h-[48vh] w-[80%] lg:h-[60vh] lg:w-[30%] bg-gray-400 rounded-2xl mt-10 flex flex-col gap-y-5 justify-center items-center text-white'>
        <h1 className='text-2xl mt-2 font-bold text-black lg:mt-1'>Sign Up From here</h1>
        <input ref={username} type="text" value={formData.username} onChange={handleInputs} name="username" className='bg-gray-900 w-[80%]  focus:outline-none focus:border focus:border-gray-900 placeholder:text-gray-300 p-3 rounded-xl' placeholder='Enter Username'/>
        <input type="password" value={formData.password} onChange={handleInputs} name="password" className='bg-gray-900 w-[80%]  focus:outline-none focus:border focus:border-gray-900 placeholder:text-gray-300 p-3 rounded-xl' placeholder='Enter Password'/>
        <input type="password" value={rePassword}  onChange={handleRePassword} name="re-password" className='bg-gray-900 w-[80%]  focus:outline-none focus:border focus:border-gray-900 placeholder:text-gray-300 p-3 rounded-xl' placeholder='Re-Enter Password'/>
        <button type='submit' className='bg-gray-900 w-[80%] placeholder:text-gray-300 p-3 rounded-xl active:text-green-500 flex justify-center items-center' >
          {isLoading ? (
            <TailSpin color="#00BFFF" height={24} width={20} />
            ): (
            'Sign Up'
            )}  
        </button>

        <p className="text-black w-[80%]">
         Already have an account ? 
         <NavLink to='/signIn' className='hover:text-blue-900 transition-hover duration-50 underline text-blue-950 ml-1'>
            Sing in from here
          </NavLink>  
        </p>
      </form>
    </div>
  )
}

export default SignUpPage
