import Header from "../Comp/Header";
import Footer from "../Comp/Footer";
import ms from "../assets/ms.png";
import { FaUsers, FaGlobe } from "react-icons/fa";

export default function Developers() {
  return (
    <>
      <Header />

      <div
        style={{
          backgroundColor: "#f7f6f4",
          minHeight: "100vh",
          fontFamily: "serif",
          padding: "35px 25px 60px",
        }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
         
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h1
                style={{
                  fontSize: "52px",
                  color: "#1f1f1f",
                  marginBottom: "18px",
                }}
              >
                Developers
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#222",
                  lineHeight: "1.6",
                  marginBottom: "18px",
                  maxWidth: "520px",
                }}
              >
                This page presents the development team
                <br />
                behind Explore Oman Reviews.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  color: "#222",
                  lineHeight: "1.6",
                  maxWidth: "520px",
                  margin: 0,
                }}
              >
                The project was collaboratively designed
                <br />
                and implemented by all team members.
              </p>
            </div>

            <div style={{ flex: 1, textAlign: "center", minWidth: "280px" }}>
              <img
                src={ms}
                alt="Mosque illustration"
                style={{
                  width: "100%",
                  maxWidth: "340px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#e8e4df",
              borderRadius: "18px",
              padding: "25px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "30px",
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <div style={{ flex: 2, minWidth: "280px" }}>
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "14px",
                  color: "#1f1f1f",
                }}
              >
                Development Team
              </h2>

              <p
                style={{
                  fontSize: "17px",
                  color: "#222",
                  lineHeight: "1.6",
                  maxWidth: "650px",
                  margin: 0,
                }}
              >
                We worked together on all aspects of the project
                including design, development, and database implementation.
                Each member contributed to building the user interface,
                system functionality, and the overall user experience.
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minWidth: "220px",
                textAlign: "center",
              }}
            >
              <FaUsers size={56} color="#6b9b50" style={{ marginBottom: "14px" }} />

              <div
                style={{
                  fontSize: "19px",
                  color: "#1f1f1f",
                  lineHeight: "1.7",
                }}
              >
                <div>Hanaa Alsiyabi</div>
                <div>Salma Alhadi</div>
                <div>Hajir Almammary</div>
              </div>
            </div>
          </div>

          
          <div style={{ paddingLeft: "10px" }}>
            <h2
              style={{
                fontSize: "32px",
                color: "#1f1f1f",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Tools <FaGlobe size={24} />
            </h2>

            <ul
              style={{
                fontSize: "18px",
                color: "#222",
                lineHeight: "1.7",
                marginTop: 0,
                paddingLeft: "24px",
              }}
            >
              <li>
                <strong>Figma</strong> – UI/UX Design
              </li>
              <li>
                <strong>Visual Studio Code</strong> – Code Editor
              </li>
              <li>
                <strong>React</strong> – Front-End Framework
              </li>
              <li>
                <strong>Bootstrap</strong> – CSS Framework
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}