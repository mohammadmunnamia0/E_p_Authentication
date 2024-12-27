import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";

const SignIn = () => {
  const [registerError, setRegisterError] = useState("");

  const [SuccessfullyAddedUser, setSuccessfullyAddedUser] = useState();

  const emailRef = useRef(); //jehetu forgot password is not a part of form tai forgot pasword a press korle amar to form a dewa email ke pabo na , tai useref korlam so that amra user ar mail ta form theke reference hisab a niye oi mail ar moddhe akta forgot mail ar message dite pari

  const HandleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //clear before new log
    setRegisterError("");

    //validation signInWithEmailAndPassword
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified)
          {
          console.log("Email is verified");
        }
        else
         {
          alert("Email is not verified");
        }
        setSuccessfullyAddedUser(result.user);
      })
      
      .catch((error) => {
        console.log(error.message);
        setRegisterError(error.message);
      });
  };



  //forgot password , useref

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email", emailRef.current.value);
      return;
    } 
    
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter a Valid Email");
      return
    }

    //firebase Forgot password
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      alert('Check Your Email')
    })
    .catch(error =>{
      console.log(error)
    })

  };

  return (
    <div>
      <div className="w-full max-w-sm mx-auto my-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>

          <form onSubmit={HandleSignin}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                name="email"
                ref={emailRef}
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                name="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <a
                onClick={handleForgotPassword}
                href="#"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>

              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
            {registerError && <p className="text-red-600">{registerError}</p>}

            {SuccessfullyAddedUser && (
              <p className="text-green-400 font-bold text-xl">
                Login Successful
              </p>
            )}
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Dont have an account?{" "}
          </span>

          <NavLink
            to="/register"
            href="#"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </NavLink>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
        >
          <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
          </svg>

          <span className="hidden mx-2 sm:inline">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
