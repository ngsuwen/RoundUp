export default async function checkToken(accessToken, refreshToken) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    });
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://roundup-api.herokuapp.com/session/token",
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return err.json();
    }
  }