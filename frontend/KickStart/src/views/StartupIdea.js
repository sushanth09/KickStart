import React, { Component } from 'react'
import NavBar from '../components/Navbars/IndexNavbar'
import Footer from "components/Footers/Footer.js";
import somefile from './somefile.pdf'
import { Page } from 'react-pdf'
import { Document } from 'react-pdf/dist/esm/entry.webpack';

export default class StartupIdea extends Component {
    state = {
        numPages: 0,
        pageNumber: 1,
        requested: false,
        haveAccess: false,
    }

    componentDidMount(){
        this.setState({
            haveAccess: false,
        })
    }

    onDocumentLoadSuccess({ numPages }) {
        this.setState({
            numPages: numPages,
            // pageNumber: 1
        })
    }


    requestAccess(){
        this.setState({
            requested: true
        })
    }

    render() {
        const { company_name, product_name, problem_statement } = this.props.location.state.details;
        return (
            <div >
                <NavBar />
                <div className="bg-gray-300 pt-16 pb-16">
                    <div className="main ">
                        <div className="top-header">
                            {company_name}  <span className="text-gray-500"> | </span>   {product_name}
                        </div>
                        <hr />
                        <div className="top-body">
                            <img className="company_profile" src="https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png" alt="" />
                             <div className="request">
                                {!this.state.requested ?
                                    <>
                                    You must Request Access to see more information about this company
                                    <i className="fas fa-lock"></i>
                                    <button className="reqeust_btn" onClick={this.requestAccess.bind(this)}>Request Access</button>
                                    </>
                                : <div>Pending Approval</div>
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="problem_statement">
                            Problem Statement:
                            <div className="ps_content">{problem_statement}</div>
                        </div>
                        <hr />
                        <div className="problem_statement">
                            Description:
                        </div>

                        <div className="pdf">
                            <Document
                                file={somefile}
                                onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}>
                                <Page pageNumber={this.state.pageNumber} />
                            </Document>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}
