export const  validateEmail=(email)=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email) return "email os required";
    if(!emailRegex.test(email)) return "Please enter a valid email address";
    return"";
};

export const validatePassword=(password)=>{
    if(!password) return "password is required";
    if(password.legnth<6) return"password must be at least 6 charcters";
    return "";
};

