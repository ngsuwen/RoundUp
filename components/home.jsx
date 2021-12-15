import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Button } from 'react-native';
import { NativeBaseProvider, Pressable } from 'native-base';


export default function Home({ navigation }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressable: {
      backgroundColor: 'salmon',
      borderRadius: 5,
      padding: '2%',
      margin: '5%',
    },
    text:{
      color:'#fff'
    }
  });
  


  return (
    <View style={styles.container}>
      <Text>Home Page Component</Text>
      {/* button component can't be styled so we use a pressable component */}
      <NativeBaseProvider>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('About')}>
          <Text style={styles.text}>Go to About</Text>
        </Pressable>
      </NativeBaseProvider>
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
