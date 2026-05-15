import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const API = "https://explore-oman-reviews-ley9.onrender.com";

const typeMap = {
    restaurants: "restaurants",
    mosques: "mosques",
    hotels: "hotels",
    attractions: "attractions",
};

export default function AdminDashboard() {
    const [data, setData] = useState([]);
    const [type, setType] = useState("restaurants");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

   
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({
        name: "",
        image: "",
        city: "",
        lat: "",
        lng: "",
        description: ""
    });

    
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        image: "",
        city: "",
        lat: "",
        lng: "",
        description: ""
    });

  
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    
    const fetchData = async (selectedType) => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/${typeMap[selectedType]}`);
            const result = await res.json();
            setData(Array.isArray(result) ? result : []);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(type);
    }, [type]);

    
    const handleAdd = async () => {
        await fetch(`${API}/${typeMap[type]}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.name,
                image: form.image,
                description: form.description,
                location: {
                    name: form.city,
                    lat: Number(form.lat),
                    lng: Number(form.lng)
                }
            })
        });

        setShowAdd(false);
        setForm({ name: "", image: "", city: "", lat: "", lng: "", description: "" });
        fetchData(type);
    };

   
    const handleUpdate = async () => {
        await fetch(`${API}/${typeMap[type]}/${editItem._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editForm.name,
                image: editForm.image,
                description: editForm.description,
                location: {
                    name: editForm.city,
                    lat: Number(editForm.lat),
                    lng: Number(editForm.lng)
                }
            })
        });

        setShowEdit(false);
        fetchData(type);
    };

  
    const confirmDelete = async () => {
    const res = await fetch(`${API}/${typeMap[type]}/${deleteId}`, {
        method: "DELETE"
    });

    const result = await res.json();

    if (res.ok) {
        setShowDelete(false);
        fetchData(type);
    } else {
        alert(result.msg || "Delete failed");
    }
};

    
    const styles = {
        page: { backgroundColor: "#f7f1e8", minHeight: "100vh" },

        hero: {
            background: "linear-gradient(135deg,#f7f1e8,#ead9c2,#c9a46f)",
            padding: "60px 20px",
            textAlign: "center"
        },

        title: {
            fontSize: "42px",
            fontWeight: "800",
            color: "#2b2118"
        },

        subtitle: {
            color: "#5a4634",
            marginTop: "10px"
        },

        controlBox: {
            backgroundColor: "#fff8ef",
            padding: "20px",
            borderRadius: "26px",
            marginTop: "-30px",
            boxShadow: "0 14px 35px rgba(70,45,20,0.10)"
        },

        btn: {
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "22px",
            margin: "5px",
            fontWeight: "700"
        },

        card: {
            borderRadius: "26px",
            backgroundColor: "#fff8ef",
            border: "1px solid rgba(150,110,65,0.16)",
            boxShadow: "0 14px 35px rgba(70,45,20,0.10)"
        },

        img: {
            width: "150px",
            height: "110px",
            objectFit: "cover",
            borderRadius: "18px"
        },

        actionBtn: {
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "18px",
            margin: "5px"
        },

        deleteBtn: {
            backgroundColor: "#8b5520",
            border: "none",
            borderRadius: "18px"
        },

        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },

        modal: {
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            width: "360px"
        }
    };

    return (
        <div style={styles.page}>

           
            <div style={styles.hero}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <p style={styles.subtitle}>Manage all system data easily</p>
            </div>

           
            <Container>
                <div style={styles.controlBox} className="text-center">

                    {Object.keys(typeMap).map((key) => (
                        <Button key={key} style={styles.btn} onClick={() => setType(key)}>
                            {key}
                        </Button>
                    ))}

                    <Button style={{ ...styles.btn, backgroundColor: "#8b5520" }} onClick={() => setShowAdd(true)}>
                        + Add
                    </Button>

                    <Button style={{ ...styles.btn, backgroundColor: "#8b5520" }}
                        onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/login");
                        }}>
                        Logout
                    </Button>

                </div>
            </Container>

            
            <Container className="mt-4">

                {loading ? (
                    <div className="text-center p-5"><Spinner /></div>
                ) : data.length === 0 ? (
                    <p className="text-center">No data found</p>
                ) : (
                    data.map(item => (
                        <Card key={item._id} className="mb-3 p-3" style={styles.card}>
                            <CardBody className="d-flex justify-content-between align-items-center">

                                <div className="d-flex align-items-center gap-3">
                                    <img src={item.image} style={styles.img} />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <small>📍 {item.location?.name}</small>
                                    </div>
                                </div>

                                <div>
                                    <Button style={styles.actionBtn}
                                        onClick={() => {
                                            setEditItem(item);
                                            setEditForm({
                                                name: item.name,
                                                image: item.image,
                                                city: item.location?.name,
                                                lat: item.location?.lat,
                                                lng: item.location?.lng,
                                                description: item.description
                                            });
                                            setShowEdit(true);
                                        }}>
                                        Edit
                                    </Button>

                                    <Button style={styles.deleteBtn}
                                        onClick={() => {
                                            setDeleteId(item._id);
                                            setShowDelete(true);
                                        }}>
                                        Delete
                                    </Button>
                                </div>

                            </CardBody>
                        </Card>
                    ))
                )}

            </Container>

            
            {showAdd && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h5>Add Item</h5>

                        <input className="form-control mb-2" placeholder="Name"
                            onChange={e => setForm({ ...form, name: e.target.value })} />

                        <input className="form-control mb-2" placeholder="Image"
                            onChange={e => setForm({ ...form, image: e.target.value })} />

                        <input className="form-control mb-2" placeholder="City"
                            onChange={e => setForm({ ...form, city: e.target.value })} />

                        <input className="form-control mb-2" placeholder="Lat"
                            onChange={e => setForm({ ...form, lat: e.target.value })} />

                        <input className="form-control mb-2" placeholder="Lng"
                            onChange={e => setForm({ ...form, lng: e.target.value })} />

                        <div className="d-flex justify-content-between">
                            <Button color="success" onClick={handleAdd}>Save</Button>
                            <Button onClick={() => setShowAdd(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

           
            {showEdit && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h5>Edit Item</h5>

                        <input className="form-control mb-2" value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })} />

                        <input className="form-control mb-2" value={editForm.city}
                            onChange={e => setEditForm({ ...editForm, city: e.target.value })} />

                        <div className="d-flex justify-content-between">
                            <Button color="success" onClick={handleUpdate}>Update</Button>
                            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

      
            {showDelete && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h5>Delete?</h5>
                        <Button color="danger" onClick={confirmDelete}>Yes</Button>
                        <Button onClick={() => setShowDelete(false)}>No</Button>
                    </div>
                </div>
            )}

        </div>
    );
}
