const User = require('../model/Users')
const bcrypt = require('bcrypt')
const Course = require('../model/Course')

module.exports.postSignup = async (req, res) => {
    try {
        const { name, password, profession, email } = req.body;
        if (!name || !password || !profession || !email) {
            return res.status(400).json({ message: 'required all feilds' });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(404).json({ message: 'already user exist' })
        }
        const hashed = await bcrypt.hash(password, 10);
        // console.log(hashed)
        const user = new User({
            name,
            email,
            password: hashed,
            profession
        })
        await user.save();
        // console.log(user)
        return res.status(200).json({ message: 'Successfully Signup', user })
    }
    catch (err) {
        return res.status(500).json('Internal error', err.message)
    }
}

module.exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json('all feilds required');
        }
        const exist = await User.findOne({ email });
        if (!exist) {
            return res.status(404).json('user does not exist');
        }
        const hashed = await bcrypt.compare(password, exist.password);
        if (!hashed) {
            return res.status(400).json('passowrd incorrect');
        }
        // console.log("exist", exist);
        return res.status(200).json({ message: 'Login Successfully', exist })
    } catch (err) {
        return res.status(500).json('Internal error', err.message)
    }

}

module.exports.getAllCards = async (req, res) => {
    try {
        const data = await Course.find().populate('userId', 'name profession');
        // console.log(data)
        return res.json({ data })
    } catch (err) {
        return res.json({ message: err.message })
    }
}

module.exports.getCards = async (req, res) => {
    const filter = req.params.filter;
    try {
        const data = await Course.find({
            $or: [
                { category: filter },
                { subCategory: filter }
            ]
        }).populate('userId', 'name profession')
        return res.json({ data });
    } catch (err) {
        return res.status(500).json({ message: 'internal error' })
    }
}

module.exports.postCard = async (req, res) => {
    const { title, category, subCategory, price, userId, description } = req.body;
    try {
        if (!req.file) {
            return res.status(404).json({ message: 'file not found' })
        }
        const url = `/upload/${req.file.filename}`;
        const data = new Course({
            title,
            category,
            subCategory,
            price,
            userId,
            description,
            thumbnail: url
        })
        await data.save();
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Internal error' })
    }

}