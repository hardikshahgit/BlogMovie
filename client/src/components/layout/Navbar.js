import React, {Fragment} from 'react';
import { Navbar as Homebar} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    
    const authLinks = (

        <Homebar color="light" light expand="md">
            <a className="ml-3 btn btn-block" onClick={logout} href="#!">
                <span className="hide-sm"><strong>Logout</strong></span>
            </a>    
        </Homebar>
    );

    const guestLinks = (
        <Homebar color="light" light expand="md">
                <Link to="/" className="btn btn-block"><strong>Movie-Blog</strong></Link>
        </Homebar>
    );

    return (
        <div className="container">
            { !loading && <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);
