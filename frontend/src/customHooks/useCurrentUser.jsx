
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { setUserData, setLoading } from "../redux/userSlice";

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
        dispatch(setUserData(result.data.user));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    if (!userData) {
      fetchUser();
    } else {
      dispatch(setLoading(false));
    }
  }, [userData, serverUrl, dispatch]);
};

export default useCurrentUser;