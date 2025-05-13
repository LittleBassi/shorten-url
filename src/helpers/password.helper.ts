import * as argon from "argon2";

const validatePassword = (password: string) => {
  const errors: string[] = [];
  const validator = {
    lowerCase: {
      regex: /([a-z]+)/gm,
      message: "The password must contain at least one lowercase letter.",
    },
    upperCase: {
      regex: /([A-Z]+)/gm,
      message: "The password must contain at least one uppercase letter.",
    },
    number: {
      regex: /(\d+)/gm,
      message: "The password must contain at least one number.",
    },
    special: {
      regex: /([@$!%*?&]+)/gm,
      message: "The password must contain at least one special character.",
    },
    length: {
      regex: /[A-Za-z\d@$!%*?&]{8,}/gm,
      message: "The password must be at least 8 characters long.",
    },
  };

  let val: keyof typeof validator;
  for (val in validator) {
    if (!validator[val].regex.exec(password)) {
      errors.push(validator[val].message);
    }
  }

  return errors;
};

const samePassword = async (oldPass: string, newPass: string) => {
  const samePassword = await argon.verify(oldPass, newPass);
  return samePassword;
};

const getHexPassword = async (password: string) => {
  const hexPassword = await argon.hash(password);
  return hexPassword;
};

export { validatePassword, samePassword, getHexPassword };
