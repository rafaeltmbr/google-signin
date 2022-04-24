window.addEventListener("load", async () => {
  await promisify(gapi.load)("auth2");
  const auth2 = gapi.auth2.init();

  const signInButton = document.getElementById("google-signin");
  auth2.attachClickHandler(signInButton, {}, onSignIn);
});

const onSignIn = (googleUser) => {
  const profile = googleUser.getBasicProfile();

  const { id_token } = googleUser.getAuthResponse();
  document.cookie = `google_token=${id_token}; SameSite=Strict; Path=/`;

  window.location.replace("../home");
};

const promisify =
  (fun) =>
  (...args) =>
    new Promise((res, rej) =>
      fun(...args, (err, ...rest) => (err ? rej(err) : res(...rest)))
    );
