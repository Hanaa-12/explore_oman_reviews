
import { Link } from "react-router-dom";
export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#fff8ef",
      textAlign: "center",
      padding: "28px 20px",
      fontSize: "17px",
      borderTop: "1px solid rgba(150, 110, 65, 0.18)",
    },
    brand: {
      color: "#2b2118",
      fontWeight: "800",
      marginBottom: "14px",
      fontSize: "20px",
    },
    brandSpan: {
      color: "#a86b24",
    },
    links: {
      display: "flex",
      justifyContent: "center",
      gap: "14px",
      flexWrap: "wrap",
    },
    link: {
      color: "#3b2a1d",
      textDecoration: "none",
      fontWeight: "600",
      padding: "8px 18px",
      borderRadius: "20px",
      backgroundColor: "#f3e4d0",
    }
  };

  return (
    <div style={styles.footer}>
      <div style={styles.brand}>
        Explore <span style={styles.brandSpan}>Oman</span> Reviews
      </div>

      <div style={styles.links}>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/privacy" style={styles.link}>Privacy</Link>
      </div>
    </div>
  );
}