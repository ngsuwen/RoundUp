export default async function deleteUser(id) {
  var raw = "";

  var requestOptions = {
    method: "DELETE",
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
