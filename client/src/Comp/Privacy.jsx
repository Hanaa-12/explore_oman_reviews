import Header from "../Comp/Header";
import Footer from "../Comp/Footer";
import { FaUser, FaShieldAlt, FaLock } from "react-icons/fa";

export default function Privacy() {
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
          
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ fontSize: "48px", marginBottom: "15px", color: "#1f1f1f" }}>
              Privacy Policy
            </h1>

            <p style={{ fontSize: "22px", color: "#5d8c49", marginBottom: "10px" }}>
              Your privacy is important to us.
            </p>

            <p style={{ fontSize: "18px", color: "#222", lineHeight: "1.6" }}>
              This Privacy Policy explains how Explore Oman Reviews collects,
              uses, and protects your personal information when you use our website and services.
            </p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #d8d3cd", marginBottom: "30px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
            
            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <FaUser size={34} color="#222" style={{ marginTop: "8px" }} />

              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
                  Information We Collect
                </h2>
                <p style={{ fontSize: "18px", color: "#222" }}>
                  We collect basic information you provide, like your name and email.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <FaShieldAlt size={34} color="#222" style={{ marginTop: "8px" }} />

              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
                  How We Use It
                </h2>
                <p style={{ fontSize: "18px", color: "#222" }}>
                  We use your information to provide and improve our services.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <FaLock size={34} color="#222" style={{ marginTop: "8px" }} />

              <div>
                <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
                  Your Privacy
                </h2>
                <p style={{ fontSize: "18px", color: "#222" }}>
                  We don’t sell your information. We keep it safe and secure.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}