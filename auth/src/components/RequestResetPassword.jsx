import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import logo from "../logo/designer-mukesh.png";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://auth-app-api-peach.vercel.app/user/request-reset-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setMessage("Error requesting password reset.");
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      // style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Rest Password</div>

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

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}

        <div className="d-grid justify-content-end"></div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestResetPassword;
