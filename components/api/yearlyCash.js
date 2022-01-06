export default async function yearlyCash(id, date) {
    var raw = "";
  
    var requestOptions = {
      method: "GET",
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `https://roundup-api.herokuapp.com/data/cash/user/${id}/yearly/${date}`,
        requestOptions
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return err.json();
    }
  }
  