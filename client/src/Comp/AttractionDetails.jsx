import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useSelector } from "react-redux";
import Header from "../Comp/Header";
import Footer from "../Comp/Footer";

export default function AttractionDetails() {
  const { id } = useParams();
  const user = useSelector((state) => state.users.user);

  const [attraction, setAttraction] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
const [editReview, setEditReview] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
const [editForm, setEditForm] = useState({
  comment: "",
  rating: 5,
  image: null
});

  useEffect(() => {
    axios.get(`https://explore-oman-reviews-ley9.onrender.com/attractions/${id}`)
      .then(res => setAttraction(res.data))
      .catch(err => console.log(err));

    axios.get(`https://explore-oman-reviews-ley9.onrender.com/attraction-reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
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
      color: "#3b2a1d",
      fontSize: "22px",
      fontWeight: "700",
    },
    container: {
      paddingTop: "45px",
      paddingBottom: "60px",
    },
    imageBox: {
      width: "100%",
      height: "360px",
      borderRadius: "32px",
      overflow: "hidden",
      boxShadow: "0 22px 50px rgba(70, 45, 20, 0.18)",
      border: "10px solid rgba(255,255,255,0.55)",
      marginBottom: "35px",
    },
    image: {
      height: "100%",
      objectFit: "cover",
      width: "100%",
      display: "block",
    },
    mainCard: {
      border: "1px solid rgba(150, 110, 65, 0.16)",
      borderRadius: "28px",
      backgroundColor: "#fff8ef",
      boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",
      height: "100%",
    },
    mapCard: {
      border: "1px solid rgba(150, 110, 65, 0.16)",
      borderRadius: "28px",
      backgroundColor: "#fff8ef",
      boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",
      height: "100%",
      overflow: "hidden",
    },
    cardBody: {
      padding: "30px",
    },
    title: {
      color: "#2b2118",
      fontWeight: "800",
      fontSize: "36px",
      marginBottom: "15px",
    },
    subtitle: {
      color: "#5a4634",
      fontSize: "18px",
      lineHeight: "1.8",
      marginBottom: "22px",
    },
    infoRow: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "22px",
    },
    pill: {
      backgroundColor: "#f3e4d0",
      color: "#3b2a1d",
      padding: "9px 15px",
      borderRadius: "20px",
      fontWeight: "700",
      fontSize: "15px",
    },
    description: {
      color: "#5a4634",
      fontSize: "16px",
      lineHeight: "1.8",
      marginBottom: "28px",
    },
    button: {
      backgroundColor: "#8b5520",
      border: "none",
      borderRadius: "22px",
      padding: "10px 22px",
      fontWeight: "700",
      boxShadow: "0 8px 20px rgba(139, 85, 32, 0.22)",
    },
    map: {
      border: "0",
      borderRadius: "22px",
      width: "100%",
      height: "300px",
    },
    reviewsCard: {
      border: "1px solid rgba(150, 110, 65, 0.16)",
      borderRadius: "28px",
      backgroundColor: "#fff8ef",
      boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",
    },
    reviewsTitle: {
      color: "#2b2118",
      fontWeight: "800",
      marginBottom: "22px",
    },
    reviewItem: {
      border: "1px solid rgba(150, 110, 65, 0.12)",
      borderRadius: "22px",
      backgroundColor: "#fff",
      boxShadow: "0 8px 20px rgba(70, 45, 20, 0.06)",
      marginBottom: "16px",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#8b5520",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    name: {
      color: "#2b2118",
      fontWeight: "800",
    },
    rating: {
      color: "#a86b24",
      fontWeight: "800",
    },
    comment: {
      color: "#5a4634",
      fontSize: "15px",
      lineHeight: "1.7",
    },
    reviewImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "18px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      marginTop: "10px",
      marginBottom: "15px",
    },
   editButton: {
  backgroundColor: "#8b5520",
  border: "none",
  color: "#fff",
  borderRadius: "20px",
  padding: "8px 18px",
  fontWeight: "700",
  fontSize: "14px",
  boxShadow: "0 6px 15px rgba(139, 85, 32, 0.25)",
  transition: "0.3s",
},
    deleteButton: {
  backgroundColor: "#fff",
  border: "2px solid #8b5520",
  color: "#8b5520",
  borderRadius: "20px",
  padding: "8px 18px",
  fontWeight: "700",
  fontSize: "14px",
  transition: "0.3s",
},
    emptyText: {
      color: "#5a4634",
      fontWeight: "600",
    },
    backButton: {
      backgroundColor: "#f3e4d0",
      border: "none",
      color: "#3b2a1d",
      borderRadius: "22px",
      padding: "10px 22px",
      fontWeight: "700",
    }
  };

  if (!attraction) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

 const handleEdit = (review) => {
  setEditReview(review);
  setEditForm({
    comment: review.comment,
    rating: review.rating,
    image: null
  });
  setShowEdit(true);
};

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`https://explore-oman-reviews-ley9.onrender.com/attraction-reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
  try {
    setLoadingUpdate(true);

    const formData = new FormData();
    formData.append("comment", editForm.comment);
    formData.append("rating", editForm.rating);

    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    const res = await axios.put(
      `https://explore-oman-reviews-ley9.onrender.com/attraction-reviews/${editReview._id}`,
      formData
    );

    // 🔥 تحديث من السيرفر
    setReviews(prev =>
      prev.map(r =>
        r._id === editReview._id ? res.data : r
      )
    );

    setShowEdit(false);
    setEditReview(null);

    setEditForm({
      comment: "",
      rating: 5,
      image: null
    });

  } catch (err) {
    console.log(err);
  } finally {
    setLoadingUpdate(false);
  }
};

  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.container}>
        <Row>
          <Col>
            <div style={styles.imageBox}>
              <img
                src={attraction.image}
                alt={attraction.name}
                style={styles.image}
              />
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md="8">
            <Card style={styles.mainCard}>
              <CardBody style={styles.cardBody}>
                <CardTitle tag="h2" style={styles.title}>
                  {attraction.name}
                </CardTitle>

                <p style={styles.subtitle}>
                  Explore this amazing destination and enjoy a unique experience in Oman.
                </p>

                <div style={styles.infoRow}>
                  <span style={styles.pill}>
                    ⭐ {attraction.averageRating || 0} / 5
                  </span>

                  <span style={styles.pill}>
                    👥 {reviews.length} reviews
                  </span>

                  <span style={styles.pill}>
                    📍 {attraction.location?.name}
                  </span>
                </div>

                <CardText style={styles.description}>
                  {attraction.description}
                </CardText>

                <Button
                  style={styles.button}
                  onClick={() => navigate(`/attractions/${id}/review`)}
                >
                  Write a Review
                </Button>
              </CardBody>
            </Card>
          </Col>

          <Col md="4">
            <Card style={styles.mapCard}>
              <CardBody className="p-3">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${attraction.location?.lat},${attraction.location?.lng}&z=16&output=embed`}
                  style={styles.map}
                  loading="lazy"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card style={styles.reviewsCard}>
              <CardBody style={styles.cardBody}>
                <CardTitle tag="h3" style={styles.reviewsTitle}>
                  ⭐ Visitor Reviews
                </CardTitle>

                {reviews.length === 0 ? (
                  <p style={styles.emptyText}>No reviews yet</p>
                ) : (
                  reviews.map((r) => (
                    <Card key={r._id} style={styles.reviewItem}>
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <div style={styles.avatar}>
                              {r.name?.charAt(0).toUpperCase()}
                            </div>

                            <span style={styles.name}>{r.name}</span>
                          </div>

                          <span style={styles.rating}>
                            ⭐ {r.rating}/5
                          </span>
                        </div>

                        <p style={styles.comment}>
                          {r.comment}
                        </p>

                        {r.image && (
                          <div style={{ maxWidth: "320px" }}>
                            <img
                             src={`https://explore-oman-reviews-ley9.onrender.com${r.image}`}
                              alt="Review"
                              style={styles.reviewImage}
                            />
                          </div>
                        )}

                        {user && user.name === r.name && (
                          <div className="d-flex justify-content-end gap-2">
                            
  <Button
    size="sm"
    style={styles.editButton}
    onClick={() => handleEdit(r)}
  >
     Edit
  </Button>

  <Button
    size="sm"
    style={styles.deleteButton}
    onClick={() => deleteReview(r._id)}
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
                  <Button
                    style={styles.backButton}
                    onClick={() => navigate("/attractions")}
                  >
                    ← Back to Attractions
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {showEdit && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "#fff8ef",
      padding: "25px",
      borderRadius: "20px",
      width: "350px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
    }}>
      <h5 style={{ marginBottom: "15px" }}>Edit Review</h5>

      <input
        type="text"
        value={editForm.comment}
        onChange={(e) =>
          setEditForm({ ...editForm, comment: e.target.value })
        }
        placeholder="Comment"
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
  type="number"
  value={editForm.rating}
  min="1"
  max="5"
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 5) {
      setEditForm({ ...editForm, rating: value });
    }
  }}
  style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
/>

      <input
        type="file"
        onChange={(e) =>
          setEditForm({ ...editForm, image: e.target.files[0] })
        }
        style={{ marginBottom: "15px" }}
      />

      <div className="d-flex justify-content-end gap-2">
        <Button
  style={styles.deleteButton}
  onClick={() => {
  setShowEdit(false);
  setEditReview(null);
}}
>
  Cancel
</Button>

        <Button
  style={styles.editButton}
  onClick={handleUpdate}
  disabled={loadingUpdate}
>
  {loadingUpdate ? "Saving..." : "Save"}
</Button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </div>
  );
}
