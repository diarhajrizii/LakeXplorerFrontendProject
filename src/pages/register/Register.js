import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavBar";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="registerContainer">
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6}>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group
                className="userNameFormGroup"
                controlId="formBasicUsername"
              >
                <Form.Label>Username</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </Form.Group>

              <Form.Group className="emailFormGroup" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </Form.Group>

              <Form.Group
                className="passwordFormGroup"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
              </Form.Group>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
