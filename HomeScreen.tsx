import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useBank } from './Context/BankContext';

const HomeScreen = ({ navigation }) => {
  const { balance, transactions, deposit } = useBank();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola, Usuario!</Text>
      <Button title="Depositar L.500" onPress={() => deposit(500)} />
      <Text style={styles.subtitle}>Últimas Transacciones:</Text>
      <FlatList
        data={transactions.slice(-5)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.description}</Text>}
      />
      <Button title="Ir a Transferencias" onPress={() => navigation.navigate('Transferencias')} />
      <Button title="Ver Historial" onPress={() => navigation.navigate('Histórico')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 20,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default HomeScreen;