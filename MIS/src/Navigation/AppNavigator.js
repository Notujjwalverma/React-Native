import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../Screens/Auth/Signinscreen';
import Dashboard from '../Screens/Employee/Dashboard';
import Profile from '../Screens/Employee/Profile';
import OtherPortals from '../Screens/Employee/OtherPortals';
import ApplyLeave from '../Screens/Employee/Leave Management/ApplyLeave';
import LeaveRequestStatus from '../Screens/Employee/Leave Management/LeaveRequestStatus';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen name="Signin" component={SignInScreen} options={{headerShown : false}}/>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown : false}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown : false}}/>
      <Stack.Screen name="OtherPortals" component={OtherPortals} options={{headerShown : false}}/>
      <Stack.Screen name="ApplyLeave" component={ApplyLeave} options={{headerShown : false}}/>
      <Stack.Screen name="LeaveRequestStatus" component={LeaveRequestStatus} options={{headerShown : false}}/>
    </Stack.Navigator>
  )
}
