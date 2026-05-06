import { ImageBackground, StyleSheet, Pressable, Text, View } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading fonts...</Text>
        </View>

    );
  }
  return (
            <ImageBackground source={{ uri: 'https://wallpapercat.com/w/middle-vertical-retina/7/2/3/289617-1440x2560-phone-hd-burj-khalifa-wallpaper.jpg' }} style={{ height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.heading}>NOBROKER</Text>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('Signin')}>
                        <Text style = {styles.btnText}>Sign In</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
                        <Text  style = {styles.btnText}>Become Our Partner</Text>
                    </Pressable>
                    <Text style = {styles.Description}> Version No. 1.0.0</Text>
                </View>
            </ImageBackground>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'transparent',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttons : {
            backgroundColor: 'transparent',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 50,
        },
        btnText : {
            color : 'white',
            textAlign : 'center',
            fontFamily : 'Poppins_400Regular',

        },
        heading: {
            color: 'white',
            fontFamily: 'Poppins_400Regular',
            fontSize: 40,
            fontWeight: 'bold',
        },
        text: {
            color: 'black',
            fontFamily: 'Poppins_400Regular',
            fontSize: 22,
        },
        Description :  { 
            color: 'white',
            fontFamily: 'Poppins_400Regular',
            fontSize: 12,
            marginTop: 20,
        },
        button: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid white',
            padding: 10,
            borderRadius: 5,
            margin: 5,
            width: '90%',
            textAlign: 'center',
            color: 'white',
            fontFamily: 'Poppins_400Regular',
        },
    }
)