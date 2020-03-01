import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
 const tron = Reactotron.configure({ host: '192.168.56.101' })
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .connect();

 console.tron = tron;

 tron.clear();
}
