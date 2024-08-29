export const getDayString = (date) => {
    const dayMap = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    return dayMap[dayOfWeek];
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};