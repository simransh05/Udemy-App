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
        if (!req.files || !req.files.thumbnail || !req.files.video) {
            return res.status(404).json({ message: 'file not found' })
        }
        const url = `/upload/${req.files.thumbnail[0].filename}`;
        const videoUrl = `/upload/${req.files.video[0].filename}`;
        const data = new Course({
            title,
            category,
            subCategory,
            price,
            userId,
            description,
            thumbnail: url,
            video: videoUrl
        })
        await data.save();
        return res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: 'Internal error' })
    }
}

module.exports.postCart = async (req, res) => {
    const { cardId, userId } = req.body;
    try {
        // console.log(cardId, userId)
        const user = await User.findById(userId);
        // console.log(user.fav.includes(cardId))
        if (user.fav.includes(cardId)) {
            await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { fav: cardId },
                    $addToSet: { cart: cardId }
                }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { cart: cardId }
                }
            );
        }

        return res.json({ message: 'added to cart', data: user.cart })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.postFav = async (req, res) => {
    const { cardId, userId } = req.body;
    try {
        const user = await User.findById(userId);
        await User.findByIdAndUpdate(
            userId,
            { $addToSet: { fav: cardId } },
            { new: true }
        );
        return res.json({ message: 'Added to fav' })
    }

    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate({ path: 'cart', populate: { path: 'userId', select: 'name profession' } });
        // console.log('cart', user)
        const format = user.cart.map(item => ({
            title: item?.title,
            name: item.userId?.name,
            profession: item.userId?.profession,
            description: item?.description,
            price: item?.price,
            thumbnail: item?.thumbnail,
            id: item?._id
        }))
        // console.log(format)
        return res.json(format);
    } catch (err) {
        res.status(500).json({ message: 'internal error' })
    }

}

module.exports.getFav = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate({ path: 'fav', populate: { path: 'userId', select: 'name profession' } });
        // console.log('fav', user)
        const format = user.fav.map(item => ({
            title: item?.title,
            name: item.userId?.name,
            profession: item.userId?.profession,
            description: item?.description,
            price: item?.price,
            thumbnail: item?.thumbnail,
            id: item?._id
        }))
        // console.log('fav', format)
        return res.json(format);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.deleteCartItem = async (req, res) => {
    const { cardId, userId } = req.body;
    // console.log(userId, cardId)
    try {
        await User.findByIdAndUpdate(userId,
            { $pull: { cart: cardId } }
        )
        return res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.deleteFavItem = async (req, res) => {
    const { userId, cardId } = req.body;
    try {
        await User.findByIdAndUpdate(userId,
            { $pull: { fav: cardId } }
        )
        return res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.postLearn = async (req, res) => {
    const { userId, cardId } = req.body;
    try {
        const user = await User.findById(userId);
        await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { learn: cardId },
                $pull: {
                    cart: cardId,
                    fav: cardId
                }
            },
            { new: true }
        );
        return res.json({ message: 'Added to Learn' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.getLearn = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate({ path: 'learn', populate: { path: 'userId', select: 'name profession' } });
        // console.log('user', user)
        const format = user.learn.map(item => ({
            name: item.userId?.name,
            profession: item.userId?.profession,
            id: item?.id,
            video: item?.video,
            title: item?.title,
            description: item?.description,
            thumbnail: item?.thumbnail
        }))
        // console.log(format);
        return res.json(format);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.deleteLearnItem = async (req, res) => {
    const { userId, cardId } = req.body;
    try {
        await User.findByIdAndUpdate(
            userId,
            { $pull: { learn: cardId } }
        )
        return res.status(200).json({ message: 'Successfully Deleted' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.deleteCardItem = async (req, res) => {
    const { cardId } = req.params;
    try {
        await User.updateMany(
            {},
            {
                $pull: {
                    fav: cardId,
                    cart: cardId,
                    learn: cardId
                }
            }
        )
        await Course.findByIdAndDelete(cardId);
        return res.status(200).json({ message: 'Successfully Deleted' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}