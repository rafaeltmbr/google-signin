window.addEventListener("load", async () => {
  try {
    const htmlElement = document.querySelector("pre");

    const googleToken = document.cookie
      .split(";")
      .map((e) => e.trim())
      .find((e) => e.startsWith("google_token"));

    const [key, value] = googleToken.split("=");

    const data = await verifyGoogleToken(value);

    htmlElement.innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    htmlElement.innerText = JSON.stringify(err?.message, null, 2);
  }
});

const verifyGoogleToken = async (token) => {
  const validationUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;

  const response = await fetch(validationUrl);

  return await response.json();
};
