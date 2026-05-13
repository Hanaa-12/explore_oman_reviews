import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";
import Header from "../Comp/Header";
import Footer from "../Comp/Footer";

export default function Home() {

  const images = [
    "https://i.pinimg.com/1200x/27/5f/6c/275f6c0381d976a940ce5e1d6892cd7e.jpg",
    "https://i.pinimg.com/1200x/3c/e7/3c/3ce73c742fdd0439c3229997a49e2591.jpg",
    "https://i.pinimg.com/736x/d5/ff/16/d5ff16ab65616f894c3dc40f5f5de26e.jpg"
  ];

  const [index, setIndex] = useState(0);

  const changeImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const styles = {
    page: {
      backgroundColor: "#f7f1e8",
      minHeight: "100vh",
    },
    hero: {
      minHeight: "78vh",
      background:
        "linear-gradient(135deg, #f7f1e8 0%, #ead9c2 55%, #c9a46f 100%)",
      padding: "70px 80px",
      overflow: "hidden",
    },
    contentBox: {
      maxWidth: "560px",
    },
    badge: {
      display: "inline-block",
      backgroundColor: "#fff7ec",
      color: "#9a6424",
      padding: "9px 18px",
      borderRadius: "30px",
      fontSize: "14px",
      fontWeight: "700",
      marginBottom: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    },
    title: {
      fontSize: "60px",
      fontWeight: "800",
      lineHeight: "1.05",
      color: "#2b2118",
      marginBottom: "22px",
    },
    titleSpan: {
      color: "#a86b24",
    },
    text: {
      fontSize: "19px",
      color: "#5a4634",
      lineHeight: "1.8",
      marginBottom: "32px",
    },
    button: {
      width: "58px",
      height: "58px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#8b5520",
      color: "#fff",
      fontSize: "28px",
      boxShadow: "0 12px 28px rgba(139, 85, 32, 0.35)",
    },
    imageBox: {
      width: "100%",
      maxWidth: "700px",
      height: "460px",
      borderRadius: "34px",
      overflow: "hidden",
      boxShadow: "0 28px 60px rgba(56, 38, 20, 0.25)",
      border: "10px solid rgba(255,255,255,0.45)",
      marginLeft: "auto",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  };

  return (
    <div style={styles.page}>
      <Header />

      <Container fluid style={styles.hero}>
        <Row className="align-items-center">

          <Col md="6">
            <div style={styles.contentBox}>
              <span style={styles.badge}>DISCOVER OMAN</span>

              <h1 style={styles.title}>
                Explore the Best <br />
                Places <br />
                <span style={styles.titleSpan}>in Oman.</span>
              </h1>

              <p style={styles.text}>
                Discover restaurants, mosques, and attractions with a beautiful
                experience that helps you find the most amazing places around Oman.
              </p>

              <Button style={styles.button} onClick={changeImage}>
                →
              </Button>
            </div>
          </Col>

          <Col md="6">
            <div style={styles.imageBox}>
              <img
                src={images[index]}
                style={styles.img}
                alt="oman"
              />
            </div>
          </Col>

        </Row>
      </Container>

      <Footer />
    </div>
  );
}