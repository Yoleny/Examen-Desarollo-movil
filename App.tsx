// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BankProvider } from './Context/BankContext';
import HomeScreen from './HomeScreen';
import TransferScreen from './TransferScreen';
import HistoryScreen from './HistoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <BankProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007bff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Inicio" 
            component={HomeScreen} 
            options={{ title: 'Mi Banco' }}
          />
          <Stack.Screen 
            name="Transferencias" 
            component={TransferScreen} 
            options={{ title: 'Realizar Transferencia' }}
          />
          <Stack.Screen 
            name="Histórico" 
            component={HistoryScreen} 
            options={{ title: 'Historial de Transacciones' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BankProvider>
  );
};

export default App;