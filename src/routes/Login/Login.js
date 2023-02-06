import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '../../components/TextField/TextField';
import './Login.css';

import { loginUser } from '../../store/auth/Auth.actions';
//import { loadCart } from '../../store/cart/Cart.actions'

import * as Yup from 'yup';

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);

  const userHomeRoute = `/users/`;
  // Login handler
  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(loginUser(credentials)).unwrap();
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
    }
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),

    password: Yup.string()
      .required("Password is required")
  })

  return (
    <>
    { !isSignedIn &&    
    <div className="form">
      <div className="formComp">
        <div className="formWrapper">
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            validateOnBlur
            onSubmit={async (values) => {
              const { email, password } = values;
              await handleLogin({email, password});
            }}
          >
            <Form className="baseForm">
              <header className="baseFormHeader">
                <h1 className="baseFormHeading">Log in</h1>
              </header>
              <TextField
                label="Email"
                name="email"
                id="email-input"
              />
              <TextField
                label="Password"
                name="password"
                id="password-input"
                type="password"
              />
              {
                error && <div>{error}</div>
              }
              <Button variant="contained" style={{backgroundColor: "purple", color: "gold", border: "2px solid gold"}} type="submit" isLoading={isLoading}>Submit</Button>
              <div style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', gap: '20px'}}>
                <p><a href="/">Forgotten your password?</a></p>
                <Button id="reg_button" component={Link} to='/auth/register'>Register</Button>
              </div>
              <Divider />
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <p>Sign in with</p>
              </div>
              <div className="social-btn-container">
                <Button variant="contained" color="primary" className="facebook-btn">Facebook</Button>
                <Button variant="contained" className="google-btn" href="/google">Google</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
    }
    { isSignedIn &&
      <Navigate to={`/users/${user.id}`}/>
    }
    </>
  );
}

export default Login;