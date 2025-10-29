import React,{createContext,useContext,useState,useEffect} from 'react';


const AuthContext=createContext();

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvide");
    }
    return context;
}


export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    useEffect(()=>{
        checkAuthStatus();
    },[]);

    const checkAuthStatus= async()=>{
        try{
         const token=localStorage.getItem('token');
         const useStr=localStorage.getItem('user')
         if(token &&useStr){
            const userData=JSON.parse(useStr);
            setUser(userData);
            setIsAuthenticated(true);
         }
        }
        catch(err){
            console.error('Auth check failed:',err);
            logout();
        }
        finally{
            setLoading(false);
        }

    };
    const login= (userDate,token)=>{
      localStorage.setItem('token',token)
      localStorage.setItem('user',JSON.stringify(userDate));

      setUser(userDate)
      setIsAuthenticated(true);
    };
    const logout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        setUser(null);
        setIsAuthenticated(false);
        window.location.href='/'

    };
    const updateUser=(updatedUserData)=>{
      const newUserData={...user,...updatedUserData};
      localStorage.setItem('user',JSON.stringify(newUserData))
      setUser(newUserData)
    };

    const value={
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAuthStatus,


    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}