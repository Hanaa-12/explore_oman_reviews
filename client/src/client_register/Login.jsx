import { Container, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValid } from '../Validations/LoginValidation';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import  {login } from "../Features/usersSlice";
import bg from "../Images/bg.jpg";
import "./index.css";

function Login(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({resolver: yupResolver(LoginValid)});


  const onSubmit = async (data) => {
  try {
    const res = await dispatch(login(data)).unwrap();


    if (res.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }

  } catch (err) {
    console.log("Login error:", err);
    alert(err?.message || "Invalid User");
  }
};

  return(
    <Container fluid>
      <Row className="auth-container g-0">

        <Col md="6" className="left-side p-0">
          <img src={bg} className="bg-image"/>
          <div className="overlay-text">
            <h1>Explore Oman Reviews</h1>
            <p>Welcome back, please login</p>
          </div>
        </Col>

        <Col md="6" className="right-side d-flex align-items-center justify-content-center">
          <form className="form-box" onSubmit={handleSubmit(onSubmit)}>

            <h2 className="title">Login</h2>

            <FormGroup>
              <Label>Email</Label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                {...register('email')}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                {...register('password')}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>

            <Button style={{  backgroundColor: "#8b5520" }}type="submit" className="button">
              Login
            </Button>

            <p className="link-text">
              Don't have an account? <Link to="/">Sign up</Link>
            </p>

          </form>
        </Col>

      </Row>
    </Container>
  );
}

export default Login;