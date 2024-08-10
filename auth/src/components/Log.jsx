import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios"; // Make sure to import axios if it's used
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import "../styles/login.css";
// import BackgroundImage from "../path/to/background.jpg"; // Import your background image
import logo from "../logo/designer-mukesh.png";
const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for login button
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    axios
      .post(`http://localhost:8080/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // Assuming the response contains the JWT token and user's first name
        const jwtToken = res.data.jwtToken;
        const fname = res.data.fname;
        localStorage.setItem("jwtToken", jwtToken); // Store the token in local storage
        localStorage.setItem("userName", fname);
        alert("Login successful");
        navigate("/home"); // Navigate to the home page

        // Reset the loading state after the login process is complete
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed");
        setLoading(false); // Reset loading state if login fails
      });
  };

  return (
    <div
      className="sign-in__wrapper"
      // style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleLogin}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}

        <div className="d-grid justify-content-start">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => navigate("/reg")} // Updated to use navigate
          >
            Registration
          </Button>
        </div>

        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => navigate("/request-reset-password")} // Updated to use navigate
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default Log;
