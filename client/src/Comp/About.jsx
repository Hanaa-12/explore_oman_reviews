import Header from "../Comp/Header";
import Footer from "../Comp/Footer";
import ms from "../assets/ms.png";
import { FaUsers, FaHeart, FaShieldAlt } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f7f6f4", minHeight: "100vh", fontFamily: "serif" }}>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 50px 20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h1 style={{ fontSize: "40px", marginBottom: "15px", color: "#1f1f1f" }}>
              About Us
            </h1>

            <p style={{ fontSize: "20px", lineHeight: "1.6", color: "#222", maxWidth: "600px" }}>
              Explore Oman Reviews is your go-to platform
              <br />
              for discovering and sharing the best places across Oman.
            </p>

            <p style={{ fontSize: "20px", lineHeight: "1.6", color: "#222", maxWidth: "600px", marginTop: "20px" }}>
              Whether it’s a restaurant, a mosque, a hotel,
              <br />
              or a popular attraction, we help you make
              <br />
              better choices through real reviews from real people.
            </p>
          </div>

          <div style={{ flex: 1, textAlign: "center", minWidth: "280px" }}>
            <img
              src={ms}
              alt="Mosque"
              style={{
                width: "100%",
                maxWidth: "350px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #d8d3cd", margin: "0" }} />

     
        <div style={{ padding: "30px 50px 50px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "30px" }}>
            <FaUsers size={40} color="#5d8c49" style={{ marginRight: "20px", marginTop: "5px" }} />
            <div>
              <h2 style={{ fontSize: "28px", marginBottom: "6px", color: "#1f1f1f" }}>
                Our Mission
              </h2>
              <p style={{ fontSize: "19px", lineHeight: "1.5", color: "#222", maxWidth: "700px" }}>
                To help people discover the best places in Oman
                <br />
                by providing honest reviews and trusted ratings.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "30px" }}>
            <FaHeart size={38} color="#5d8c49" style={{ marginRight: "20px", marginTop: "5px" }} />
            <div>
              <h2 style={{ fontSize: "28px", marginBottom: "6px", color: "#1f1f1f" }}>
                Our Community
              </h2>
              <p style={{ fontSize: "19px", lineHeight: "1.5", color: "#222", maxWidth: "700px" }}>
                We’re a community of explorers, food lovers,
                <br />
                and experience sharers who care about quality.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <FaShieldAlt size={38} color="#5d8c49" style={{ marginRight: "20px", marginTop: "5px" }} />
            <div>
              <h2 style={{ fontSize: "28px", marginBottom: "6px", color: "#1f1f1f" }}>
                Our Promise
              </h2>
              <p style={{ fontSize: "19px", lineHeight: "1.5", color: "#222", maxWidth: "700px" }}>
                We’re committed to authenticity, respect,
                <br />
                and providing a safe space for every user.
              </p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}