const checkIfAdminUser  =  (req, res, next)  => {
    const { user } = req;
    if(!user.isAdmin) {
        return res.status(401).json({
        message: 'Unauthorized! Only admins.'
        })
    }else{
        return next()
    }
}

const checkIfNotAdminUser  =  (req, res, next)  => {
    const { user } = req;
    if(user.isAdmin) {
        return res.status(401).json({
        message: 'Unauthorized! Only users.'
        })
    }else{
        return next()
    }
}

module.exports = { checkIfAdminUser, checkIfNotAdminUser };