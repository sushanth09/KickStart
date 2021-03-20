import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleLogin(){
    const {email, password} = this.state;

    if(email !== "" && password !== ""){

      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
    
      const url = `http://localhost:8000/kickstart/login`;
      fetch(url,{
          method: "post",
          body: formData
      }).then((response) => response.json())
      .then(data => {
          console.log(data)
          window.localStorage.setItem("access_token", data.access_token);
          window.localStorage.setItem("email", data.email);
          console.log(window.localStorage.getItem("access_token") )        
          this.props.history.push("/login");
      })
    }
  }



  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="mt-8 text-gray-500 text-center mb-3 font-bold">
                    <small>sign in with credentials</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange}  
                        type="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>
  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}  
                        type="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>
  
                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={this.handleLogin.bind(this)}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-300"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-gray-300">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  
  }
}
