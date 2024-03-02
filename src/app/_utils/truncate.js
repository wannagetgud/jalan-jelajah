export const truncate = (text) => {
  const words = text.trim().split(" ");
  if (words.length <= 35) {
    return text;
  }
  const truncatedText = words.slice(0, 25).join(" ");
  return `${truncatedText}...`;
};
