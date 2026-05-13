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

  
  const [showEdit, setShowEdit] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [editForm, setEditForm] = useState({
    comment: "",
    rating: 5,
    image: null
  });

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    axios
      .get(`https://explore-oman-reviews-ley9.onrender.com/restaurants/${id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`https://explore-oman-reviews-ley9.onrender.com/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

    
  const openEdit = (review) => {
    setEditReview(review);
    setEditForm({
      comment: review.comment,
      rating: review.rating,
      image: null
    });
    setShowEdit(true);
  };

  
  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("comment", editForm.comment);
      data.append("rating", editForm.rating);

      if (editForm.image) {
        data.append("image", editForm.image);
      }

      await axios.put(
        `https://explore-oman-reviews-ley9.onrender.com/reviews/${editReview._id}`,
        data
      );

      setReviews((prev) =>
        prev.map((r) =>
          r._id === editReview._id
            ? { ...r, comment: editForm.comment, rating: editForm.rating }
            : r
        )
      );

      setShowEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

     
  const openDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

    
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://explore-oman-reviews-ley9.onrender.com/reviews/${deleteId}`
      );

      setReviews((prev) => prev.filter((r) => r._id !== deleteId));
      setShowDelete(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      fontWeight: "800",
    },
    rating: {
      color: "#a86b24",
      fontWeight: "800",
    },
    comment: {
      fontSize: "15px",
    },
    smallButton: {
      backgroundColor: "#8b5520",
      border: "none",
      color: "#fff",
      borderRadius: "14px",
      padding: "6px 14px",
    },
    deleteButton: {
      backgroundColor: "#f3e4d0",
      border: "none",
      borderRadius: "14px",
      padding: "6px 14px",
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
      background: "#fff8ef",
      padding: "25px",
      borderRadius: "20px",
      width: "350px",
    },
    modalInput: {
      width: "100%",
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "10px",
    }
  };

  if (!restaurant) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.container}>
        <Row>
          <Col>
            <div style={styles.heroImageBox}>
              <img src={restaurant.image} alt="" style={styles.heroImage} />
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md="8">
            <Card style={styles.mainCard}>
              <CardBody style={styles.cardBody}>
                <CardTitle style={styles.title}>{restaurant.name}</CardTitle>

                <div style={styles.infoRow}>
                  <span style={styles.pill}>⭐ {restaurant.averageRating}</span>
                  <span style={styles.pill}>👥 {reviews.length}</span>
                </div>

                <CardText style={styles.description}>
                  {restaurant.description}
                </CardText>

                <Button
                  style={styles.button}
                  onClick={() => navigate(`/restaurant/${id}/review`)}
                >
                  Write Review
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card style={styles.reviewsCard}>
              <CardBody>
                <h4>⭐ Reviews</h4>

                {reviews.map((r) => (
                  <Card key={r._id} style={styles.reviewItem}>
                    <CardBody>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2 align-items-center">
                          <div style={styles.avatar}>
                            {r.name?.charAt(0)}
                          </div>
                          <span style={styles.name}>{r.name}</span>
                        </div>

                        <span style={styles.rating}>⭐ {r.rating}</span>
                      </div>

                      <p style={styles.comment}>{r.comment}</p>

                      {user && user.name === r.name && (
                        <div className="d-flex gap-2 justify-content-end">
                          <Button
                            size="sm"
                            style={styles.smallButton}
                            onClick={() => openEdit(r)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            style={styles.deleteButton}
                            onClick={() => openDelete(r._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />

    
      {showEdit && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>Edit Review</h5>

            <textarea
              style={styles.modalInput}
              value={editForm.comment}
              onChange={(e) =>
                setEditForm({ ...editForm, comment: e.target.value })
              }
            />

            <select
              style={styles.modalInput}
              value={editForm.rating}
              onChange={(e) =>
                setEditForm({ ...editForm, rating: e.target.value })
              }
            >
              {[1,2,3,4,5].map(n => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <input
              type="file"
              style={styles.modalInput}
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.files[0] })
              }
            />

            <Button onClick={handleUpdate}>Save</Button>
            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
          </div>
        </div>
      )}

      
      {showDelete && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h5>Delete Review?</h5>

            <Button onClick={confirmDelete}>Delete</Button>
            <Button onClick={() => setShowDelete(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
