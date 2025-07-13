import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ServerContext1 } from "../context/ServerContext";
import { setUserData, setLoading, setOtherUsers } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const getMessages = () => {
  const { serverUrl } = useContext(ServerContext1);
  const dispatch = useDispatch();
  const othersUsers = useSelector((state) => state.user.othersUsers);
  const userData = useSelector((state) => state.user.userData);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/messages/${selectedUser._id}`, {
          withCredentials: true,
        });
        dispatch(setMessages(result.data.messages));
      } catch (error) {
        dispatch(setLoading(false));
      }
    };
    if (selectedUser && userData) {
  fetchMessages();
}
  }, [selectedUser,userData]);
};

export default getMessages;
