import Header from "../Comp/Header";
import Footer from "../Comp/Footer";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <Header />

      <div
        style={{
          backgroundColor: "#f7f6f4",
          minHeight: "100vh",
          fontFamily: "serif",
          padding: "40px 30px 60px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ paddingBottom: "40px" }}>
            <h1
              style={{
                fontSize: "52px",
                color: "#1f1f1f",
                marginBottom: "18px",
              }}
            >
              Contact Us
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#5d8c49",
                marginBottom: "14px",
              }}
            >
              We’d love to hear from you!
            </p>

            <p
              style={{
                fontSize: "18px",
                color: "#222",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Have a question, suggestion, or need help?
              <br />
              Our team is here for you.
            </p>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #d8d3cd",
              margin: "0 0 30px 0",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <FaEnvelope
                size={34}
                color="#222"
                style={{ marginTop: "8px", minWidth: "34px" }}
              />

              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#1f1f1f",
                    margin: "0 0 8px 0",
                  }}
                >
                  Email
                </h2>

                <a
                  href="mailto:support@exploreoman.com"
                  style={{
                    fontSize: "20px",
                    color: "#222",
                    textDecoration: "none",
                  }}
                >
                  support@exploreoman.com
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <FaPhoneAlt
                size={34}
                color="#222"
                style={{ marginTop: "8px", minWidth: "34px" }}
              />

              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    color: "#1f1f1f",
                    margin: "0 0 8px 0",
                  }}
                >
                  Phone
                </h2>

                <a
                  href="tel:+968987654321"
                  style={{
                    fontSize: "20px",
                    color: "#222",
                    textDecoration: "none",
                  }}
                >
                  +968 987654321
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}