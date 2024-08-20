const validateTimeFormat = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
        throw new Error('Invalid time format. Use HH:mm.');
    }
    return `${time}:00`;
};

const timesOverlap = (start1, end1, start2, end2) => {
    return (start1 < end2 && start2 < end1);
};

module.exports = {
    validateTimeFormat,
    timesOverlap
};