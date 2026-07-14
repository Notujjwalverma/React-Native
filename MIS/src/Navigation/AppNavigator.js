import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../Screens/Auth/Signinscreen';
import Dashboard from '../Screens/Dashboard';
import Profile from '../Screens/Employee/Profile';
import OtherPortals from '../Screens/Employee/OtherPortals';
import ApplyLeave from '../Screens/Leave Management/ApplyLeave';
import Employee_skills from '../Screens/Employee/Skills';
import LeaveRequestStatus from '../Screens/Leave Management/LeaveRequestStatus';
import MyAchievements from '../Screens/appraisalManagement/MyAchievements';
import AddGoals from '../Screens/appraisalManagement/AddGoals';
import Referrals from '../Screens/Organization/Referrals';
import Birthdays from '../Screens/Organization/Birthdays';
import MyReferrals from '../Screens/Employee/MyReferrals';
import MyAttendance from '../Screens/Employee/MyAttendance';
import TeamLeaves from '../Screens/Organization/TeamLeaves';
import MyAssets from '../Screens/Employee/MyAssets';
import WorkAnniversary from '../Screens/Organization/WorkAnniversary';
import LeaveBalance from '../Screens/Employee/LeaveBalance';
import Holidays from '../Screens/Organization/Holidays';
import CustomizeHoliday from '../Screens/Employee/CustomizeHoliday';

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
      <Stack.Screen name="Appraisal_myAchievements" component={MyAchievements} options={{headerShown : false}}/>
      <Stack.Screen name="Appraisal_addGoals" component={AddGoals} options={{headerShown : false}}/>
      <Stack.Screen name="Employee_birthdays" component={Birthdays} options={{headerShown : false}}/>
      <Stack.Screen name="Organization_referrals" component={Referrals} options={{headerShown : false}}/>
      <Stack.Screen name="Employee_myReferrals" component={MyReferrals} options={{headerShown : false}}/>
      <Stack.Screen name="Employee_myAttendance" component={MyAttendance} options={{headerShown : false}}/>
      <Stack.Screen name="Manager_teamLeaves" component={TeamLeaves} options={{headerShown : false}}/>
      <Stack.Screen name="Employee_skills" component={Employee_skills} options={{headerShown : false}}/>
      <Stack.Screen name='MyAssets' component={MyAssets} options={{headerShown : false}} />
      <Stack.Screen name='WorkAnniversary' component={WorkAnniversary} options={{headerShown : false}} />
      <Stack.Screen name='LeaveBalance' component={LeaveBalance} options={{headerShown : false}} />
      <Stack.Screen name='Holidays' component={Holidays} options={{headerShown : false}} />
      <Stack.Screen name='CustomizeHoliday' component={CustomizeHoliday} options={{headerShown : false}} />
    </Stack.Navigator>
  )
}
