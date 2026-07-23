import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const {_id, firstName, lastName, age, gender, about, photourl} = user;
  const handleRequest = async (status, userId) => {
    try{
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials:true});
      dispatch(removeFeed(_id));
    }
    catch(err){
      //TODO
      console.error(err.response);
    }
  }
  return (
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src={photourl}
            alt="user-photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName +" "+ lastName}</h2>
          {age && gender &&<p>{age + ", " +gender}</p>}
          {about && <p>{about}</p>}
          {/* {<p>Skills: {skills.map(s => s+" ")}</p>} */}
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={() => handleRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-secondary my-2" onClick={() => handleRequest("interested", _id)}>Interested</button>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
