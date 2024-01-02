import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import NavigationBar from "../../components/NavBar";
import AddLakeSightingModal from "../../modals/AddLakeSightingModal";
import { isAuthenticated } from "../../utils/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const path = `http://localhost:5000/`;

const LakeSightings = () => {
  const [lake, setLake] = useState({});
  const { lakeId } = useParams();
  const [sightings, setSightings] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchLakeDetails = async () => {
    try {
      const { data: response } = await axios.get(`/api/v1/lakes/${lakeId}`);
      setLake(response.data);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error fetching lake details:", error);
    }
  };

  const fetchLakeSightings = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/v1/lake/sightings/${lakeId}`
      );
      setSightings(response.data);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error fetching lake sightings:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const { data: response } = await axios.get(
        "/api/v1/lake/sightings/likes"
      );
      setLikes(response.data);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error fetching likes:", error);
    }
  };

  const checkAuthentication = async () => {
    const { isValid, user_id } = await isAuthenticated(); // Check authentication status
    setAuthenticated(isValid);
    setCurrentUserId(user_id);
  };

  useEffect(() => {
    checkAuthentication();
    fetchLakeDetails();

    fetchLakeSightings();
    if (authenticated) {
      fetchLikes();
    }
  }, [authenticated]);

  const updateSightings = (newSighting) => {
    setSightings([...sightings, newSighting]);
    setShowModal(false);
  };

  const userLikedSightings = sightings.map((sighting) => {
    const isLiked = likes.some((like) => like.lake_sighting_id === sighting.id);
    return { ...sighting, isLiked };
  });

  const handleLike = async (sightingId) => {
    try {
      const isAlreadyLiked = likes.some(
        (like) => like.lake_sighting_id === sightingId
      );

      if (isAlreadyLiked) {
        await axios.delete(`/api/v1/lake/sightings/${sightingId}/like`);
      } else {
        await axios.post(`/api/v1/lake/sightings/${sightingId}/like`);
      }

      const { data: response } = await axios.get(
        "/api/v1/lake/sightings/likes"
      );
      setLikes(response.data);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async (sightingId) => {
    try {
      await axios.delete(`/api/v1/lake/sightings/${sightingId}`);
      const updatedSightings = sightings.filter(
        (sighting) => sighting.id !== sightingId
      );
      setSightings(updatedSightings);
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error deleting sighting:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <ToastContainer />
      <Container className="lakeSightingsContainer">
        <AddLakeSightingModal
          show={showModal}
          onHide={() => setShowModal(false)}
          lakeId={lakeId}
          updateSightings={updateSightings}
          userId={currentUserId}
        />
        <div className="mt-4 text-center">
          <div className="lakeName" style={{ marginTop: "20px" }}>
            {lake.name}
          </div>
          <img
            className="lakeImage"
            src={`${path}${lake.image}`}
            alt={lake.name}
          />
          <div className="lakeDescription">{lake.description}</div>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-4">
          <h3>Lake Sightings</h3>
          {authenticated && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowModal(true)}
              style={{ display: authenticated ? "block" : "none" }}
            >
              Add Lake Sighting
            </Button>
          )}
        </div>
        {userLikedSightings.length > 0 && (
          <Row>
            {userLikedSightings.map((sighting) => (
              <Col
                key={sighting.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <Card
                  style={{
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    height: "100%",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`${path}${sighting.image}`}
                    alt={`Sighting ${sighting.id}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Text>Latitude: {sighting.latitude}</Card.Text>
                    <Card.Text>Longitude: {sighting.longitude}</Card.Text>
                    <Card.Text>Fun Fact: {sighting.fun_fact}</Card.Text>
                    <div className="d-flex justify-content-between">
                      {authenticated && (
                        <FaHeart
                          className="like-icon"
                          onClick={() => handleLike(sighting.id)}
                          color={sighting.isLiked ? "red" : "grey"}
                        />
                      )}
                      {authenticated && sighting.user_id === currentUserId && (
                        <FaTrashAlt
                          className="delete-icon"
                          onClick={() => handleDelete(sighting.id)}
                        />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {userLikedSightings.length === 0 && (
          <div className="lake_sightings_status">
            No lake sightings available.
          </div>
        )}
      </Container>
    </>
  );
};

export default LakeSightings;
