const Episode = require('../api/v1/episode/model');
const EMRPasien = require('../api/v1/emrPasien/model');
const { 
    BadRequestError, 
    NotFoundError, 
    ForbiddenError 
} = require('../errors');

const checkEMRStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const episode = await Episode.findOne({
            where: { uuid: id },
            include: {
                model: EMRPasien,
                as: 'emrpasien'
            }
        });

        if (!episode) {
            throw new NotFoundError('Detail tidak ditemukan');
        }

        const status = episode.emrpasien.status;
        const finishedAt = episode.emrpasien.finishedAt;
        const questionnaireCompleted = episode.emrpasien.questionnaireCompleted;

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',questionnaireCompleted)

        if (status !== 'finished') {
            throw new BadRequestError('EMR Pasien belum selesai, tidak dapat mengakses kuisioner');
        }

        if (!finishedAt || isNaN(new Date(finishedAt).getTime())) {
            throw new BadRequestError('Invalid finishedAt date');
        }

        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        // if (new Date(finishedAt) > threeDaysAgo) {
        //     throw new ForbiddenError('Kuisioner hanya bisa diakses 3 hari setelah EMR selesai');
        // }

        if (questionnaireCompleted) {
            throw new ForbiddenError('Kuisioner sudah diisi, tidak dapat mengakses lagi');
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkEMRStatus;
