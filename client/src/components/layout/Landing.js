import React from 'react';
import landingimg from '../../images/landingimg.jpg';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="container">
            <div className="row m-1  align-items-center">
                <div className="col-md-6">
                    <img src={landingimg} className="landingimg" alt="Homepage"/>
                </div>
                <div className="col-12 col-md-6 mx-auto">
                    <div className="m-5 display-1">
                    <h3>
                        Welcome to the blog
                        <small class="text-muted"> - A blog for the movieholics</small>
                    </h3>
                    </div>
                    <div className="buttons m-5">
                        <Link to="/register" className="btn btn-primary m-1">Sign Up</Link>
                        <Link to="/login" className="btn btn-light m-1">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
