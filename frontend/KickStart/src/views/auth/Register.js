import React, { Component } from 'react'

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    account_type: 2
  }



  handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleRegistration(){
    const {email, password, account_type} = this.state;
    if(email !== "" && password !== ""){
      const url = `http://localhost:8000/kickstart/register?email=${email}&password=${password}&account_type=${account_type}`;
      fetch(url,{
          method: "post",
      }).then((response) => response.json())
      .then(data => {
          console.log(data)
          this.props.history.push("/auth/login");
      })
    }
  }

  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="btn-wrapper text-center">
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <small>sign up with credentials</small>
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

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Account Type
                      </label>
                      <select  
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        value={this.state.account_type}>
                        <option value={1}>Investor</option>
                        <option value={2}>New Business</option>
                      </select>
                    </div>  


                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={this.handleRegistration.bind(this)}
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
