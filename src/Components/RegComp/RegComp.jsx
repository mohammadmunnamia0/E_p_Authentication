import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const RegComp = () => {
  //2.1 Show register error {when user is already added cant add the same user again}
  const [registerError, setRegisterError] = useState("");

  //3.1 Show Successfully added user
  const [SuccessfullyAddedUser, setSuccessfullyAddedUser] = useState();

  //showPassword 
  const [ShowPassword,serShowPassword]=useState(false);


  //get the values from the each field of the form
  const HandleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const AcceptTerm = e.target.terms.checked;
    console.log(name, email, password,AcceptTerm);
    console.log("submitted");


    //2.4 Reset/Clear the Error Message Before the new Registration
    setRegisterError("");


    //3.4 Reset/Clear the Successfully Added User Message Before the new Registration
    setSuccessfullyAddedUser("");


    //4. checking the password error if password is less then 6 then show an error message
    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return; // ai khane return korar kaorn jodi pass vul hoy less then 6 tahole r code samne excute hobe na
    } 
    else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must Contain a Capital characters");
      return;
    }
    else if (!AcceptTerm) {
      setRegisterError("Accept Our Terms and Conditions");
      return;
    }


    //1. firebase authentication create user

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const RegUser = result.user;
        console.log(RegUser);
        setSuccessfullyAddedUser(RegUser); //3.2

        //firebase send verification mail to verify the user email
        sendEmailVerification(result.user)
        .then(()=>{
          alert("Check Your Mail to Verify the Email")
        })
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message); //2.2
      });
  };

  return (
    <div>
      <div>
        <div className="w-full max-w-sm mx-auto my-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="px-6 py-4">
            <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
              Create account
            </p>

            <form onSubmit={HandleRegister}>
              {/* <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  name="name"
                  placeholder="Your Name"
                  aria-label="Email Address"
                  required
                />
              </div> */}
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  name="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  required
                />
              </div>

              <div className="w-full mt-4 flex relative">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  name="password"
                  type={ShowPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  required
                />
                <span onClick={()=> serShowPassword(!ShowPassword)} className="text-2xl absolute right-4 top-4">
                {
                  ShowPassword ?  <FaEye />  :    <FaEyeSlash />
                }
                </span>
              </div>

              <div className="mt-4">
                <input type="checkbox" name="terms" id="terms"/>
                <label className="ml-2 text-" htmlFor="terms">Accept our terms and Conditions</label>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                >
                  Create an account
                </button>
              </div>
            </form>

            {/*2.3. Showing the error */}
            {registerError && <p className="text-red-600">{registerError}</p>}

            {/*3.3 Showing the Successfully Added User */}

            {SuccessfullyAddedUser && (
              <p className="text-green-400 font-bold text-xl">Account Created Successfully</p>
            )}
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already Haven an Account{" "}
          </span>

          <NavLink to="/signin"
            href="#"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Login
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
    </div>
  );
};

export default RegComp;
