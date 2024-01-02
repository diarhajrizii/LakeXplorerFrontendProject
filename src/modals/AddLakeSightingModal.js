import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSightingModal = ({
  show,
  onHide,
  lakeId,
  updateSightings,
  userId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile || !latitude || !longitude) {
        toast.error("Please fill in all fields and select a file.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const { data } = await axios.get(
        `https://api.chucknorris.io/jokes/random`
      );

      const fun_fact = data?.value || "";
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("fun_fact", fun_fact);

      const { data: response } = await axios.post(
        `api/v1/lake/sightings/${lakeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newSighting = {
        id: response.data.lakeSightingId,
        latitude: latitude,
        longitude: longitude,
        image: response.data.imagePath,
        user_id: userId,
        fun_fact,
      };

      updateSightings(newSighting);
      setSelectedFile(null);
      setLatitude("");
      setLongitude("");
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
  });

  return (
    <Modal className="lakeSightingsModal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Sighting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          {...getRootProps()}
          style={{
            border: "1px dashed #ccc",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <div>Selected File: {selectedFile.name}</div>
          ) : (
            <p>Drag and drop a file here, or click to select a file</p>
          )}
        </div>
        <Form.Group controlId="latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSightingModal;
