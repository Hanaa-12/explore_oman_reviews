import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle } from "reactstrap";

export default function AddHotelReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    comment: "",
    rating: 5,
    image: null
  });

  const submitReview = async (e) => {
    e.preventDefault();

    if (!user?.name || !form.comment) return;

    const data = new FormData();

    data.append("hotelId", id);
    data.append("name", user.name);
    data.append("comment", form.comment);
    data.append("rating", form.rating);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      await axios.post("https://explore-oman-reviews-ley9.onrender.com/hotel-reviews", data);
      navigate(`/hotels/${id}`);
    } catch (err) {
      console.log(err);
      alert("Review not submitted");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #f7f1e8 0%, #ead9c2 60%, #c9a46f 100%)",
      paddingBottom: "70px",
    },
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "70px",
    },
    card: {
      width: "520px",
      border: "1px solid rgba(150, 110, 65, 0.16)",
      borderRadius: "30px",
      backgroundColor: "#fff8ef",
      boxShadow: "0 20px 50px rgba(70, 45, 20, 0.16)",
      overflow: "hidden",
    },
    cardBody: {
      padding: "35px",
    },
    badge: {
      display: "inline-block",
      backgroundColor: "#f3e4d0",
      color: "#8b5520",
      padding: "8px 16px",
      borderRadius: "20px",
      fontWeight: "800",
      fontSize: "13px",
      marginBottom: "16px",
    },
    title: {
      textAlign: "center",
      color: "#2b2118",
      fontWeight: "800",
      marginBottom: "28px",
      fontSize: "30px",
    },
    label: {
      color: "#3b2a1d",
      fontWeight: "700",
      marginBottom: "8px",
    },
    input: {
      borderRadius: "18px",
      border: "1px solid #d5b98e",
      padding: "12px 15px",
      backgroundColor: "#fff",
      color: "#3b2a1d",
      boxShadow: "0 8px 18px rgba(70, 45, 20, 0.05)",
    },
    textarea: {
      borderRadius: "18px",
      border: "1px solid #d5b98e",
      padding: "12px 15px",
      backgroundColor: "#fff",
      color: "#3b2a1d",
      minHeight: "120px",
      boxShadow: "0 8px 18px rgba(70, 45, 20, 0.05)",
    },
    submitButton: {
      backgroundColor: "#8b5520",
      border: "none",
      borderRadius: "22px",
      padding: "12px",
      fontWeight: "800",
      boxShadow: "0 10px 25px rgba(139, 85, 32, 0.25)",
    },
    backButton: {
      backgroundColor: "#f3e4d0",
      color: "#3b2a1d",
      border: "none",
      borderRadius: "22px",
      padding: "12px",
      fontWeight: "800",
    }
  };

  return (
    <div style={styles.page}>
      <Header />

      <Container style={styles.wrapper}>
        <Card style={styles.card}>
          <CardBody style={styles.cardBody}>
            <div className="text-center">
              <span style={styles.badge}>HOTEL REVIEW</span>
            </div>

            <CardTitle tag="h3" style={styles.title}>
              Write Your Review
            </CardTitle>

            <Form onSubmit={submitReview}>
              <FormGroup>
                <Label style={styles.label}>Your Name</Label>
                <Input value={user?.name || ""} disabled style={styles.input} />
              </FormGroup>

              <FormGroup>
                <Label style={styles.label}>Your Comment</Label>
                <Input
                  type="textarea"
                  placeholder="Write your comment"
                  value={form.comment}
                  style={styles.textarea}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label style={styles.label}>Rating</Label>
                <Input
                  type="select"
                  value={form.rating}
                  style={styles.input}
                  onChange={(e) =>
                    setForm({ ...form, rating: Number(e.target.value) })
                  }
                >
                  <option value="5">5 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="1">1 ⭐</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label style={styles.label}>Upload Image Optional</Label>
                <Input
                  type="file"
                  accept="image/*"
                  style={styles.input}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.files[0]
                    })
                  }
                />
              </FormGroup>

              <Button style={styles.submitButton} className="w-100 mb-3" type="submit">
                Submit Review
              </Button>

              <Button
                style={styles.backButton}
                className="w-100"
                onClick={() => navigate(-1)}
                type="button"
              >
                ← Back
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
