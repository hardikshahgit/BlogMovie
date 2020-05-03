const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Blog = require('../../models/Blog');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route   POST api/blog
// @desc    Create a blog
// @access  Private
router.post('/', [auth, [check('title', 'title is required').not().isEmpty()]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }


    try {

        const user = await User.findById(req.user.id).select('-password');

        const newBlog = new Blog({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            user: req.user.id
        });

        const blog = await newBlog.save();
        res.json(blog);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

} );


// @route   GET api/blogs
// @desc    Get all bloga
// @access  Private
router.get('/', auth, async (req, res) => {

    try {

        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);     
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route   GET api/blogs/:id
// @desc    Get blog by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(404).json({ msg: 'Blog not found'});
        }

        res.json(blog);     
        
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId' ){
            return res.status(404).json({ msg: 'Blog not found'});
        }

        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/blogs/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(404).json({ msg: 'Blog not found'});
        }

        //check user
        if(blog.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await blog.remove();

        res.json({msg: 'Blog removed'});     
        
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId' ){
            return res.status(404).json({ msg: 'Blog not found'});
        }

        res.status(500).send('Server Error');
    }

});

module.exports = router;
