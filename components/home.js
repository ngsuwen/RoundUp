import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button} from 'react-native';

export default function Home({ navigation }) {

  return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Page Component</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  )
}
//     <SafeAreaView style={styles.container}>

//       <Text >Home</Text>
//       <Image source={{ 
//       width: 300,
//       height: 300,
//       uri: "https://cdn-icons-png.flaticon.com/512/4943/4943821.png" }}></Image>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection:'column',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




      {/* <View style={{
        backgroundColor:'salmon',
        width:Dimensions.get('screen').width, // setting the width to the full width of window/screen. Window/screen is same for iOS, only different for Android. Dimensions.get does not work when orientation changes
        height:'20%',
      }}>
      </View> */}

      {/* <View style={{
        backgroundColor:"dodgerblue",
        width:Dimensions.get('screen').width*1,
        flex:1
        }}/>

      <View style={{
      backgroundColor:"salmon",
      width:Dimensions.get('screen').width*1,
      flex:1
      }}/>

      <View style={{
      backgroundColor:"gold",
      width:Dimensions.get('screen').width*1,
      flex:1
      }}/> */}
