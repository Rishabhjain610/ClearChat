import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { setUserData, setLoading, setOtherUsers } from "../redux/userSlice";

const getMessages = () => {
  const { serverUrl } = useContext(ServerContext1);
  const dispatch = useDispatch();
  const othersUsers = useSelector((state) => state.user.othersUsers);
  const userData = useSelector((state) => state.user.userData);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
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
  }, [userData, othersUsers, serverUrl, dispatch]);
};

export default getMessages;
