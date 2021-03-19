import React, { Component } from 'react'
// import { Link } from "react-router-dom";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";



export default class Landing extends Component {
  constructor(){
    super();
    this.state = {
      startups_list: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8000/kickstart/startup/get')
      .then(response => response.json())
      .then(data => {
          // console.log(data)
          this.setState({
            startups_list: data
          })
      });
  }


  render() {
    return (
      <>
        <Navbar transparent />
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white font-semibold text-4xl">
                      Give your idea a KickStart
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                      Where Innovation gets Life
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>
  
          <section className="pb-20 bg-gray-300 ">
            <div className="container mx-auto px-4">
            <h1 className="text-3xl mb-2 font-bold text-center">Companies on KickStart</h1>
              <div className="fundraisers">
                {/* <div className="lg:pt-12 pt-6 w-full md:w-5/12" > */}
                    
              {this.state.startups_list.map((data, index) => (
                <div className="bg-white mb-8 w-50 shadow-lg rounded-lg company" key={index}>
                <div className="p-2">
                    <img src="https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png" className="rounded-lg mb-2" alt=""/>
                  <h5 className="text-xl font-semibold text-left px-3">{data.product_name}</h5>
                  <h6 className="text-xxl text-left px-3">{data.company_name}</h6>
                  <p className="mt-2 mb-2 text-gray-600 text-left  px-3">
                    {data.problem_statement}
                  </p>
                  <hr className="mb-2 mt-2"/>
                  <h6 className="text-xxl text-left  px-3 mb-4">Contact: {data.contact} <br/> Goal: {data.funding_goal}</h6>
                </div>
              </div>
              ))}
             
               {/* </div> */}
            </div>
  
              
            </div>
          </section>
  
          <section className="relative py-20">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-white fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
  
            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blue-300">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
                    <h3 className="text-3xl font-semibold">A growing company</h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    Growth is painful. Change is painful. But, nothing is as painful as staying stuck where you do not belong.
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fas fa-fingerprint"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Stay Focused
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="fab fa-html5"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">
                              Dream Big
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 mr-3">
                              <i className="far fa-paper-plane"></i>
                            </span>
                          </div>
                          <div>
                            <h4 className="text-gray-600">Aim Higher</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          {/* <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">Here are our heroes</h2>
                  <p className="text-lg leading-relaxed m-4 text-gray-600">
                    According to the National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/team-1-800x800.jpg")}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Ryan Tompson</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Web Developer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/team-2-800x800.jpg")}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Romina Hadid</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Marketing Specialist
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/team-3-800x800.jpg")}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Alexa Smith</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        UI/UX Designer
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={require("assets/img/team-4-470x470.png")}
                      className="shadow-lg rounded-full mx-auto max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Jenna Kardi</h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        Founder and CEO
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </main>
        <Footer />
      </>
    );
  }
}

