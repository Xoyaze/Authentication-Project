import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoggedInContext } from "./AuthProvider";
import { TailSpin } from "react-loader-spinner";

const SignInPage = () => {

  const username = useRef(null);
  useEffect(() => {
    username.current.focus();
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })


  const handleInputs =  (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const {setLoggedIn} = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(formData.username.trim() == "" || formData.password == ""){
      toast("Please fill up the from first.", {className: 'custom-toast-fail'});
      setIsLoading(false);
      return;
    } 

    try{
      const tokenResponse = await axios.post('http://localhost:8000/api/token/', formData);
      const tokenData = tokenResponse.data;
      localStorage.setItem('accessToken', tokenData.access);
      localStorage.setItem('refreshToken', tokenData.refresh);
      toast("Login successfull.", {className: 'custom-toast'});  
      setLoggedIn(true);
      navigate('/')
    }catch(error){
      if(error.response.status == 401){
        toast(error.response.data.detail, {className: "custom-toast-fail"});
        return
      }
      if(error.response.status == 404){
        toast(error.response.data.detail, {className: "custom-toast-fail"});
        return
      }else{
        toast("Some error occurred during login: " + error.response.data.detail, {className: "custom-toast-fail"});
      }
    }finally{
      setFormData({
        username: "",
        password: ""
      })
      setIsLoading(false);
    }
  }




  return (
    <div className='h-[90vh] lg:h-[87vh] w-full flex justify-center bg-gray-900'>
      <form onSubmit={handleSubmit} className='h-[40vh] w-[80%] lg:h-[50vh] lg:w-[30%] bg-gray-400 rounded-2xl mt-10 flex flex-col gap-y-5 justify-center items-center text-white'>
        <h1 className='text-2xl -mt-2 font-bold text-black lg:mt-1'>Sign In From here</h1>
        <input ref={username} name="username" value={formData.username} onChange={handleInputs} type="text" className='bg-gray-900 w-[80%]  focus:outline-none focus:border focus:border-gray-900 placeholder:text-gray-300 p-3 rounded-xl' placeholder='Enter Username'/>
        <input type="password" name="password" value={formData.password} onChange={handleInputs} className='bg-gray-900 w-[80%]  focus:outline-none focus:border focus:border-gray-900 placeholder:text-gray-300 p-3 rounded-xl' placeholder='Enter Password'/>
        <button type='submit' className='bg-gray-900 w-[80%] placeholder:text-gray-300 p-3 rounded-xl active:text-green-500 flex justify-center items-center' >
        {isLoading ? (
            <TailSpin color="#00BFFF" height={24} width={20} />
            ): (
            'Log In'
            )}
          </button>
        <p className="text-black w-[80%]">
         Don't have an account?  
         <NavLink to='/signUp' className='hover:text-blue-900 transition-hover duration-50 underline text-blue-950 ml-1'>
            Sing up from here
          </NavLink>  
        </p>
      </form>
    </div>
  )
}

export default SignInPage;
