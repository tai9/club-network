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
