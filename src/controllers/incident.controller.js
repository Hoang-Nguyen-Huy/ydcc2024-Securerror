const Incident = require('../models/incident.model');

exports.createIncident = async (req, res) => {
    try {
        const { body, session } = req;
        const userId = session.user.userid;

        for (let incident of body) {
            incident.patientid = userId;
            await createSingleIncident(incident);
        }

        // Sau khi tất cả các sự cố đã được tạo thành công, chuyển hướng đến /result
        res.redirect('/result');
    } catch (error) {
        console.error('Error creating incidents:', error);
        res.status(500).send('Failed to create incidents');
    }
};

async function createSingleIncident(incident) {
    try {
        // Gọi Incident.create và chờ đợi nó hoàn thành
        const newIncident = await Incident.create(incident);
    } catch (error) {
        console.error('Error creating incident:', error);
        throw error; // Ném lỗi để bắt ở nơi gọi hàm này (createIncident)
    }
}
