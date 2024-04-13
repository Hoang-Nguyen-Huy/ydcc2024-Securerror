const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Incident = function(incident) {
    this.incidentid = incident.incidentid,
    this.content = incident.content,
    this.dateOccured = incident.dateOccured,
    this.createdAt = incident.createdAt,
    this.name = incident.name,
    this.damage = incident.damage,
    this.hoursLost = incident.hoursLost,
    this.patientid = incident.patientid
}

Incident.create = async (newIncident) => {
    //Generate a random UUID (v4)
    const uuid = crypto.randomUUID();

    //Hash the UUID with MD5
    const md5hash = crypto.createHash('md5').update(uuid).digest('hex');

    //Use md5hash as the userid in newUser
    newIncident.incidentid = md5hash;

    try {
        
        // Chuyển đổi dateOccured thành đối tượng Date nếu nó là một chuỗi
        if (typeof newIncident.dateOccured === 'string') {
            newIncident.dateOccured = new Date(newIncident.dateOccured);
        }

        // Kiểm tra nếu newIncident.dateOccured là một đối tượng Date hợp lệ
        if (!(newIncident.dateOccured instanceof Date && !isNaN(newIncident.dateOccured))) {
            throw new Error('Invalid dateOccured. Must be a valid Date object.');
        }

        // Chuyển đổi damage thành kiểu Int nếu nó là một chuỗi
        if (typeof newIncident.damage === 'string') {
            newIncident.damage = parseInt(newIncident.damage, 10); // Chuyển đổi sang số nguyên
        }

        if (typeof newIncident.hoursLost === 'string') {
            newIncident.hoursLost = parseInt(newIncident.hoursLost, 10); // Chuyển đổi sang số nguyên
        }

        const formattedDateOccured = newIncident.dateOccured.toISOString();

        const createdIncident = await prisma.incident.create({
            data: {
                incidentid: newIncident.incidentid,
                content: newIncident.content,
                dateOccured: formattedDateOccured,
                name: newIncident.name, 
                damage: newIncident.damage,
                hoursLost: newIncident.hoursLost,
                patientid: newIncident.patientid
            }
        });

        console.log('created incident: ', { ...createdIncident });
        // result(null, {
        //     ...createdIncident
        // });
        return createdIncident;
    } catch (error) {
        console.error('Error creating incident: ', error);
        result(error, null);
    }
};

Incident.getByPatientId = async (userid) => {
    try {
        const incidents = await prisma.incident.findMany({
            where: {
                patientid: userid
            }
        });

        return incidents;
    } catch (error) {
        console.error('Error getting incidents by patientid:', error);
        throw new Error('Failed to get incidents by patientid');
    }
};

module.exports = Incident;
