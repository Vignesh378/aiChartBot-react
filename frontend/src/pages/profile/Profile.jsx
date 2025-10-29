import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import {UserRound} from "lucide-react"
function Profile() {
  
  const [userData, setUserData] = useState({ name: "", email: "", bio: "" });
  const { user } = useAuth();
 const [profileLoaded, setProfileLoaded] = useState(false);

useEffect(() => {
  if (user && !profileLoaded) {
    setUserData({
      name: user.name || "",
      email: user.email || "",
    });
    toast.success("Profile loaded successfully");
    setProfileLoaded(true);
  }
}, [user, profileLoaded]);


  


  return (
    <div className="h-[100vh] bg-[#100f0f] text-white flex items-center justify-center ">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-lg p-8 w-full max-w-md ">
        <h2 className=" font-semibold mb-6 flex items-center justify-center h-auto  "><UserRound className="w-6 h-7 text-white  text-2xl " /></h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-lg">{userData.name || "No name provided"}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg">{userData.email || "No email provided"}</p>
          </div>
         
        </div>
        
      </div>
    </div>
  );
}

export default Profile;
