const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const srcSolution = function(srcSol) {
    this.id = srcSol.id, 
    this.content = srcSol.content, 
    this.problem = srcSol.problem
}

srcSolution.create = async(newSrcSol) => {
    //Generate a random UUID (v4)
    const uuid = crypto.randomUUID();

    //Hash the UUID with MD5
    const md5hash = crypto.createHash('md5').update(uuid).digest('hex');

    //Use md5hash as the userid in newUser
    newSrcSol.solutionid = md5hash;

    try {
        const createdSrcSol = await prisma.create({
            data: {
                id: newSrcSol.id, 
                content: newSrcSol.content, 
                problem: newSrcSol.problem
            }
        });
    } catch(error) {
        console.error("Error creating src: ", error);
        throw error;
    }
};