import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { useSelector } from "react-redux";
import Header from "../Comp/Header";
import Footer from "../Comp/Footer";

export default function RestaurantDetails() {
  const user = useSelector((state) => state.users.user);
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://explore-oman-reviews-1.onrender.com/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`https://explore-oman-reviews-1.onrender.com/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
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
    heroImageBox: {
      width: "100%",
      height: "360px",
      borderRadius: "32px",
      overflow: "hidden",
      boxShadow: "0 22px 50px rgba(70, 45, 20, 0.18)",
      border: "10px solid rgba(255,255,255,0.55)",
      marginBottom: "35px",
    },
    heroImage: {
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
    smallButton: {
      backgroundColor: "#8b5520",
      border: "none",
      color: "#fff",
      borderRadius: "14px",
      padding: "6px 14px",
      fontWeight: "700",
    },
    deleteButton: {
      backgroundColor: "#f3e4d0",
      border: "none",
      color: "#3b2a1d",
      borderRadius: "14px",
      padding: "6px 14px",
      fontWeight: "700",
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

  if (!restaurant) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  const handleEdit = (review) => {
    const newComment = prompt("Edit your comment:", review.comment);

    if (!newComment) return;

    axios
      .put(`https://explore-oman-reviews-1.onrender.com/reviews/${review._id}`, {
        comment: newComment,
        rating: review.rating
      })
      .then(() => {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === review._id ? { ...r, comment: newComment } : r
          )
        );
      });
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`https://explore-oman-reviews-1.onrender.com/restaurant/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.container}>
        <Row>
          <Col>
            <div style={styles.heroImageBox}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={styles.heroImage}
              />
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md="8">
            <Card style={styles.mainCard}>
              <CardBody style={styles.cardBody}>
                <CardTitle tag="h2" style={styles.title}>
                  {restaurant.name}
                </CardTitle>

                <p style={styles.subtitle}>
                  A popular fast-food restaurant known for its crispy fried chicken and unique blend of spices.
                </p>

                <div style={styles.infoRow}>
                  <span style={styles.pill}>
                    ⭐ {restaurant.averageRating || 0} / 5
                  </span>

                  <span style={styles.pill}>
                    👥 {reviews.length} reviews
                  </span>

                  <span style={styles.pill}>
                    📍 {restaurant.location?.name}
                  </span>
                </div>

                <CardText style={styles.description}>
                  {restaurant.description}
                </CardText>

                <Button
                  style={styles.button}
                  onClick={() => navigate(`/restaurant/${id}/review`)}
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
                  src={`https://www.google.com/maps?q=${restaurant.location?.lat},${restaurant.location?.lng}&z=16&output=embed`}
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
                  ⭐ Customer Reviews
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
                              src={`http://localhost:7500${r.image}`}
                              alt="Review"
                              style={styles.reviewImage}
                            />
                          </div>
                        )}

                        {user && user.name === r.name && (
                          <div className="d-flex justify-content-end gap-2">
                            <Button
                              size="sm"
                              style={styles.smallButton}
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
                    onClick={() => navigate("/restaurants")}
                  >
                    ← Back to Restaurants
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
