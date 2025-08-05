export const getUrls = () => JSON.parse(localStorage.getItem("urls") || "[]");

export const saveUrls = (urls) => {
  localStorage.setItem("urls", JSON.stringify(urls));
};
