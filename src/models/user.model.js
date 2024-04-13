const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const User = function(user) {
    this.userid = user.userid,
    this.email = user.email,
    this.username = user.username,
    this.password = user.password,
    this.role = user.role,
    this.country = user.country,
    this.phone = user.phone
}

User.create = async(newUser) => {
    //Generate a random UUID (v4)
    const uuid = crypto.randomUUID();

    //Hash the UUID with MD5
    const md5hash = crypto.createHash('md5').update(uuid).digest('hex');

    //Use md5hash as the userid in newUser
    newUser.userid = md5hash;

    try {
        const createdUser = await prisma.user.create({
            data: {
                userid: newUser.userid,
                email: newUser.email,
                username: newUser.username,
                password: newUser.password ? newUser.password : '',
                role: newUser.role, 
                country: newUser.country,
                phone: newUser.phone
            }
        });

        console.log("created user: ", { ...createdUser });
        return createdUser;
    } catch(error) {
        console.error("Error creating user: ", error);
        throw error;
    }
};

User.findByEmail = async(email) => {
    try {   
        const user = await prisma.user.findUnique({
            where: { 
                email
            }
        });
        return user;
    } catch(error) {
        console.error("Error finding user by username: ", error);
        throw error;
    }
};

User.findByUserName = async(username) => {
    try {   
        const user = await prisma.user.findUnique({
            where: { 
                username
            }
        });
        return user;
    } catch(error) {
        console.error("Error finding user by username: ", error);
        throw error;
    }
}

User.findByPhone = async(phone) => {
    try {   
        const user = await prisma.user.findUnique({
            where: { 
                phone
            }
        });
        return user;
    } catch(error) {
        console.error("Error finding user by username: ", error);
        throw error;
    }
}

module.exports = User;