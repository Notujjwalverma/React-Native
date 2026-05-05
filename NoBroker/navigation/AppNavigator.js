import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homescreen from "../Screens/HomeScreen";
import SignIn from "../Screens/SignInScreen";
import SignUp from "../Screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() { 
    return ( 
        <Stack.Navigator initialRouteName="Home">   
            <Stack.Screen
                name="Home"
                component={Homescreen}
                options={{headerShown : false}}
            />
            <Stack.Screen
                name="Signin"
                component={SignIn}
            />
            <Stack.Screen
                name="Signup"
                component={SignUp}
            />
        </Stack.Navigator>
    );
}