import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
const AdminPage = () => {
  const user = useContext(UserContext);
  if (!user || !user.isadmin) {
    return (<div> Please <Link to="/login">Login</Link> </div>);
  }
  const { photoURL, displayName, email, isadmin } = user;
  console.log("User:", user)
  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">Name: {displayName}</h2>
          <h3 className="italic">Email: {email}</h3>
          <h3 className="italic">Is Admin: {isadmin?"true":"false"}</h3>
        </div>
      </div>
      <button className="w-full py-3 bg-red-600 mt-4 text-white" onClick={() => { auth.signOut() }}>Sign out</button>
    </div>
  )
};

export default AdminPage;