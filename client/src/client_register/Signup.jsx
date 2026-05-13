import { Container, Row, Col, FormGroup, Input, Button } from "reactstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import bg from "../Images/bg.jpg";
import { registerUser } from "../Features/usersSlice";
import "./index.css";
import { userSchemaValidation } from "../Validations/UserValidation";
function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const onSubmit = async (data) => {
    try {
      const cleanData = {
        name: data.name,
        email: data.email,
        password: data.password
      };


      await dispatch(registerUser(cleanData)).unwrap();
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <Container fluid>
      <Row className="auth-container g-0">

        <Col md="6" className="left-side p-0">
          <img src={bg} className="bg-image" />
          <div className="overlay-text">
            <h1>Explore Oman Reviews</h1>
            <p>Create your account</p>
          </div>
        </Col>

        <Col md="6" className="right-side d-flex align-items-center justify-content-center">
          <form
            className="form-box"
            onSubmit={handleSubmit(onSubmit, (errors) => {
              console.log("ERRORS:", errors);
            })}
          >

            <h2 className="title">Sign Up</h2>

            <FormGroup>
              <input
                placeholder="Full Name"
                className="form-control"
                {...register('name')}
              />
              <p className="error">{errors.name?.message}</p>
            </FormGroup>

            <FormGroup>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register('email')}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>

            <FormGroup>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register('password')}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>

            <FormGroup>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
              />
              <p className="error">{errors.confirmPassword?.message}</p>
            </FormGroup>

            <Button style={{  backgroundColor: "#8b5520" }}type="submit" className="button">
              Sign Up
            </Button>

            <p className="link-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </form>
        </Col>

      </Row>
    </Container>
  );
}

export default Signup;