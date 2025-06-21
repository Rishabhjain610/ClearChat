import { useEffect,useContext } from "react";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";

const getCurrentUser = () => {
  const { serverUrl } = useContext(ServerContext1); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/auth/getUser`, {
          withCredentials: true,
        })
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;