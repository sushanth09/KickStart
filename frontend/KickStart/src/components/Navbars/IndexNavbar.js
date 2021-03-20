/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";




function handleLogout(){
  if(window.localStorage.getItem("isLoggedIn")){
    const url = `http://localhost:8000/kickstart/logout/${window.localStorage.getItem("email")}`;
    fetch(url,{
        method: "post",
    }).then((response) => response.json())
    .then(data => {
        console.log(data)
        window.localStorage.setItem("email", undefined);
        window.localStorage.setItem("access_token", undefined);
        window.localStorage.setItem("isLoggedIn", false);
    })
  }
}


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            >
              KickStart
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="lg:text-black lg:hover:text-gray-500 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  // href=""
                  target="_blank"
                >
                  <h1>FAQ</h1>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="lg:text-black lg:hover:text-gray-500 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  // href=""
                  target="_blank"
                >
                  <h1>About</h1>
                </a>
              </li>

              <li className="flex items-center">
                <span
                  className="lg:text-black lg:hover:text-gray-500 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  // href=""
                  target="_blank"
                >
                  {window.localStorage.getItem("access_token") !== "undefined" ?
                    <Link to="/profile">Profile</Link>  
                    : <Link to="/auth/login">Login</Link>  
                  }
                </span>
              </li>
                {window.localStorage.getItem("access_token") !== "undefined"? 
                  <li className="flex items-center">
                  <button
                    className="lg:text-black lg:hover:text-gray-500 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    onClick={handleLogout}
                  >
                    Logout                    
                  </button>
                </li>
                : null
                }

            </ul>
 
          </div>
        </div>
      </nav>
    </>
  );
}
