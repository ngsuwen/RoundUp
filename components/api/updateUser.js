export default async function signUpApi(id, passwordCheck, password, role) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    oldPassword: passwordCheck,
    newPassword: password === "" ? passwordCheck : password,
    role: role === "" ? "BASIC" : "PREMIUM",
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `https://roundup-api.herokuapp.com/user/${id}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.json();
  }
}
