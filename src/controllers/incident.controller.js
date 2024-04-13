const Incident = require('../models/incident.model');

exports.createIncident = async (req, res) => {
    const { content, dateOccured, name, damage } = req.body;
    const patientid = req.session.user.userid;
    Incident.create({ content, dateOccured, name, damage, patientid }, (err, incident) => {
        if (err) {
            console.error('Error creating incident', err);
        }
    });
};