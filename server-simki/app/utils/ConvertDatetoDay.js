const getDayOfWeek = (date) => {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    return days[new Date(date).getDay()];
};

module.exports = { getDayOfWeek };