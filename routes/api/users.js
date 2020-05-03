const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access public
router.post(
    "/",
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "email is required").isEmail(),
        check("password", "password length must be more than 6").isLength({
        min: 6,
        })
    ],
  
    async (req, res) => {
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
        const { name, email, password } = req.body;

        try {

            //see if user exists
        
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exits ' }] });
            }

            user = new User({
                name,
                email,
                password
            });

            //encrypt password

            const salt = await bcrypt.genSalt(10);
            
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //return json webtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err,token) => {
                if (err) throw err;
                res.json({ token });
            });
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
        
  }
);

module.exports = router;
