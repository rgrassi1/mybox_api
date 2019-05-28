const bcrypt = require('bcrypt');

export const gerarHash = async(str) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(str, salt);
}