export default async function getUser(id) {
    var raw = "";
  
    var requestOptions = {
      method: "GET",
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
  