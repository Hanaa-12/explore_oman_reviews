import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";
import Header from "../Comp/Header";
import Footer from "../Comp/Footer";

export default function RestaurantDetails() {
  const user = useSelector((state) => state.users.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [editReview, setEditReview] = useState(null);

  const [editForm, setEditForm] = useState({
    comment: "",
    rating: 5,
    image: null,
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get(`https://explore-oman-reviews-ley9.onrender.com/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch(console.log);

    axios
      .get(`https://explore-oman-reviews-ley9.onrender.com/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch(console.log);
  }, [id]);

  const styles = {
    page: {
      backgroundColor: "#f7f1e8",
      minHeight: "100vh",
    },
    loading: {
      backgroundColor: "#f7f1e8",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
      fontWeight: "700",
    },
    container: {
      paddingTop: "40px",
      paddingBottom: "60px",
    },
    heroImageBox: {
      width: "100%",
      height: "360px",
      borderRadius: "30px",
      overflow: "hidden",
      marginBottom: "30px",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    card: {
      borderRadius: "25px",
      background: "#fff8ef",
    },
    title: {
      fontSize: "34px",
      fontWeight: "800",
    },
    pill: {
      background: "#f3e4d0",
      padding: "8px 14px",
      borderRadius: "20px",
      fontWeight: "700",
    },
    button: {
      backgroundColor: "#8b5520",
      border: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      fontWeight: "700",
      color: "#fff",
    },
    backButton: {
      backgroundColor: "#f3e4d0",
      border: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      fontWeight: "700",
    },
    editButton: {
      backgroundColor: "#8b5520",
      border: "none",
      color: "#fff",
      borderRadius: "12px",
      padding: "6px 12px",
      fontWeight: "700",
    },
    deleteButton: {
      backgroundColor: "#f3e4d0",
      border: "none",
      borderRadius: "12px",
      padding: "6px 12px",
      fontWeight: "700",
    },
    reviewCard: {
      borderRadius: "20px",
      marginBottom: "15px",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#8b5520",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modal: {
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      width: "400px",
    },
    map: {
      border: "0",
      borderRadius: "20px",
      width: "100%",
      height: "100%",
      minHeight: "300px",
    },
  };

  if (!restaurant) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const openEdit = (review) => {
    setEditReview(review);
    setEditForm({
      comment: review.comment,
      rating: review.rating,
      image: null,
    });
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    

    await axios.put(
  `https://explore-oman-reviews-ley9.onrender.com/reviews/${editReview._id}`,
  {
    comment: editForm.comment,
    rating: Number(editForm.rating),
  }
);

    setReviews((prev) =>
      prev.map((r) =>
        r._id === editReview._id
          ? { ...r, comment: editForm.comment, rating: Number(editForm.rating), }
          : r
      )
    );

    setShowEdit(false);
  };

  const openDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

 const confirmDelete = async () => {
  try {
    // await axios.delete(
    //   `https://explore-oman-reviews-ley9.onrender.com/reviews/${deleteId}`
    // );
    await axios.delete(
  `https://explore-oman-reviews-ley9.onrender.com/restaurant/${deleteId}`
);

    setReviews((prev) => prev.filter((r) => r._id !== deleteId));
    setShowDelete(false);
  } catch (err) {
    console.log("Delete error:", err);
  }
};
  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.container}>

        {/* HERO */}
        <div style={styles.heroImageBox}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={styles.heroImage}
          />
        </div>

        {/* INFO + MAP (مثل التصميم القديم) */}
        <Row className="g-4">

          <Col md="8">
            <Card style={styles.card}>
              <CardBody>
                <CardTitle style={styles.title}>
                  {restaurant.name}
                </CardTitle>

                <div className="d-flex gap-2 my-3">
                  <span style={styles.pill}>
                    ⭐ {restaurant.averageRating || 0}/5
                  </span>
                  <span style={styles.pill}>
                    👥 {reviews.length} reviews
                  </span>
                  <span style={styles.pill}>
                    📍 {restaurant.location?.name}
                  </span>
                </div>

                <CardText>{restaurant.description}</CardText>

                <Button
                  style={styles.button}
                  onClick={() => navigate(`/restaurant/${id}/review`)}
                >
                  Write Review
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* MAP رجعناه هنا */}
          <Col md="4">
            <Card style={styles.card}>
              <CardBody className="p-3">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${restaurant.location?.lat},${restaurant.location?.lng}&z=16&output=embed`}
                  style={styles.map}
                  loading="lazy"
                />
              </CardBody>
            </Card>
          </Col>

        </Row>

        {/* REVIEWS */}
        <h3 className="mt-4">Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <Card key={r._id} style={styles.reviewCard}>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-2 align-items-center">
                    <div style={styles.avatar}>
                      {r.name?.charAt(0).toUpperCase()}
                    </div>
                    <strong>{r.name}</strong>
                  </div>

                  <span>⭐ {r.rating}/5</span>
                </div>

                <p className="mt-2">{r.comment}</p>

                {r.image && (
                  <img
                    src={`https://explore-oman-reviews-ley9.onrender.com${r.image}`}
                    alt=""
                    style={{ width: "200px", borderRadius: "12px" }}
                  />
                )}

                {user && user.name === r.name && (
                  <div className="d-flex gap-2 justify-content-end mt-2">
                    <Button
                      style={styles.editButton}
                      onClick={() => openEdit(r)}
                    >
                      Edit
                    </Button>

                    <Button
                      style={styles.deleteButton}
                      onClick={() => openDelete(r._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        )}
        <div className="text-center mt-4">

                  <Button style={styles.backButton} onClick={() => navigate("/mosques")}>← Back to Mosques</Button>

                </div>
        

      </Container>

      {/* EDIT MODAL */}
      {showEdit && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>Edit Review</h5>

            <textarea
              className="form-control mb-2"
              value={editForm.comment}
              onChange={(e) =>
                setEditForm({ ...editForm, comment: e.target.value })
              }
            />

            <select
              className="form-control mb-2"
              value={editForm.rating}
              onChange={(e) =>
                setEditForm({ ...editForm, rating: Number(e.target.value) })
              }
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.files[0] })
              }
            />

            <div className="d-flex justify-content-between">
              <Button style={styles.button} onClick={handleUpdate}>
                Save
              </Button>

              <Button
                style={styles.backButton}
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>Delete Review?</h5>

            <div className="d-flex justify-content-between mt-3">
              <Button style={styles.deleteButton} onClick={confirmDelete}>
                Delete
              </Button>

              <Button
                style={styles.backButton}
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
