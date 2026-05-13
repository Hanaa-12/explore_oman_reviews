import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Comp/Header";
import Footer from "../Comp/Footer";
import { Container, Row, Col, Card, CardBody, CardImg, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Attractions() {

    const [attractions, setAttractions] = useState([]);
    const [sorted, setSorted] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        const filtered = attractions.filter(r =>
            r.name.toLowerCase().includes(search.toLowerCase())
        );
        setSorted(filtered);
    };

    useEffect(() => {
        axios.get("https://explore-oman-reviews-ley9.onrender.com/attractions")
            .then(res => {
                console.log("DATA:", res.data);

                setAttractions(res.data);
                setSorted(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const sortHigh = () => {
        const sortedData = [...attractions].sort((a, b) => b.averageRating - a.averageRating);
        setSorted(sortedData);
    };

    const sortLow = () => {
        const sortedData = [...attractions].sort((a, b) => a.averageRating - b.averageRating);
        setSorted(sortedData);
    };

    const resetSort = () => {
        setSorted(attractions);
    };

    const styles = {
        page: {
            backgroundColor: "#f7f1e8",
            minHeight: "100vh",
        },
        heroSection: {
            background:
                "linear-gradient(135deg, #f7f1e8 0%, #ead9c2 60%, #c9a46f 100%)",
            padding: "65px 20px 55px",
            textAlign: "center",
            borderBottom: "1px solid rgba(150, 110, 65, 0.18)",
        },
        badge: {
            display: "inline-block",
            backgroundColor: "#fff7ec",
            color: "#9a6424",
            padding: "9px 18px",
            borderRadius: "30px",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "18px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        },
        title: {
            fontSize: "48px",
            fontWeight: "800",
            color: "#2b2118",
            marginBottom: "14px",
        },
        titleSpan: {
            color: "#a86b24",
        },
        subtitle: {
            fontSize: "18px",
            color: "#5a4634",
            maxWidth: "650px",
            margin: "0 auto",
            lineHeight: "1.7",
        },
        controlBox: {
            backgroundColor: "#fff8ef",
            padding: "24px",
            borderRadius: "26px",
            boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",
            border: "1px solid rgba(150, 110, 65, 0.16)",
            marginTop: "-35px",
            position: "relative",
            zIndex: "5",
        },
        filterButtons: {
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "22px",
        },
        button: {
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "22px",
            padding: "10px 20px",
            fontWeight: "700",
            boxShadow: "0 8px 20px rgba(139, 85, 32, 0.22)",
        },
        resetButton: {
            backgroundColor: "#f3e4d0",
            color: "#3b2a1d",
            border: "none",
            borderRadius: "22px",
            padding: "10px 20px",
            fontWeight: "700",
        },
        searchRow: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
        },
        input: {
            padding: "13px 18px",
            width: "100%",
            maxWidth: "620px",
            borderRadius: "22px",
            border: "1px solid #d5b98e",
            backgroundColor: "#fff",
            color: "#3b2a1d",
            outline: "none",
            fontSize: "16px",
            boxShadow: "0 8px 20px rgba(70, 45, 20, 0.06)",
        },
        searchButton: {
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#8b5520",
            color: "#fff",
            fontSize: "18px",
            boxShadow: "0 8px 20px rgba(139, 85, 32, 0.25)",
        },
        listContainer: {
            paddingTop: "45px",
            paddingBottom: "60px",
        },
        card: {
            border: "1px solid rgba(150, 110, 65, 0.16)",
            borderRadius: "26px",
            backgroundColor: "#fff8ef",
            overflow: "hidden",
            boxShadow: "0 14px 35px rgba(70, 45, 20, 0.10)",
        },
        image: {
            width: "190px",
            height: "140px",
            objectFit: "cover",
            borderRadius: "22px",
        },
        cardBody: {
            padding: "18px 24px",
        },
        attractionName: {
            color: "#2b2118",
            fontWeight: "800",
            marginBottom: "10px",
            fontSize: "22px",
        },
        rating: {
            color: "#a86b24",
            fontWeight: "700",
            marginBottom: "0",
            fontSize: "16px",
        },
        detailsButton: {
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "22px",
            padding: "10px 20px",
            fontWeight: "700",
            boxShadow: "0 8px 20px rgba(139, 85, 32, 0.22)",
        },
        emptyText: {
            textAlign: "center",
            color: "#5a4634",
            fontSize: "18px",
            marginTop: "35px",
            fontWeight: "600",
        }
    };

    return (
        <div style={styles.page}>
            <Header />

            <div style={styles.heroSection}>
                <span style={styles.badge}>ATTRACTIONS</span>

                <h1 style={styles.title}>
                    Discover Oman <span style={styles.titleSpan}>Attractions</span>
                </h1>

                <p style={styles.subtitle}>
                    Explore amazing attractions around Oman, check ratings, and find
                    beautiful places for your next adventure.
                </p>
            </div>

            <Container>
                <div style={styles.controlBox}>

                    <div style={styles.filterButtons}>
                        <Button style={styles.button} onClick={sortHigh}>
                            Highest Rated
                        </Button>

                        <Button style={styles.button} onClick={sortLow}>
                            Lowest Rated
                        </Button>

                        <Button style={styles.resetButton} onClick={resetSort}>
                            Reset
                        </Button>
                    </div>

                    <div style={styles.searchRow}>
                        <input
                            type="text"
                            placeholder="Search attractions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.input}
                        />

                        <Button style={styles.searchButton} onClick={handleSearch}>
                            🔍
                        </Button>
                    </div>

                </div>
            </Container>

            <Container style={styles.listContainer}>
                <Row className="g-4">
                    {sorted.length > 0 ? (
                        sorted.map((item) => (
                            <Col md="12" key={item._id}>
                                <Card className="d-flex flex-row align-items-center p-3" style={styles.card}>

                                    <CardImg
                                        src={item.image}
                                        style={styles.image}
                                    />

                                    <CardBody
                                        className="d-flex justify-content-between align-items-center w-100"
                                        style={styles.cardBody}
                                    >

                                        <div>
                                            <h5 style={styles.attractionName}>{item.name}</h5>

                                            <p style={styles.rating}>
                                                ⭐ {item.averageRating} / 5
                                            </p>
                                        </div>

                                        <Button
                                            style={styles.detailsButton}
                                            onClick={() => navigate(`/attractions/${item._id}`)}
                                        >
                                            View Details
                                        </Button>

                                    </CardBody>

                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col md="12">
                            <p style={styles.emptyText}>
                                No attractions found.
                            </p>
                        </Col>
                    )}
                </Row>
            </Container>

            <Footer />
        </div>
    );
}
