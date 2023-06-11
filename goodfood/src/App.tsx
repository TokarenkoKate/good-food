import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipesSelectionScreen from './screens/recipes-selection-screen';
import RecipeDescriptionScreen from './screens/recipe-description-screen';

export type RootStackParamList = {
  RecipesSelectionScreen: undefined;
  RecipeDescriptionScreen: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="RecipesSelectionScreen"
            component={RecipesSelectionScreen}
          />
          <Stack.Screen
            name="RecipeDescriptionScreen"
            component={RecipeDescriptionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
