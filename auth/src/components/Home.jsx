import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loguser, setLoguser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoguser(localStorage.getItem("userName"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userName");

    setTimeout(() => {
      navigate("/login");
    });
  };
  return (
    <div>
      <h1>wellcome {loguser}</h1>
      <h1>home screen</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
