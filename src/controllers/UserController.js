const User = require('../models/User');

module.exports = {
    async index(req, res){
        const allUsers = await User.find();

        return res.json(allUsers);
    },

    async show(req, res){
        const oneUser = await User.findById(req.params.id);

        return res.json(oneUser);
    },


    async store(req, res){
        const { name, email } = req.body;

        const userAlreadyRegistered = await User.findOne({ email });

        if (!userAlreadyRegistered) {
            const answer =  await User.create({
                name,
                email
            });

            return res.json(answer);
        }

        return res.json({ User: "Already Registered" })
    },

    async update(req, res){
        const { email } = req.body;

        const userAlreadyRegistered = await User.findOne({ email });

        if (!userAlreadyRegistered) {

            const updateUser = await User.findOneAndUpdate(req.params.id, req.body, {
                new: true 
            });

            
            return res.json(updateUser);
        }

        return res.json({ User: "Already Registered" })
    },

    async destroy(req, res){
        await User.findOneAndRemove(req.params.id);

        return res.json({Delete: 'true'});
    }
};