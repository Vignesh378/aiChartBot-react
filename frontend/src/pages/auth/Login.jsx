import React,{useState} from 'react'
import {
    Eye,
    EyeOff,
    Loader2,
    Mail,
    Lock,
    Bot
    ,ArrowRight,
} from "lucide-react";
import {API_PATHS} from "../../utils/apiPath.js";
import {useAuth} from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance.js";
import { useNavigate } from 'react-router-dom';
import { validatePassword,validateEmail } from '../../utils/helper.js';
function Login() {

    const {login}=useAuth();
    const  navigate=useNavigate();

    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });
    const [showPassword,setShowPassword]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState("");
    const[sucess,setSucess]=useState("");
    const [fieldErrors,setfieldErrors]=useState({
        email:"",
        password:"",
    });
    const [touched,setTouched]=useState({
        email:false,
        password:false,
        
    });

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }));

        //REal-time validation
        if(touched[name]){
            const newFieldErrors={
                ...fieldErrors
            };
            if(name==="email"){
                newFieldErrors.email=validateEmail(value);

            }
            else if(name==="password"){
                newFieldErrors.password=validatePassword(value);

            }
            setfieldErrors(newFieldErrors);

        }

        if(error) setError("") ;

    }
    const handleBlur=(e)=>{
     const {name}=e.target;
     setTouched((prev)=>({
        ...prev,
        [name]:true,
     }));

     //Validate on blur
     const newFieldErrors={...fieldErrors};
     if(name==="email"){
        newFieldErrors.email=validateEmail(formData.email);

     }
     else if(name==="password"){
        newFieldErrors.password=validatePassword(formData.password);
     }
     setfieldErrors(newFieldErrors);
    }
    const isFormValid=(e)=>{
const emailError=validateEmail(formData.email)
const passwordError=validatePassword(formData.password);
return !emailError &&!passwordError &&formData.email &&formData.password;
    };
    
    
 const handleSubmit = async () => {
  // Validate all fields before submission
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  if (emailError || passwordError) {
    setfieldErrors({
      email: emailError,
      password: passwordError,
    });
    setTouched({
      email: true,
      password: true,
    });
    return;
  }

  setIsLoading(true);
  setError("");
  setSucess("");

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

    if (response.status === 200) {
      const { token } = response.data;

      if (token) {
        setSucess("Login successful!");
        login(response.data, token);

        // Redirect after short delay
        setTimeout(() => {
          window.location.href = "/generate";
        }, 200);
      }
    } else {
      //  When API returns 4xx but not caught by catch
      setError(response.data.message || "Invalid credentials");
    }
  } catch (err) {
    //  Properly handle invalid credentials
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 400) {
        setError("Invalid credentials. Please check your email or password.");
      } else {
        setError(err.response.data.message || "Server error occurred.");
      }
    } else {
      setError("Network error. Please try again later.");
    }
  } finally {
    setIsLoading(false);
  }
};

    return (
       <div className='min-h-screen bg-[#100f0f] flex items-center justify-center px-4'>
        <div className='w-full max-w-sm '>
            {/* header */}
            <div className='text-center mb-8'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl mx-auto mb-6 flex items-center justify-center '>
                <Bot className='w-7 h-7 text-white' />
                </div>
                <h1 className='text-2xl font-semiblod text-white  mb-2'>
                    Login to Your Account
                </h1>
                <p className='text-gray-500 text-sm'>
                    Welcome back to Invoice enerator
                </p>
            </div>
            {/* Form */}
            <div className='space-y-4'>
                {/* Email */}
                <div>
                    <label className='block text-sm font-medium text-gray-600 mb-2'>
                        Email
                    </label>
                    <div className='relative'>
                        <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
                        <input type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-white ${
                            fieldErrors.email &&touched.email
                            ?"border-red-300 focus:ring-red-500"
                            :"border-gray-300 focus:ring-white"
                        } `} 
                        
                        placeholder='Enter your Email'/>

                      

                    </div>
                     {fieldErrors.email && touched.email &&(
                        <p className='mt-1 text-sm text-red-600'>
                            {fieldErrors.email}
                        </p>
                    )}
                </div>
                    {/* password */}
                    <div>
                    <label className='block text-sm font-medium text-gray-600 mb-2'>
                        Password
                    </label>
                    <div className='relative'>
                        <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
                        <input type={showPassword?"text":"password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-white ${
                            fieldErrors.password &&touched.password
                            ?"border-red-300 focus:ring-red-500"
                            :"border-gray-300 focus:ring-white"
                        } `} 
                        
                        placeholder='Enter your password'/>

                        <button type='button'
                        onClick={()=>setShowPassword(!showPassword)}
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:txet-gray-600 transition-colors'>
                            {showPassword?(<EyeOff className='w-5 h-5'/>)
                            :(<Eye className='w-5 h-5'/>)}
                        </button>

                    </div>
                    {fieldErrors.password && touched.password &&(
                        <p className='mt-1 text-sm text-red-600'>
                            {fieldErrors.password}
                        </p>
                    )}
                </div>
                {/* Error/Sucess Message */}
                {
                    error &&(
                        <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                            <p className='text-red-600 text-sm'>
                                {error}
                            </p>
                            </div>
                    )
                }
                {
                    sucess&&(
                        <div className='p-3 bg-green-50 border border-green-200 rounded-lg'>
                            <p className='text-green-600 text-sm'>
                                {sucess}
                            </p>
                            </div>
                    )
                }

                {/* Signup in button */}
                <button 
                type='submit'
                onClick={handleSubmit}
                disabled={isLoading||!isFormValid()}
                className='w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center jstify-center group'>
                    {
                        isLoading?(
                            <>
                            <Loader2 className='w-4 h-4 mr-2 animate-spin'/>
                            Signing in...
                            </>
                        ):(
                            <>
                            Sign in 
                            
                            <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform'/>
                            
                            </>
                        )
                    }


                </button>
            </div>
            {/* Footer */}
            <div className='mt-6 pt-4 border-t  border-gray-200 text-center'>
                <p className='text-sm text-gray-500'>
                    Don't have an account?{" "}
                
                <button
                className='text-white font-medium hover:underline'
                onClick={()=>navigate("/register")}
                >
                    Sign up
                </button>
                </p>

            </div>

          </div>
       

    </div>
  
    
)}

export default Login;
