export default async function yearlyInvestment(id, date) {
  var raw = "";

  var requestOptions = {
    method: "GET",
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://roundup-api.herokuapp.com/data/investment/user/${id}/yearly/${date}`,
      requestOptions
    );
    const data = await response.json();

    let investmentArr = [];
    const monthOfInvestmentDateObj = new Date(date)
    // console.log("monthOfInvestmentDateObj", monthOfInvestmentDateObj)
    for (let i = 1; i <= 12; i++) {
      let monthlyInvestment = 0;
      // last day of month
      let lastday = new Date(
        monthOfInvestmentDateObj.getFullYear() - 1,
        monthOfInvestmentDateObj.getMonth() + i + 1,
        1
      );
      for (let entry of data[i-1]) {
        // console.log("last day",lastday)
        if (entry==null) {
          monthlyInvestment += 0;
        } else if (entry.priceHistory.length==0){
          monthlyInvestment += Number(entry.investmentsentry.price)*Number(entry.investmentsentry.quantity)
        } else {
          // if (i != 12) {
          //   indexFound = entry.priceHistory.findIndex(
          //     (element) => element.date == lastday.getTime() / 1000
          //   );
          //   monthlyInvestment +=
          //     Number(entry.priceHistory[indexFound].price) *
          //     Number(entry.priceHistory[indexFound].quantity);
          //   //console.log(indexFound, lastday.getTime()/1000, entry._id)
          // } else {
            monthlyInvestment +=
              Number(entry.priceHistory[entry.priceHistory.length - 1].price) *
              Number(entry.priceHistory[entry.priceHistory.length - 1].quantity);
          // }
        }
      }
      investmentArr.push(monthlyInvestment.toFixed(2));
      // console.log(investmentArr, lastday)
    }
    return investmentArr;
  } catch (err) {
    return err.json();
  }
}
