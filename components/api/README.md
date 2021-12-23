1. Import the following files (file locations might be different)
```
import checkToken from "./api/checkToken";
import { UserContext } from "../App";
import * as SecureStore from "expo-secure-store";
```

2. Instantiate UserContext
```
const [user, setUser] = useContext(UserContext);
```

3. Use useEffect to check validity of tokens
```
useEffect(async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const isTokenValid = await checkToken(accessToken, refreshToken);
    if (isTokenValid.error) {
      setUser('');
      navigation.navigate("Login");
    } else {
      await SecureStore.setItemAsync("accessToken", isTokenValid.accessToken);
      await SecureStore.setItemAsync(
        "refreshToken",
        isTokenValid.refreshToken
      );
    }
  } catch (err) {
    setUser('');
    navigation.navigate("Login");
  }
}, []);
  ```
