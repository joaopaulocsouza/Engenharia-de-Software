import React,{Component, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Initial from './src/views/Initial/Initial';
import Home from './src/views/Home/Home';
import Register from './src/views/Register/Register';
import Login from './src/views/Login/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RegisterEvent from './src/views/RegisterEvent/RegisterEvent';
import Subscription from './src/views/Subscription/Subscription';
import EventDetails from './src/views/EventDetails/EventDetails';
import OrganizationDetails from './src/views/OrganizationDetails/Organizationdetails';
import EditUser from './src/views/EditUser/EditUser';
SplashScreen.preventAutoHideAsync();

const feastlyStack = createNativeStackNavigator();

const App = () => {
    const [fontsLoaded, fontError] = useFonts({
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
      'Nunito': require('./assets/fonts/Nunito-Regular.ttf'),
      'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
      'Montserrat-Italic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
    })

    if(!fontsLoaded){
      return null
    }

    return(
        <Provider store={store}>
          <NavigationContainer >

            <feastlyStack.Navigator screenOptions={{headerShown: false}} initialRouteName='Inicio'>
              <feastlyStack.Screen name="Inicio" component={Initial}></feastlyStack.Screen>
              <feastlyStack.Screen name="Home" component={Home}></feastlyStack.Screen>
              <feastlyStack.Screen name="Cadastro" component={Register}></feastlyStack.Screen>
              <feastlyStack.Screen name="Login" component={Login}></feastlyStack.Screen>
              <feastlyStack.Screen name="RegisterEvent" component={RegisterEvent}></feastlyStack.Screen>
              <feastlyStack.Screen name="Subscription" component={Subscription}></feastlyStack.Screen>
              <feastlyStack.Screen name="EventDetails" component={EventDetails}></feastlyStack.Screen>
              <feastlyStack.Screen name="OrganizationDetails" component={OrganizationDetails}></feastlyStack.Screen>
              <feastlyStack.Screen name="EditUser" component={EditUser}></feastlyStack.Screen>
            </feastlyStack.Navigator>
          </NavigationContainer>
        </Provider>
    )
  
}

export default App