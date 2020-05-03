import { GET_BLOGS, BLOG_ERROR, DELETE_BLOG, ADD_BLOG } from '../actions/types';

const initialState = {
    blogs: [],
    blog: null,
    loading: true,
    error: {}
}

export default function (state=initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: payload,
                loading: false
            }
        case ADD_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, payload],
                loading: false
            }
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== payload),
                loading: false
            }
        case BLOG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}