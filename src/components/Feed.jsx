import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/user/feed", {withCredentials:true});
      dispatch(addFeed(res?.data));
    }
    catch(err){
      console.error(err);
      //TODO: ERROR page
    }
  }
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  )
}

export default Feed