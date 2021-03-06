import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app, {signInWithGoogle} from "../../util/Firebase.js";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/Kloop-forms");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div>
      <h1>Sign up</h1>
      {/* <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form> */}
      <button onClick={signInWithGoogle}>Sign-in with Google</button>
    </div>
  );
};

export default withRouter(SignUp);
