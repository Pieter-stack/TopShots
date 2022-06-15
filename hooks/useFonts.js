//import all fonts library
import * as Font from 'expo-font';

//export fonts you want to use in the app
export default useFonts = async () =>
  await Font.loadAsync({
    Allan: require("../assets/fonts/Allan-Bold.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });