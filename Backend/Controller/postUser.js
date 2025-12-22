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
        res.cookie("email", exist.email, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false
        })
        // console.log("exist", exist);
        return res.status(200).json({ message: 'Login Successfully', exist })
    } catch (err) {
        return res.status(500).json('Internal error', err.message)
    }

}

module.exports.getUser = async (req, res) => {
    const email = req.cookies.email;
    try {
        // console.log(email)
        if (!email) {
            return res.status(404).json({ message: 'no cookie avaiable' })
        }
        const user = await User.findOne({ email });
        // console.log(user);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json('Internal error', err.message)
    }

}

module.exports.getAllCards = async (req, res) => {
    try {
        const data = await Course.find().populate('userId', 'name profession');
        const formatted = data.map(course => ({
            ...course.toObject(),
            thumbnail: course.thumbnail
                ? `data:image/png;base64,${course.thumbnail.toString('base64')}`
                : null,
            video: course.video
                ? `data:video/mp4;base64,${course.video.toString('base64')}`
                : null,
            userId: course.userId
        }));
        // console.log(data)
        return res.json({ data: formatted })
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
        // console.log('data', data);
        const formatted = data.map(course => ({
            ...course.toObject(),
            thumbnail: course.thumbnail
                ? `data:image/png;base64,${course.thumbnail.toString('base64')}`
                : null,
            video: course.video
                ? `data:video/mp4;base64,${course.video.toString('base64')}`
                : null,
            userId: course.userId
        }));
        return res.json({ data: formatted })
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
        const thumbnail = req.files.thumbnail[0];
        const video = req.files.video[0];
        const data = new Course({
            title,
            category,
            subCategory,
            price,
            userId,
            description,
            thumbnail: thumbnail.buffer,
            video: video.buffer
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
        let count;
        // console.log(user.fav.includes(cardId))
        if (user.fav.includes(cardId)) {
            count = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { fav: cardId },
                    $addToSet: { cart: cardId }
                }, { new: true }
            );
        } else {
            count = await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { cart: cardId }
                }, { new: true }
            );
        }
        // console.log(count.cart.length)
        return res.json({ message: 'added to cart', cartCount: count.cart.length })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.postFav = async (req, res) => {
    const { cardId, userId } = req.body;
    try {
        const user = await User.findById(userId);
        const count = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { fav: cardId } },
            { new: true }
        );
        // console.log(count.fav.length)
        return res.json({ message: 'Added to fav', favCount: count.fav.length })
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
            thumbnail: item?.thumbnail ? `data:image/png;base64,${item.thumbnail.toString('base64')}` : null,
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
            thumbnail: item?.thumbnail ? `data:image/png;base64,${item.thumbnail.toString('base64')}` : null,
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
            video: item?.video ? `data:video/mp4;base64,${item.video.toString('base64')}` : null,
            title: item?.title,
            description: item?.description,
            thumbnail: item?.thumbnail ? `data:image/png;base64,${item.thumbnail.toString('base64')}` : null,
            alreadyRated: item.rating?.users?.some(u => u.toString() === userId.toString())
        }))
        // console.log(format);
        return res.json(format);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.getIndividualLearn = async (req, res) => {
    const { cardId } = req.params;
    try {
        const data = await Course.findById(cardId).populate('userId', 'name profession')
        const format = {
            name: data.userId?.name,
            profession: data.userId?.profession,
            title: data?.title,
            thumbnail: data?.thumbnail ? `data:image/png;base64,${data.thumbnail.toString('base64')}` : null,
            video: data?.video ? `data:video/mp4;base64,${data.video.toString('base64')}` : null,
            rating: data?.rating,
            description: data?.description
        }
        return res.status(200).json(format)
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

module.exports.getGuestCart = async (req, res) => {
    const { ids } = req.body;
    // console.log(ids);
    try {
        if (!ids) {
            return res.status(200).json({ messgae: 'no id' })
        }
        const data = await Course.find({ _id: { $in: ids } }).populate('userId', 'name profession')
        // console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.addGuestCart = async (req, res) => {
    const { ids, userId } = req.body;
    try {
        await User.findByIdAndUpdate(userId,
            { $addToSet: { cart: ids } },
            { new: true }
        )
        res.status(200).json({ message: 'added cart' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.addRating = async (req, res) => {
    const { value, cardId, userId } = req.body;
    // console.log(value, cardId, userId);
    try {
        const course = await Course.findById(cardId);
        // console.log('course', course);
        const alreadyRated = course.rating.users.some(
            u => u.toString() === userId.toString()
        );
        if (alreadyRated) {
            return res.status(404).json({
                message: "You have already given a rating"
            });
        }
        course.rating.total += value;
        course.rating.count += 1;
        course.rating.average = Number(
            (course.rating.total / course.rating.count).toFixed(1)
        );
        course.rating.users.push(userId);

        await course.save();
        // console.log(course);
        return res.status(200).json({ message: "Rating added successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("email", {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
