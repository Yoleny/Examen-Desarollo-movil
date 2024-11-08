import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBank } from './Context/BankContext';



interface Transaction {
  id: number;
  description: string;
}

const HistoryScreen = () => {
  const { transactions } = useBank();

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Transacciones</Text>
      {transactions.length === 0 ? (
        <Text style={styles.emptyState}>No hay transacciones realizadas</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransactionItem}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  transactionItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionText: {
    fontSize: 16,
  },
  emptyState: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
  }
});

export default HistoryScreen;