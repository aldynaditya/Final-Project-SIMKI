const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user.uuid, // Menggunakan uuid sebagai userId
        role: user.role,
        email: user.email,
        superuser: user.superuser,
    };
};

// const createTokenParticipant = (participant) => {
//     return {
//         lastName: participant.lastName,
//         participantId: participant._id,
//         firstName: participant.firstName,
//         email: participant.email,
//     };
// };

module.exports = { 
    createTokenUser, 
    // createTokenParticipant 
};