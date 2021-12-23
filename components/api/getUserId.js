export default async function getUserId(refreshToken) {
  var raw = "";

  var requestOptions = {
    method: "GET",
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://roundup-api.herokuapp.com/session/${refreshToken}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err.json();
  }
}
