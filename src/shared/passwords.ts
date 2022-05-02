import * as bcrypt from 'bcrypt'

export const hashPassword = async (password:string) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}


export const comparePasswords = async (plainPassword:string,hashedPassword:string) => {
    return await bcrypt.compare(plainPassword,hashedPassword);
}