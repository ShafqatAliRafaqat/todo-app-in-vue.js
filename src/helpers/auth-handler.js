/* eslint-disable */

export function setUser(user) {
  localStorage.setItem("id", user.id);
  localStorage.setItem("name", user.name);
  localStorage.setItem("email", user.email);
  localStorage.setItem("email_verified", user.email_verified);
  if (user.access_token) {
    localStorage.setItem("access_token", user.access_token);
  }
}

export function getUser() {
  const id = localStorage.getItem("id") || "";
  const name = localStorage.getItem("name") || "";
  const email = localStorage.getItem("email") || "";
  const accessToken = localStorage.getItem("access_token") || "";
  const email_verified = localStorage.getItem("email_verified") || "";

  // @ts-ignore

  if (accessToken) {
    return {
      id,
      name,
      email,
      email_verified: email_verified,
      access_token: accessToken,
    };
  }
  return undefined;
}
