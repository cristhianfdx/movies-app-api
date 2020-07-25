import * as bcrypt from 'bcrypt';

export async function encryptPassword(password) {
  return await new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export async function comparePassword(password, hashed) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}
