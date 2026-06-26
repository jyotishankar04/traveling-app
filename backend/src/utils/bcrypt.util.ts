import bcrypt from "bcryptjs";

const salt = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};
