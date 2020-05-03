import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getBlogs } from '../../actions/blog';
import BlogItem from './BlogItem';
import BlogForm from './BlogForm';

const Blogs = ({ getBlogs, blog: { blogs, loading } }) => {
    
    useEffect(() => {
        getBlogs();
    }, [getBlogs])

    return loading ? <Spinner animation="border" /> : (
        <Fragment>
            <h1 className="large text-primary">Blogs</h1>
            <p className="lead">
                Welcome to the community
            </p>
            <BlogForm />
            <div className="blogs">
                {blogs.map(blog => (
                    <BlogItem key={blog._id} blog={blog} />
                ))}
            </div>
        </Fragment>
    );
};

Blogs.propTypes = {
    getBlogs: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,  
}

const mapStateToProps = state => ({
    blog: state.blog
});

export default connect(mapStateToProps, {getBlogs})(Blogs);
