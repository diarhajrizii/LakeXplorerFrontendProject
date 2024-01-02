import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Assuming you have react-icons installed
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import NavigationBar from "../../components/NavBar";
import setAuthToken from "../../utils/checks/setAuthToken";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post("/api/v1/login", {
        // Pass the login data to the backend API
        email, // Assuming email and password are stored in state
        password,
      });
      const token = response.data;
      localStorage.setItem("accessToken", token);
      setAuthToken(token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error); // Log any errors that occurred
      // Handle login error, such as displaying an error message to the user
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="loginContainer">
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form className="login_form" onSubmit={handleLoginSubmit}>
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
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
