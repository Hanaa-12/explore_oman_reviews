import { Navbar, Nav, NavItem, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Features/usersSlice";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.users.user);
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
        navigate("/login");
    };

    console.log("USER:", user);

    const styles = {
        navbar: {
            backgroundColor: "#fff8ef",
            padding: "18px 60px",
            boxShadow: "0 8px 25px rgba(70, 45, 20, 0.08)",
            borderBottom: "1px solid rgba(150, 110, 65, 0.18)",
            position: "relative",
            zIndex: "10",
        },
        logo: {
            fontFamily: "cursive",
            color: "#2b2118",
            fontWeight: "800",
            margin: "0",
            fontSize: "30px",
        },
        logoSpan: {
            color: "#a86b24",
        },
        navLink: {
            color: "#3b2a1d",
            fontSize: "17px",
            fontWeight: "600",
            margin: "0 8px",
            textDecoration: "none",
            padding: "8px 10px",
        },
        userIcon: {
            width: "44px",
            height: "44px",
            fontSize: "22px",
            border: "2px solid #d5b98e",
            borderRadius: "50%",
            marginLeft: "14px",
            cursor: "pointer",
            position: "relative",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        },
        dropdown: {
            position: "absolute",
            top: "54px",
            right: "0",
            backgroundColor: "#fff",
            border: "1px solid #e0c7a2",
            borderRadius: "16px",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            minWidth: "170px",
            boxShadow: "0 18px 35px rgba(0,0,0,0.15)",
            zIndex: "100",
        },
        helloText: {
            display: "flex",
            gap: "5px",
            alignItems: "center",
            fontSize: "15px",
            marginBottom: "10px",
            color: "#3b2a1d",
        },
        dropdownItem: {
            padding: "9px",
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "12px",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: "600",
        },
    };

    return (
        <Navbar style={styles.navbar}>
            <Container fluid className="d-flex align-items-center">

                <h3 style={styles.logo}>
                    Explore <span style={styles.logoSpan}>Oman</span> Reviews
                </h3>

                <div className="d-flex align-items-center ms-auto">

                    <Nav navbar className="d-flex flex-row">
                        <NavItem>
                            <Link to="/home" style={styles.navLink}>Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/restaurants" style={styles.navLink}>Restaurants</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/hotels" style={styles.navLink}>Hotels</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/mosques" style={styles.navLink}>Mosques</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/attractions" style={styles.navLink}>Attractions</Link>
                        </NavItem>
                    </Nav>

                    {user && (
                        <div
                            style={styles.userIcon}
                            onClick={() => setOpen(!open)}
                        >
                            👤

                            {open && (
                                <div style={styles.dropdown}>
                                    <span style={styles.helloText}>
                                        Hello <b>{user.name}</b>
                                    </span>

                                    <button
                                        onClick={handleLogout}
                                        style={styles.dropdownItem}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>

            </Container>
        </Navbar>
    );
}