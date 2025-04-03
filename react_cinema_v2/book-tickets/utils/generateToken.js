export function generateRandomToken(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

export const generateRandomString = (length) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
export function shortenEthereumAddress(address) {
  const start = address.substring(0, 4 + 2);
  const end = address.substring(address.length - 4);

  return `${start}...${end}`;
}