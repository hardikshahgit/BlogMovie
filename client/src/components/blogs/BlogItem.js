import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions/blog';

const BlogItem = ({deleteBlog, auth, blog: {_id, title, description, user, image, date}}) => {
    return (
        <div className="blog bg-white p-1 my-1">
          <div>
              <img
                src={image}
                alt={title}
              />
              <h4>{title}</h4>
          </div>
          <div>
            <p className="my-1">
              {description}
            </p>
             <p className="blog-date">
                    Posted on {date}
            </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteBlog(_id)} type="button" className="btn btn-danger">DELETE</button>
            )}
          </div>
        </div>
    )
}

BlogItem.propTypes = {
    blog: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteBlog
})(BlogItem);
