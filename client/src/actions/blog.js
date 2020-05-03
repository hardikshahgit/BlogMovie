import axios from 'axios';
import {setAlert} from './alert';
import { GET_BLOGS, BLOG_ERROR, DELETE_BLOG, ADD_BLOG } from './types';

//get blogs
export const getBlogs = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/blogs');

        dispatch({
            type: GET_BLOGS,
            payload: res.data
        })
        
    } catch (err) {   
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//Delete Blog
export const deleteBlog = id => async dispatch => {
    try {
        await axios.delete(`/api/blogs/${id}`);

        dispatch({
            type: DELETE_BLOG,
            payload: id
        });

        dispatch(setAlert('Blog Removed', 'success'));

    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        }); 
    }
}

//Add Blog
export const addBlog = formData => async dispatch => {

    try {

        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const res = await axios.post(`/api/blogs`, formData, config);

        console.log(res);

        dispatch({
            type: ADD_BLOG,
            payload: res.data
        });

        dispatch(setAlert('Blog Added', 'success'));

    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        }); 
    }
}