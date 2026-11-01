declare module '@react-native-firebase/auth' {
  import { FirebaseAuthTypes } from '@react-native-firebase/auth';
  function auth(): FirebaseAuthTypes.Module;
  namespace auth {
    const CONTAINER_KEY: string;
    
  }
  export default auth;
}