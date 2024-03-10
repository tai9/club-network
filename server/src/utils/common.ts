export const generateRandomUsername = () => {
  const length = 5;
  const suffix = ".ken";
  const characters = "abcdefghijklmnopqrstuvwxyz";

  let username = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }

  return username + suffix;
};

export const generateRandomString = (options?: {
  prefix?: string;
  suffix?: string;
  length?: number;
}) => {
  const length = options?.length || 8;
  const characters = "abcdefghijklmnopqrstuvwxyz";

  let string = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    string += characters.charAt(randomIndex);
  }

  return options?.prefix + string + options?.suffix;
};
