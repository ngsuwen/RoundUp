1. Import the following files (file locations might be different)
```
import checkToken from "./Sessions/checkToken";
import { TokenContext } from "../App";
import * as SecureStore from "expo-secure-store";
```

2. Instantiate TokenContext
```
const [tokenData, setTokenData] = useContext(TokenContext);
```

3. Use useEffect to check validity of tokens
```
useEffect(async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const isTokenValid = await checkToken(accessToken, refreshToken);
    if (isTokenValid.error) {
      setTokenData({
        accessToken: "",
        refreshToken: "",
      });
      navigation.navigate("Login");
    } else {
      await SecureStore.setItemAsync("accessToken", isTokenValid.accessToken);
      await SecureStore.setItemAsync(
        "refreshToken",
        isTokenValid.refreshToken
      );
    }
  } catch (err) {
    setTokenData({ accessToken: "", refreshToken: "" });
    navigation.navigate("Login");
  }
}, []);
  ```
