import React, { Component } from 'react'
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";


export default class Profile extends Component {
  state = {
    email: "",
    contact: "",
    company_name: "",
    ps: ""

  }
  
  componentDidMount(){
    const email = window.localStorage.getItem("email");
    const url = `http://localhost:8000/kickstart/startup/view/${email}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data)
          this.setState({
            email: data.email,
            contact: data.contact,
            company_name: data.company_name,
            ps: data.problem_statement
          })
      });
  }

  render() {
    return (
      <>
        <Navbar transparent />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>          
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap">
                    <div className="w-full flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src="https://previews.123rf.com/images/jenjawin/jenjawin1904/jenjawin190400208/120265394-account-icon-vector-eps10-user-profile-sign-web-icon-with-check-mark-glyph-user-authorized-vector-il.jpg"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      {this.state.company_name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-phone mr-2 text-lg text-gray-500"></i>{" "}
                      {this.state.contact}
                    </div>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="far fa-envelope mr-2 text-lg text-gray-500"></i>{" "}
                    {this.state.email}
                    </div>
                    
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      {this.state.ps}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
