
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { setUserData, setLoading ,setOtherUsers} from "../redux/userSlice";


const getOtherUsers = () => {
  const { serverUrl } = useContext(ServerContext1);
  const dispatch = useDispatch();
  const othersUsers = useSelector((state) => state.user.othersUsers);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getOtherUser`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(result.data.user));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    if (!othersUsers) {
      fetchUser();
    } else {
      dispatch(setLoading(false));
    }
  }, [othersUsers, serverUrl, dispatch]);
};

export default getOtherUsers;