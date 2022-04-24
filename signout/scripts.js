window.addEventListener("load", async () => {
  try {
    await promisify(gapi.load)("auth2");

    await gapi.auth2.init();

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.get() && (await auth2.signOut());
  } catch (err) {
    console.error(err);
  } finally {
    const epochDate = new Date(0).toUTCString();
    document.cookie = `token=; Expires=${epochDate};  Path=/; SameSime=Strict`;
    document.cookie = `google_token=; Expires=${epochDate};  Path=/; SameSime=Strict`;

    window.location.replace("../signin");
  }
});

const promisify =
  (fun) =>
  (...args) =>
    new Promise((res, rej) =>
      fun(...args, (err, ...rest) => (err ? rej(err) : res(...rest)))
    );
