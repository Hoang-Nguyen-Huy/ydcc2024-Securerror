const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Solution = function(sol) {
    this.solutionid = sol.solutionid,
    this.content = sol.content, 
    this.patientid = sol.patientid, 
    this.problemid = sol.problemid
}

Solution.create = async(newSol) => {
    //Generate a random UUID (v4)
    const uuid = crypto.randomUUID();

    //Hash the UUID with MD5
    const md5hash = crypto.createHash('md5').update(uuid).digest('hex');

    //Use md5hash as the userid in newUser
    newSol.solutionid = md5hash;

    try {
        const createdSolution = await prisma.solution.create({
            data: {
                solutionid: newSol.solutionid, 
                content: newSol.content, 
                patientid: newSol.patientid
            }
        });
    } catch(error) {
        console.error("Error creating solution: ", error);
        throw error;
    }
};

module.exports = Solution;