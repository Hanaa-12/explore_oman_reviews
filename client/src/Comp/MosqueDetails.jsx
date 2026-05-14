

import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import { useSelector } from "react-redux";

import Header from "../Comp/Header";

import Footer from "../Comp/Footer";

 

export default function MosqueDetails() {

  const { id } = useParams();

  const user = useSelector((state) => state.users.user);

  const navigate = useNavigate();

 

  const [mosque, setMosque] = useState(null);

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

    axios.get(`https://explore-oman-reviews-ley9.onrender.com/mosques/${id}`)

      .then(res => setMosque(res.data))

      .catch(err => console.log(err));

 

    axios.get(`https://explore-oman-reviews-ley9.onrender.com/mosque-reviews/${id}`)

      .then(res => setReviews(res.data))

      .catch(err => console.log(err));

  }, [id]);

 

  const styles = {

    page: { backgroundColor: "#f7f1e8", minHeight: "100vh" },

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

    container: { paddingTop: "45px", paddingBottom: "60px" },

    heroImageBox: {

      width: "100%",

      height: "360px",

      borderRadius: "32px",

      overflow: "hidden",

      boxShadow: "0 22px 50px rgba(70, 45, 20, 0.18)",

      border: "10px solid rgba(255,255,255,0.55)",

      marginBottom: "35px",

    },

    heroImage: { height: "100%", objectFit: "cover", width: "100%", display: "block" },

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

    cardBody: { padding: "30px" },

    title: { color: "#2b2118", fontWeight: "800", fontSize: "36px", marginBottom: "15px" },

    subtitle: { color: "#5a4634", fontSize: "18px", lineHeight: "1.8", marginBottom: "22px" },

    infoRow: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "22px" },

    pill: {

      backgroundColor: "#f3e4d0",

      color: "#3b2a1d",

      padding: "9px 15px",

      borderRadius: "20px",

      fontWeight: "700",

      fontSize: "15px",

    },

    description: { color: "#5a4634", fontSize: "16px", lineHeight: "1.8", marginBottom: "28px" },

    button: {

      backgroundColor: "#8b5520",

      border: "none",

      borderRadius: "22px",

      padding: "10px 22px",

      fontWeight: "700",

      boxShadow: "0 8px 20px rgba(139, 85, 32, 0.22)",

    },

    map: { border: "0", borderRadius: "22px", width: "100%", height: "300px" },

    reviewsCard: {

      border: "1px solid rgba(150, 110, 65, 0.16)",

      borderRadius: "28px",

      backgroundColor: "#fff8ef",

      boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",

    },

    reviewsTitle: { color: "#2b2118", fontWeight: "800", marginBottom: "22px" },

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

    name: { color: "#2b2118", fontWeight: "800" },

    rating: { color: "#a86b24", fontWeight: "800" },

    comment: { color: "#5a4634", fontSize: "15px", lineHeight: "1.7" },

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

    emptyText: { color: "#5a4634", fontWeight: "600" },

    backButton: {

      backgroundColor: "#f3e4d0",

      border: "none",

      color: "#3b2a1d",

      borderRadius: "22px",

      padding: "10px 22px",

      fontWeight: "700",

    },

  

    overlay: {

      position: "fixed",

      top: 0,

      left: 0,

      width: "100%",

      height: "100%",

      background: "rgba(43, 33, 24, 0.55)",

      display: "flex",

      justifyContent: "center",

      alignItems: "center",

      zIndex: "9999",

      padding: "20px",

    },

    modal: {

      background: "#fff8ef",

      padding: "26px",

      borderRadius: "24px",

      width: "380px",

      boxShadow: "0 25px 60px rgba(0,0,0,0.25)",

      border: "1px solid rgba(150, 110, 65, 0.18)",

    },

    modalTitle: { color: "#2b2118", fontWeight: "800", marginBottom: "18px" },

    modalInput: { borderRadius: "16px", border: "1px solid #d5b98e", padding: "12px", outline: "none" },

    cancelButton: {

      backgroundColor: "#f3e4d0",

      border: "none",

      color: "#3b2a1d",

      borderRadius: "18px",

      padding: "9px 18px",

      fontWeight: "700",

    }

  };

 

  if (!mosque) {

    return <div style={styles.loading}>Loading...</div>;

  }

 

  

  const openEdit = (review) => {

    setEditReview(review);

    setEditForm({

      comment: review.comment || "",

      rating: review.rating || 5,

      image: null

    });

    setShowEdit(true);

  };

 

  const openDelete = (reviewId) => {

    setDeleteId(reviewId);

    setShowDelete(true);

  };

 

  
  const handleUpdate = async () => {

    try {

      const data = new FormData();

      data.append("comment", editForm.comment);

      data.append("rating", editForm.rating);

      if (editForm.image) data.append("image", editForm.image);

 

      await axios.put(

        `https://explore-oman-reviews-ley9.onrender.com/mosque-reviews/${editReview._id}`,

        data,

        { headers: { "Content-Type": "multipart/form-data" } }

      );

 

      setReviews((prev) =>

        prev.map((r) =>

          r._id === editReview._id ? {

            ...r,

            comment: editForm.comment,

            rating: editForm.rating,

            image: editForm.image ? URL.createObjectURL(editForm.image) : r.image

          } : r

        )

      );

      setShowEdit(false);

    } catch (err) {

      console.log(err);

      alert("Update failed");

    }

  };

 

  

  const confirmDelete = async () => {

    try {

     

      await axios.delete(`https://explore-oman-reviews-ley9.onrender.com/mosque-reviews/${deleteId}`);

      setReviews((prev) => prev.filter((r) => r._id !== deleteId));

      setShowDelete(false);

    } catch (err) {

      console.log(err);

      alert("Delete failed");

    }

  };

 

  return (

    <div style={styles.page}>

      <Header />

      <Container style={styles.container}>

        <Row>

          <Col>

            <div style={styles.heroImageBox}>

              <img src={mosque.image} alt={mosque.name} style={styles.heroImage} />

            </div>

          </Col>

        </Row>

 

        <Row className="g-4">

          <Col md="8">

            <Card style={styles.mainCard}>

              <CardBody style={styles.cardBody}>

                <CardTitle tag="h2" style={styles.title}>{mosque.name}</CardTitle>

                <p style={styles.subtitle}>A peaceful place of worship and spirituality.</p>

                <div style={styles.infoRow}>

                  <span style={styles.pill}>⭐ {mosque.averageRating || 0} / 5</span>

                  <span style={styles.pill}>👥 {reviews.length} reviews</span>

                  <span style={styles.pill}>📍 {mosque.location?.name}</span>

                </div>

                <CardText style={styles.description}>{mosque.description}</CardText>

                <Button style={styles.button} onClick={() => navigate(`/mosque/${id}/review`)}>

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

                  src={`https://www.google.com/maps?q=${mosque.location?.lat},${mosque.location?.lng}&z=16&output=embed`}

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

                <CardTitle tag="h3" style={styles.reviewsTitle}>⭐ Customer Reviews</CardTitle>

                {reviews.length === 0 ? (

                  <p style={styles.emptyText}>No reviews yet</p>

                ) : (

                  reviews.map((r) => (

                    <Card key={r._id} style={styles.reviewItem}>

                      <CardBody>

                        <div className="d-flex justify-content-between align-items-center mb-3">

                          <div className="d-flex align-items-center gap-2">

                            <div style={styles.avatar}>{r.name?.charAt(0).toUpperCase()}</div>

                            <span style={styles.name}>{r.name}</span>

                          </div>

                          <span style={styles.rating}>⭐ {r.rating}/5</span>

                        </div>

                        <p style={styles.comment}>{r.comment}</p>

                        {r.image && (

                          <div style={{ maxWidth: "320px" }}>

                            <img

                              src={r.image.startsWith('blob') ? r.image : `https://explore-oman-reviews-ley9.onrender.com${r.image}`}

                              alt="Review"

                              style={styles.reviewImage}

                            />

                          </div>

                        )}

                        {user && user.name === r.name && (

                          <div className="d-flex justify-content-end gap-2">

                            <Button size="sm" style={styles.smallButton} onClick={() => openEdit(r)}>Edit</Button>

                            <Button size="sm" style={styles.deleteButton} onClick={() => openDelete(r._id)}>Delete</Button>

                          </div>

                        )}

                      </CardBody>

                    </Card>

                  ))

                )}

                <div className="text-center mt-4">

                  <Button style={styles.backButton} onClick={() => navigate("/mosques")}>← Back to Mosques</Button>

                </div>

              </CardBody>

            </Card>

          </Col>

        </Row>

      </Container>

      <Footer />

 

      

      {showEdit && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h5 style={styles.modalTitle}>Edit Review</h5>

            <textarea

              className="form-control mb-2"

              style={styles.modalInput}

              value={editForm.comment}

              onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}

            />

            <select

              className="form-control mb-2"

              style={styles.modalInput}

              value={editForm.rating}

              onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}

            >

              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}

            </select>

            <input

              type="file"

              className="form-control mb-3"

              style={styles.modalInput}

              onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}

            />

            <div className="d-flex justify-content-between">

              <Button style={styles.button} onClick={handleUpdate}>Save</Button>

              <Button style={styles.cancelButton} onClick={() => setShowEdit(false)}>Cancel</Button>

            </div>

          </div>

        </div>

      )}

 

     

      {showDelete && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h5 style={styles.modalTitle}>Delete Review</h5>

            <p style={styles.description}>Are you sure you want to delete this review?</p>

            <div className="d-flex justify-content-between">

              <Button style={styles.smallButton} onClick={confirmDelete}>Delete</Button>

              <Button style={styles.cancelButton} onClick={() => setShowDelete(false)}>Cancel</Button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


