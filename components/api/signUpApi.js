export default async function signUpApi(
  username,
  password,
  passwordCheck,
  role
) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: username,
    password: password,
    passwordCheck: passwordCheck,
    role: role === "" ? "BASIC" : "PREMIUM",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://roundup-api.herokuapp.com/user/signup",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.json();
  }
}
