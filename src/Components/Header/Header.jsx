import { Link } from "react-router-dom";

const Header = () => {
  const NavLinks = (
    <>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li>
      <Link to='/register'>Register</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-5 shadow"
            >
              {NavLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">EP-Authentication</a>
        </div>
        <div className="navbar-center lg:flex">
          {" "}
          {/* hidden */}
          <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
