window.addEventListener("load", () => {
  const token = document.cookie
    .split(";")
    .map((e) => e.trim())
    .find((e) => e.startsWith("token"));

  const destination = token ? "./home" : "./signin";

  window.location.replace(destination);
});
