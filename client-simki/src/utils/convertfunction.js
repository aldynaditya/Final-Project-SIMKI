export const getDayString = (date) => {
    const dayMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    return dayMap[dayOfWeek];
};