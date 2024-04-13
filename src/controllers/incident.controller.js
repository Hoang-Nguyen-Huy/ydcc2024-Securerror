const Incident = require('../models/incident.model');

exports.createIncident = async (req, res) => {
    for (let incident of req.body) {
        incident.patientid = req.session.user.userid;
        Incident.create(incident, (err, newIncident) => {
            if (err) {
                console.error('Error creating incident', err);
            }
        });
    }
};