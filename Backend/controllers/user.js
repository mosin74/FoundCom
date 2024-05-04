const User = require('../models/User')

exports.register= async (req, res) => {
    try {
        const { name, email, password } =req.body;

        let user = await User.findOne({ email });
        if (user) res.status(404).json({ sucess: false, message: 'User already exists' });

        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "sample_id",
                url: "sample_url"
            }
        });
          
        res.status(201).json({
            sucess:true,
            user
        })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message,
        })
    }
} 