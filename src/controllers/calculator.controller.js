const Incident = require('../models/incident.model');
const srcSolution = require('../models/srcSolution.model');
const Solution = require('../models/solution.model');

exports.calculate = async (req, res) => {
    const patientid = req.session.user.userid;
    const allIncidents = await Incident.getByPatientId(patientid);
    const allSrcSolutions = await srcSolution.getAll();

    const uniqueMatchingSolutions = new Set();

    // Sử dụng Set để lưu trữ các năm duy nhất từ các sự cố
    const uniqueYears = new Set();

    // Biến đếm số lượng nội dung chứa cụm từ 'thành công'
    let successCount = 0;

    // Lặp qua từng sự cố và lấy năm từ trường dateOccured
    allIncidents.forEach(incident => {
        const dateOccured = new Date(incident.dateOccured);
        const year = dateOccured.getFullYear();
        uniqueYears.add(year); // Thêm năm vào Set để loại bỏ các năm trùng lặp

        // Kiểm tra nội dung của sự cố có chứa cụm từ 'thành công' không
        if (incident.content.includes('thành công')) {
            successCount++; // Tăng biến đếm nếu nội dung chứa cụm từ 'thành công'
        }

        // Tìm các srcSolution khớp với incident
        allSrcSolutions.forEach(srcSol => {
            if (srcSol.problem.includes(incident.content.toLowerCase()) || srcSol.problem.includes(incident.name.toLowerCase())) {
                uniqueMatchingSolutions.add(srcSol);
            }
        });
    });

    const matchingSolutions = Array.from(uniqueMatchingSolutions);

    for(let sol of matchingSolutions) {
        sol.patientid = patientid;
        await createSingleSolution(sol);
    }

    // Số lượng năm duy nhất là độ dài của Set uniqueYears
    const numberOfYears = uniqueYears.size;

    // Tính tần suất xảy ra tấn công
    const frequencyAttack = allIncidents.length / numberOfYears;

    // Tỉ lệ thành công của các cuộc tấn công
    const successRate = successCount / allIncidents.length;

    // likelihood = tần suất xảy ra tấn công * tỷ lệ tấn công THÀNH CÔNG
    const likelihood = frequencyAttack * successRate;

    console.log(likelihood);

    let likelihoodRank;
    if (likelihood == 1) {
        likelihoodRank = 5;
    } else if (likelihood >= 0.75) {
        likelihoodRank = 4;
    } else if (likelihood >= 0.5) {
        likelihoodRank = 3;
    } else if (likelihood >= 0.25) {
        likelihoodRank = 2;
    } else if (likelihood >= 0.05) {
        likelihoodRank = 1;
    } else if (likelihood >= 0) {
        likelihoodRank = 0;
    }

    console.log(likelihoodRank);

    // Tìm sự cố có năm gần nhất với năm hiện tại
    const currentYear = new Date().getFullYear();
    let nearestIncident = null;
    let minYearDifference = Infinity;

    allIncidents.forEach(incident => {
        const incidentYear = new Date(incident.dateOccured).getFullYear();
        const yearDifference = Math.abs(currentYear - incidentYear);
        
        if (yearDifference < minYearDifference) {
            minYearDifference = yearDifference;
            nearestIncident = incident;
        }
    });

    // Lấy thông tin damage và hoursLost của sự cố có năm gần nhất
    if (nearestIncident) {
        const { damage, hoursLost } = nearestIncident;
        console.log(`Thông tin sự cố gần nhất với năm hiện tại: Damage = ${damage}, Hours Lost = ${hoursLost}`);
    } else {
        console.log('Không tìm thấy sự cố nào.');
    }

    let potentialImpactRank;
    if (isNaN(nearestIncident.damage) || isNaN(nearestIncident.hoursLost)) {
        potentialImpactRank = 0;
    } else if (nearestIncident.damage === 0 || nearestIncident.hoursLost === 0) {
        potentialImpactRank = 1;
    } else if (nearestIncident.damage <= 20000 || nearestIncident.hoursLost <= 2) {
        potentialImpactRank = 2;
    } else if (nearestIncident.damage <= 175000 || nearestIncident.hoursLost <= 4) {
        potentialImpactRank = 3;
    } else if (nearestIncident.damage <= 2000000 || nearestIncident.hoursLost <= 8) {
        potentialImpactRank = 4;
    } else if (nearestIncident.damage <= 20000000 || nearestIncident.hoursLost <= 24) {
        potentialImpactRank = 5;
    }

    res.render('result', {
        likelihoodRank,
        potentialImpactRank,
        matchingSolutions
    });
};


async function createSingleSolution(solution) {
    try {
        const newSol = await Solution.create(solution);
    } catch (error) {
        console.error('Error creating solution: ', error);
        throw error;
    }
}