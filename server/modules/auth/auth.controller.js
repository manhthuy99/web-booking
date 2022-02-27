var bcrypt = require('bcryptjs');
const UserModel = require('./user');
const HttpError = require('../../common/httpError');
const tokenProvider = require('../../common/tokenProvider');

const signUp = async (req, res) => {
    const { username, password, role } = req.body;

    const exitedUser = await UserModel.findOne({ username });
    if (exitedUser) {
        throw new HttpError('Đăng kí thất bại', 400);
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({ username, password: hashPassword, role });

    const token = tokenProvider.sign(newUser._id);

    res.send({
        success: 1,
        data: {
            _id: newUser._id,
            username: newUser.username,
            role: newUser.role,
            token
        }
    })
}

const login = async (req, res) => {
    const { username, password, role } = req.body;

    const exitedUser = await UserModel.findOne({ username });
    if (!exitedUser) {
        throw new HttpError('Đăng nhập thất bại', 400);
    }
    const hashPassword = exitedUser.password;

    const matchedPassword = await bcrypt.compare(password, hashPassword);

    if (!matchedPassword) {
        throw new HttpError('Đăng nhập thất bại', 400);
    }

    const token = tokenProvider.sign(exitedUser._id);
    res.send({
        success: 1,
        data: {
            _id: exitedUser._id,
            username: exitedUser.username,
            role: exitedUser.role,
            token
        }
    })
}

const getUserInfo = async (req, res) => {
    const { user } = req;
    const userInfo = user ? {
        username: user.username,
        _id: user._id
    } : null;

    res.send({ success: 1, data: userInfo });
}
module.exports = {
    signUp,
    login,
    getUserInfo
}