import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const path = `http://localhost:5000/`;

const Lakes = () => {
  const [lakes, setLakes] = useState([]);

  useEffect(() => {
    const fetchLakes = async () => {
      try {
        const { data: response } = await axios.get("/api/v1/lakes");
        setLakes(response.data);
      } catch (error) {
        toast.error("Error fetching lakes!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.error("Error fetching lakes:", error);
      }
    };

    fetchLakes();
  }, []);

  return (
    <>
      <NavigationBar />
      <ToastContainer />
      <Container className="lakesContainer">
        <h2 className="mt-4 mb-3">Explore Lakes</h2>
        <Row>
          {lakes.map((lake) => (
            <Col key={lake.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
              <Link to={`/lake-sightings/${lake.id}`}>
                <Card>
                  <Card.Img
                    className="lakeImage"
                    variant="top"
                    src={`${path}${lake.image}`}
                    alt={lake.name}
                  />
                  <Card.Body>
                    <Card.Title>{lake.name}</Card.Title>
                    <Card.Text>{lake.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Lakes;
