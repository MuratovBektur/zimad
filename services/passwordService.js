import bcrypt from "bcrypt";

function hashPassword(password) {
  return bcrypt.hash(password, 5);
}

function comparePassword(suppliedPassword, storedPassword) {
  return bcrypt.compare(suppliedPassword, storedPassword);
}

export { hashPassword, comparePassword };
