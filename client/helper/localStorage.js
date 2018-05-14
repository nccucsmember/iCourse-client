export function updateAccessToken(name, value) {
  localStorage.setItem(name, value);
}

export default {
  updateAccessToken,
};
