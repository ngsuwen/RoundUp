export default async function deleteUser(id, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    oldPassword: password,
  });

  var requestOptions = {
    method: "DELETE",
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
