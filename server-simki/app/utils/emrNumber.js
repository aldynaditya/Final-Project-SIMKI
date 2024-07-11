let currentNoEMR = 0;

const generateNoEMR = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
    const autoIncrement = (++currentNoEMR).toString().padStart(5, '0'); // Increment and pad with zeros
    const noEMR = `EMR${formattedDate}${autoIncrement}`;
    return noEMR;
};

module.exports = {
    generateNoEMR
};