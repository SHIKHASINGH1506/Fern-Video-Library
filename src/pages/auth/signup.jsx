import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from 'service';
import { useAuth } from 'context';
import { useToast } from "custom-hook/useToast";

const Signup = () => {
  const initialSignupFields = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [signupFields, setSignupFields] = useState(initialSignupFields);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { showToast } = useToast();

  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignupFields({
      ...signupFields,
      [name]: value
    });
  }

  const signupFormHandler = async (e, signupFields) => {
    e.preventDefault();
    try {
      const isSignup = await signupUser(signupFields);

      if (isSignup) {
        showToast('Account created successfuly!', 'success');
        const { createdUser, encodedToken } = isSignup;
        setAuth({
          token: encodedToken,
          user: createdUser,
          isAuth: true
        });
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(createdUser));
        setTimeout(() => {
          setSignupFields(initialSignupFields);
          navigate('/Login');
        }, 1000)

      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="login-wrapper body-section-wrapper">
      <div className="breadcrumb">

      </div>
      <div className="login-modal">
        <form className="login-form" onSubmit={(e) => signupFormHandler(e, signupFields)}>
          <h4 className="login-title">Sign up</h4>
          <div className="input-container">
            <label className="input-label" htmlFor="fullName">Full Name</label>
            <input
              className="input-section"
              type="text"
              id="fullName"
              name="fullName"
              value={signupFields.fullName}
              placeholder="John Doe"
              onChange={(e) => fieldChangeHandler(e)}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              className="input-section"
              type="text"
              id="email"
              name="email"
              value={signupFields.email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => fieldChangeHandler(e)}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="pwd">Password</label>
            <input
              className="input-section"
              type="password"
              id="pwd"
              name="password"
              value={signupFields.password}
              placeholder="Password"
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="confirm-pwd">Confirm Password</label>
            <input
              className="input-section"
              type="password"
              name="confirmPassword"
              value={signupFields.confirmPassword}
              id="confirm-pwd"
              placeholder="Confirm Password"
              onChange={(e) => fieldChangeHandler(e)}
              required
            />
          </div>
          <label className="input-label text-sm" htmlFor="pwd-store">
            <input type="checkbox" className="checkbox-input" name="" id="pwd-store" />
            I accept all the terms and conditions
          </label>

          <button className="bttn bttn-primary bttn-block">CREATE ACCOUNT</button>
          <p className="sub-text text-center">Already have an account?
            <Link className="bold primary-text" to='/login'> Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export { Signup };