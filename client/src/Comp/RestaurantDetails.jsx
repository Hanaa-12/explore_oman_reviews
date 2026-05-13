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
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

     
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
    axios.get(`https://explore-oman-reviews-ley9.onrender.com/restaurants/${id}`)
      .then(res => setRestaurant(res.data))
      .catch(err => console.log(err));

    axios.get(`https://explore-oman-reviews-ley9.onrender.com/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
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

      setReviews(prev =>
        prev.map(r =>
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

      setReviews(prev => prev.filter(r => r._id !== deleteId));
      setShowDelete(false);

    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    page: { backgroundColor: "#f7f1e8", minHeight: "100vh" },
    loading: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      fontWeight: "700"
    },
    container: { paddingTop: "45px", paddingBottom: "60px" },
    heroImageBox: {
      height: "360px",
      borderRadius: "32px",
      overflow: "hidden",
      marginBottom: "35px"
    },
    heroImage: { width: "100%", height: "100%", objectFit: "cover" },
    mainCard: {
      borderRadius: "28px",
      backgroundColor: "#fff8ef"
    },
    cardBody: { padding: "30px" },
    title: { fontSize: "32px", fontWeight: "800" },
    pill: {
      backgroundColor: "#f3e4d0",
      padding: "8px 14px",
      borderRadius: "20px",
      fontWeight: "700"
    },
    button: {
      backgroundColor: "#8b5520",
      border: "none",
      borderRadius: "22px"
    },
    reviewsCard: {
      borderRadius: "28px",
      backgroundColor: "#fff8ef"
    },
    reviewItem: {
      borderRadius: "22px",
      marginBottom: "15px"
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#8b5520",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    editButton: {
      backgroundColor: "#8b5520",
      color: "#fff",
      borderRadius: "14px",
      border: "none"
    },
    deleteButton: {
      backgroundColor: "#f3e4d0",
      borderRadius: "14px",
      border: "none"
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
      zIndex: 9999
    },
    modal: {
      background: "#fff8ef",
      padding: "25px",
      borderRadius: "20px",
      width: "350px"
    },
    modalInput: {
      width: "100%",
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "10px"
    }
  };

  if (!restaurant) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.container}>
        <div style={styles.heroImageBox}>
          <img src={restaurant.image} alt="" style={styles.heroImage} />
        </div>

        <Card style={styles.mainCard}>
          <CardBody style={styles.cardBody}>
            <CardTitle style={styles.title}>{restaurant.name}</CardTitle>

            <div className="d-flex gap-2 mb-3">
              <span style={styles.pill}>⭐ {restaurant.averageRating}</span>
              <span style={styles.pill}>👥 {reviews.length}</span>
            </div>

            <CardText>{restaurant.description}</CardText>

            <Button style={styles.button}
              onClick={() => navigate(`/restaurant/${id}/review`)}>
              Write Review
            </Button>
          </CardBody>
        </Card>

      
        <Card className="mt-4" style={styles.reviewsCard}>
          <CardBody>
            <h4>⭐ Reviews</h4>

            {reviews.map(r => (
              <Card key={r._id} style={styles.reviewItem}>
                <CardBody>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2 align-items-center">
                      <div style={styles.avatar}>
                        {r.name?.charAt(0)}
                      </div>
                      <strong>{r.name}</strong>
                    </div>

                    <span>⭐ {r.rating}</span>
                  </div>

                  <p>{r.comment}</p>

                  {user && user.name === r.name && (
                    <div className="d-flex gap-2 justify-content-end">
                      <Button size="sm"
                        style={styles.editButton}
                        onClick={() => openEdit(r)}>
                        Edit
                      </Button>

                      <Button size="sm"
                        style={styles.deleteButton}
                        onClick={() => openDelete(r._id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </CardBody>
        </Card>
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

            <input type="file"
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
