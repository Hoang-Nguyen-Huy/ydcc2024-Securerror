const Incident = require('../models/incident.model');

exports.createIncident = async (req, res) => {
    console.log(req.body);
    // const patientid = req.session.user.userid;
    // Incident.create({ content, dateOccured, name, damage, patientid }, (err, incident) => {
    //     if (err) {
    //         console.error('Error creating incident', err);
    //     }
    // });
};