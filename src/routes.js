import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
 createStackNavigator(
  {
   Main,
   User,
  },
  {
   headerLayoutPreset: 'center',
   defaultNavigationOptions: {
    headerBackTitleVisible: false,
    headerStyle: {
     backgroundColor: '#3a2007',
    },
    headerTintColor: '#FFF',
   },
  }
 )
);

export default Routes;
