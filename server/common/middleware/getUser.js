const tokenProvider = require('../tokenProvider');
const UserModel = require('../../modules/auth/user');

const getUser = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            next();
        };

        const identityData = tokenProvider.verify(token);
        if (!identityData.userId) {
            next();
        }

        const exitedUser = await UserModel.findById(identityData.userId);

        if (!exitedUser) {
            next();
        } req.user = exitedUser;

        next();
    } catch (err) {
        next();
    }
}
module.exports = getUser;
