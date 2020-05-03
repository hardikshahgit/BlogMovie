import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBlog } from '../../actions/blog';

const BlogForm = ({ addBlog }) => {

    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: ''
    });

    const { title, image, description } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

    return (
        <div className="blog-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addBlog(formData);
                setFormData({title: '',image: '',description: ''});
            }}>
                <div className="row m-2 align-items-center">
                    <div className="formControl col-12 col-md-3">
                        <input type="text" name="title" placeholder="Add title" value={title} onChange={e=>onChange(e)} required />
                    </div>
                    <div className="formControl col-12 col-md-3">
                        <input type="text" name="image" placeholder="Add image link" value={image} onChange={e=>onChange(e)}/>
                    </div>
                    <div className="formControl col-12 col-md-3">
                        <input type="text" name="description" placeholder="Add movie description" value={description} onChange={e=>onChange(e)}/>
                    </div>
                    <div className="formControl col-12 col-md-3">
                        <input type="submit" className="btn btn-dark my-1" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
}

export default connect(null, {addBlog})(BlogForm)
