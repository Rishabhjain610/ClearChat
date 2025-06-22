import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { setUserData } from "../redux/userSlice";

// Custom hook to fetch and set the current user
const useCurrentUser = () => {
  const { serverUrl } = useContext(ServerContext1);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getUser`, {
          withCredentials: true,
        });
        console.log("Fetched user data:", result.data.user);
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    
    if (!userData) {
      fetchUser();
    }
  }, [userData, serverUrl, dispatch ]);
};

export default useCurrentUser;