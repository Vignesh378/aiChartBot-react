import React,{use, useState} from 'react'
import {
    Eye,
    EyeOff,
    Loader2,
    Mail,
    Lock
    ,FileText,ArrowRight,
    User,
    Bot,
} from "lucide-react";
import {API_PATHS} from "../../utils/apiPath"
import {useAuth} from "../../context/AuthContext"
import axiosInstance from "../../utils/axiosInstance.js"
import { useNavigate } from 'react-router-dom';
import { validatePassword,validateEmail } from '../../utils/helper';

function SignUp() {
    const {login}=useAuth();
    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState("");
    const [sucess,setSucess]=useState("");
    const [fieldErrors,setFieldErrors]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const [touched,setTouched]=useState({
        name:false,
        email:false,
        password:false,
        confirmPassword:false,
    });

    //Validation functions
    const validateName=(name)=>{
        if(!name) return "Name is required";
        if(name.length<2)return "Name must be at least 2 characters";
        if(name.length>50)return "Name must be less than 50 characters";
        return "";
    };
    const validateConfirmPassword=(confirmPassword,password)=>{
        if(!confirmPassword) return "Please confirm your password"
        if(confirmPassword!==password) return "Password do not match"

    };
    const handleBlur=(e)=>{
        const {name}=e.target;
        setTouched((prev)=>({
            ...prev,
            [name]:true,
        }))
        //validate on blur
        const newFieldErrors={...fieldErrors};
        if(name==="name"){
            newFieldErrors.name=validateName(formData.name);
        }
        else if(name==='email'){
            newFieldErrors.email=validateEmail(formData.email);
        }
        else if(name==="password"){
            newFieldErrors.password=validatePassword(formData.password)
        }
        else if(name==="confirmPassword"){
            newFieldErrors.confirmPassword=validateConfirmPassword(
                formData.confirmPassword,
                formData.password

            )
        }
        setFieldErrors(newFieldErrors);
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }))
        //real-time validation
        if(touched[name]){
            const newFieldErrors={...fieldErrors};
            if(name==="name"){
                newFieldErrors.name=validateName(value);
            }
            else if(name==="email"){
               newFieldErrors.email=validateEmail(value);  
            }
            else if(name==="password"){
                newFieldErrors.password=validatePassword(value)

                // Also revalidate confirm opassword if it's been touched
                if(touched.confirmPassword){
                    newFieldErrors.confirmPassword=validateConfirmPassword(
                        formData.confirmPassword,
                        value
                    );
                }
            } else if(name==='confirmPassword'){
                newFieldErrors.confirmPassword=validateConfirmPassword(
                    value,
                    formData.password
                );

            }
            setFieldErrors(newFieldErrors);
        }

        if(error) setError("");
    };

    const isFormValid=()=>{
        const nameError=validateName(formData.name);
        const emailError=validateEmail(formData.email);
        const passwordError=validatePassword(formData.password);
        const confirmPasswordError=validateConfirmPassword(formData.confirmPassword,formData.password)

        return (
            !nameError &&
            !emailError&&
            !passwordError&&
            !confirmPasswordError&&
            formData.name&&
            formData.email&&
            formData.password&&
            formData.confirmPassword
        );

    };

    const handleSubmit= async()=>{
        //validate all fields before submission
        const nameError=validateName(formData.name);
        const emailError=validateEmail(formData.email);
        const passwordError=validatePassword(formData.password);
        const confirmPasswordError=validateConfirmPassword(formData.confirmPassword,formData.password);

        if(nameError|| emailError||passwordError||confirmPasswordError){
            setFieldErrors({
                name:nameError,
                email:emailError,
                password:passwordError,
                confirmPassword:confirmPasswordError,
            });
            setTouched({
                name:true,
                email:true,
                password:true,
                confirmPassword:true,
            });
            return"";
        }

        setIsLoading(true);
        setError("");
        setSucess("");
        try{
      const response=await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
            name:formData.name,
            email:formData.email,
            password:formData.password,
        }
      );

      const data=response.data;
      const {token,user}=data;

      if(response.status===201){
        setSucess("Account created sucessfully")
//reset form
setFormData({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
});
setTouched({
    name:false,
    email:false,
    password:false,
    confirmPassword:false,
})
//login the user immediately after sucessful registrstion
login(user,token);
navigate("/generate");
        }
        }
        catch(err){
if(err.response &&err.response.data&&err.response.data.message){
    setError(err.response.data.message);
} else{
    setError("Registration failed.Please try again.");
}
  console.error("API error:",err.response||err);
        }
        finally{
             setIsLoading(false); 
        }


    }

    return (
       <div className='min-h-screen bg-[#100f0f] flex items-center justify-center px-4 py-8'>
         <div className='w-full max-w-sm'>
            {/* Header */}
            <div className='text-center mb-8'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl mx-auto mb-6 flex items-center justify-center'>
                   <Bot className='w-6 h-6  text-white'/>
                </div>
                  <h1 className='text-2xl  font-semibold text-white to-blue-900  mb-2'>
                   Create Acount
                 </h1>
                  <p className='text-gray-500 text-sm'> Join Invoice Generator today</p>

            </div>
        
      
         {/* Form */}
         <div className='space-y-4'>
            {/* Name */}
            <div>
                <label className='block text-sm font-medium text-gray-500 mb-2'>
                    Full Name
                </label>
                <div className='relative'>
                    <User className='absolute left-4 top-1/2 transform -translate-y-1/2  text-gray-400 w-5 h-5 '/>
                    <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={` w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-gray-500 ${
                      fieldErrors.name &&touched.name?"border-red-300 focus:ring-red-500"  
                      :"border-gray-300 focus:ring-white"

                    }`
                }
                placeholder='Enter your full name'
                />
            </div>
            {fieldErrors.name&&touched.name &&(
            <p className='mt-1 text-sm text-red-600'>{fieldErrors.name}</p>
            )} 
            </div>
            {/* Email */}
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                </label>
                <div className='relative'>
                    <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 '/>
                    <input 
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none  transition-all  text-gray-500 ${
                        fieldErrors.email && touched.email?
                        "border-red-300 focus:ring-red-500"
                        :"border-gray-300 focus:ring-black"
                    }`}
                    placeholder='Enter your email'
                    />
                 </div>
                 {fieldErrors.email &&touched.email&&(
                  <p className='mt-1 text-sm text-red-600'>{fieldErrors.email}</p>
                 )}
            </div>
            {/* password */}
            <div>
                <label className='block text-sm font-medium txet-gray-700 mb-2'>
                    Password
                </label>
                <div className='relative '>
                    <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 '/>
                    <input
                    name="password"
                    type={showPassword?"text":"password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-all transition-all text-gray-500 ${
                        fieldErrors.password&&touched.password?
                        "border-red-300 focus:ring-red-300"
                        :"border-gray-300 focus:ring-white"

                    }`}
                    placeholder='Create a password'
                    />
                    <button 
                    type='button'
                    onClick={()=>setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 transform  -translate-y-1/2 text-gray-400 hover:txet-grya-600 transition-colors'>
                        {showPassword?(
                           <EyeOff className='w-5 h-5'/> 
                        ):(
                            <Eye  className='w-5 h-5'/>
                        )}
                    </button>

                    
                </div>
                {fieldErrors.password &&touched.password &&(
                    <p className='mt-1 text-sm text-red-600'>
                        {fieldErrors.password}

                    </p>
                )}
            </div>
            {/* Confirm password */}

            <div>
                <label  className='block text-sm font-medium text-gray-700 mb-2'>
                   Confirm password
                </label>
                <div className='relative'>
                     <Lock className='absolute left-4 top-1/2 transform  -translate-y-1/2 text-gray-400 w-5  h-5'/>
                     <input type={showConfirmPassword?"text":"password"} 
                     name="confirmPassword"
                     required
                     value={formData.confirmPassword}
                     onChange={handleInputChange}
                     onBlur={handleBlur}
                     className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-gray-500 ${
                        fieldErrors.confirmPassword && touched.confirmPassword
                        ?"border-red-300 focus:ring-red-500"
                        :"border-gray-300 focus:ring-black"
                     }`}
                     
                     placeholder='confirm your password'/>
                     
                     <button type="button"
                     onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                     className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'>
                        {showConfirmPassword?(
                            <EyeOff  className='w-5 h-5'/>
                        ):(
                            <Eye className='w-5 h-5'/>
                        )}
                     </button>

                </div>
                {fieldErrors.confirmPassword && touched.confirmPassword&&(
                    <p className='mt-1 text-sm text-red-600'>
                        {fieldErrors.confirmPassword}
                    </p>
                )}
            </div>

            {/* Error/sucess Message */}
            {
                error&&(
                    <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-red-600 text-sm'>
                            {error}
                        </p>
                    </div>
                )
            }
            {
                sucess&&(
                    <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                        <p className='text-green-600-600 text-sm'>{sucess}</p>
                    </div>
                )
            }
                  {/* terms & condition */}
                    <div className='flex itmes-start pt-2'>
                        <input type="checkbox"
                        id='terms'
                        className='w-4 h-4 text-black border-fray-300 rounded focus:ring-black mt-1'
                        required />
                        <label htmlFor='terms' className='ml-2 text-sm text-gray-600'>
                            I agreeto the {" "}
                            <button className='text-blue-900 hover:underline'>
                                Terms of Service
                            </button>{" "}
                            and{" "}
                            <button className='text-blue-900 hover:underline'>
                                Privacy policy
                            </button>

                        </label>
                    </div>
                 
              {/* Sign UP Button */}
              <button
              onClick={handleSubmit}
              disabled={isLoading||!isFormValid}
              className='w-full bg-gradient-to-r from-blue-950 to-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed  transition-colors flex items-center jsutify-center  group'>
                {isLoading?(
                    <>
                    <Loader2 className='w-4 h-w mr-2 animate-spin'/>
                    Create Account...
                    </>
                ):(
                    <>
                    Create Account
                    <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform'/>
                    </>
                )}
              </button>
              
            </div>
            {/* Footer */}
            <div className='mt-6 pt-6 border-t border-gray-200 text-center'>
                <p className='text-sm text-gray-600'>
                    Already have a account?{" "}
                    <button className='text-white font-medium hover:underline'
                    onClick={()=>navigate("/login")}>
                        Sign in
                    </button>
                </p>
            </div>

         </div>

       </div>
   
    )
}

export default SignUp
