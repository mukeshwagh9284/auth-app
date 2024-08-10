import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../logo/designer-mukesh.png";

const Registraion = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dos't match");
      return;
    }
    let data = {
      fname: fname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    setLoading(true);

    axios
      .post(`auth-app-api-peach.vercel.app/user/add`, data)
      .then((res) => {
        alert("ragister succsses");
        // console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Registration</div>

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={fname}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

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
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Confirmpassword</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirmpassword"
            onChange={(e) => setConfirmpassword(e.target.value)}
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
        <div className="d-grid justify-content-end">
          {/* <Button
            className="text-muted px-0"
            variant="link"
            onClick={() => navigate("/request-reset-password")} // Updated to use navigate
          >
            Forgot password?
          </Button> */}
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>

    // <form onSubmit={handleSubmet}>
    //   <div data-mdb-input-init className="form-outline mb-4">
    //     <input
    //       onChange={(e) => setName(e.target.value)}
    //       type="text"
    //       id="form2Example1"
    //       className="form-control"
    //     />
    //     <label className="form-label" htmlFor="form2Example1">
    //       Enter Your Name
    //     </label>
    //   </div>

    //   {/* <!-- Email input --> */}
    //   <div data-mdb-input-init className="form-outline mb-4">
    //     <input
    //       onChange={(e) => setEmail(e.target.value)}
    //       type="email"
    //       id="form2Example1"
    //       className="form-control"
    //     />
    //     <label className="form-label" htmlFor="form2Example1">
    //       Email address
    //     </label>
    //   </div>

    //   {/* <!-- Password input --> */}
    //   <div data-mdb-input-init className="form-outline mb-4">
    //     <input
    //       onChange={(e) => setPassword(e.target.value)}
    //       type="password"
    //       id="form2Example2"
    //       className="form-control"
    //     />
    //     <label className="form-label" htmlFor="form2Example2">
    //       Password
    //     </label>
    //   </div>

    //   <div data-mdb-input-init className="form-outline mb-4">
    //     <input
    //       onChange={(e) => setConfirmpassword(e.target.value)}
    //       type="password"
    //       id="form2Example2"
    //       className="form-control"
    //     />
    //     <label className="form-label" htmlFor="form2Example2">
    //       Confirmpassword
    //     </label>
    //   </div>

    //   <button
    //     type="submit"
    //     data-mdb-button-init
    //     data-mdb-ripple-init
    //     className="btn btn-primary btn-block mb-4"
    //   >
    //     Sign in
    //   </button>

    // </form>
  );
};

export default Registraion;
