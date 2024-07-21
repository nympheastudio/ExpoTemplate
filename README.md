
# Expo Template with Jotai State Management

![Expo](https://img.shields.io/badge/expo-^51.0.8-blue)
![Jotai](https://img.shields.io/badge/jotai-^2.9.0-green)
![React Navigation](https://img.shields.io/badge/react--navigation-^6.1.17-yellow)

An awesome Expo template with Jotai for state management and React Navigation for seamless navigation between screens.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Adding New Screens](#adding-new-screens)
- [Managing State with Jotai](#managing-state-with-jotai)
  - [Simple State](#simple-state)
  - [Complex State](#complex-state)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expo-template-jotai.git
   cd expo-template-jotai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure
```css
project-root/
├── App.js
├── src/
│   ├── components/
│   │   └── ExampleComponent.js
│   ├── navigator/
│   │   └── Navigator.js
│   ├── store/
│   │   └── jotaiState.js
│   ├── utils/
│   │   └── atomWithAsyncStorage.js
│   └── views/
│       ├── Home.js
│       └── ProfileScreen.js
```

## Adding New Screens

To add a new screen to your Expo app, follow these steps:

1. **Create the Screen Component:**
   Create a new screen file in the `src/views/` directory. For example, `ProfileScreen.js`:

   ```javascript
   // src/views/ProfileScreen.js
   import React from 'react';
   import { View, Text } from 'react-native';

   const ProfileScreen = () => {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Profile Screen</Text>
       </View>
     );
   };

   export default ProfileScreen;
   ```

2. **Add the Screen to the Navigator:**
   Update `Navigator.js` to include the new screen:

   ```javascript
   // src/navigator/Navigator.js
   import React from 'react';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   import Home from '../views/Home';
   import ExampleComponent from '../views/ExampleComponent';
   import ProfileScreen from '../views/ProfileScreen';

   const Stack = createStackNavigator();

   const Navigator = () => {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Example" component={ExampleComponent} />
           <Stack.Screen name="Profile" component={ProfileScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   };

   export default Navigator;
   ```

3. **Navigate to the New Screen:**
   Update `Home.js` to navigate to the new `ProfileScreen`:

   ```javascript
   // src/views/Home.js
   import React from 'react';
   import { View, Text, Button } from 'react-native';
   import { useAtom } from 'jotai';
   import { homeCountAtom } from '../store/jotaiState';

   const Home = ({ navigation }) => {
     const [count, setCount] = useAtom(homeCountAtom);

     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>{count}</Text>
         <Button title="Increment" onPress={() => setCount(count + 1)} />
         <Button title="Go to Example Component" onPress={() => navigation.navigate('Example')} />
         <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
       </View>
     );
   };

   export default Home;
   ```

## Managing State with Jotai

### Simple State

1. **Define a Simple State Atom:**
   Define a simple state atom in `jotaiState.js`:

   ```javascript
   // src/store/jotaiState.js
   import { atomWithAsyncStorage } from '../utils/atomWithAsyncStorage';

   export const homeCountAtom = atomWithAsyncStorage('homeCount', 0);
   export const exampleCountAtom = atomWithAsyncStorage('exampleCount', 0);
   export const userNameAtom = atomWithAsyncStorage('userName', '');
   ```

2. **Use the Simple Atom in a Component:**
   Use the simple atom in a component, for example, `ProfileScreen.js`:

   ```javascript
   // src/views/ProfileScreen.js
   import React from 'react';
   import { View, Text, TextInput } from 'react-native';
   import { useAtom } from 'jotai';
   import { userNameAtom } from '../store/jotaiState';

   const ProfileScreen = () => {
     const [userName, setUserName] = useAtom(userNameAtom);

     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Profile Screen</Text>
         <TextInput
           value={userName}
           onChangeText={setUserName}
           placeholder="Enter your name"
           style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 5, width: 200 }}
         />
       </View>
     );
   };

   export default ProfileScreen;
   ```

### Complex State

1. **Define a Complex State Atom:**
   Define a complex state atom in `jotaiState.js`:

   ```javascript
   // src/store/jotaiState.js
   import { atomWithAsyncStorage } from '../utils/atomWithAsyncStorage';

   export const homeCountAtom = atomWithAsyncStorage('homeCount', 0);
   export const exampleCountAtom = atomWithAsyncStorage('exampleCount', 0);
   export const userNameAtom = atomWithAsyncStorage('userName', '');

   // Define a complex atom
   export const userSettingsAtom = atomWithAsyncStorage('userSettings', {
     theme: 'light',
     notifications: true,
     notes: ''
   });
   ```

2. **Use the Complex Atom in a Component:**
   Use the complex atom in a component, for example, `ProfileScreen.js`:

   ```javascript
   // src/views/ProfileScreen.js
   import React from 'react';
   import { View, Text, Button, TextInput } from 'react-native';
   import { useAtom } from 'jotai';
   import { userSettingsAtom } from '../store/jotaiState';

   const ProfileScreen = () => {
     const [userSettings, setUserSettings] = useAtom(userSettingsAtom);

     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>Profile Screen</Text>
         <Button
           title={`Toggle Theme (Current: ${userSettings.theme})`}
           onPress={() =>
             setUserSettings({
               ...userSettings,
               theme: userSettings.theme === 'light' ? 'dark' : 'light'
             })
           }
         />
         <Text>Notifications: {userSettings.notifications ? 'On' : 'Off'}</Text>
         <Button
           title="Toggle Notifications"
           onPress={() =>
             setUserSettings({
               ...userSettings,
               notifications: !userSettings.notifications
             })
           }
         />
         <Text>Notes: {userSettings.notes}</Text>
         <TextInput
           value={userSettings.notes}
           onChangeText={(text) =>
             setUserSettings({
               ...userSettings,
               notes: text
             })
           }
           placeholder="Enter notes"
           style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 5, width: 200 }}
         />
       </View>
     );
   };

   export default ProfileScreen;
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
