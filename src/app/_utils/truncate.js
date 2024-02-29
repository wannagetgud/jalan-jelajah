export const truncate = (text) => {
  const words = text.trim().split(" ");
  if (words.length <= 35) {
    return text;
  }
  const truncatedText = words.slice(0, 35).join(" ");
  return `${truncatedText}...`;
};
