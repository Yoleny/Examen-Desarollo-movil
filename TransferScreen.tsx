
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { useBank } from './Context/BankContext';

const TransferScreen: React.FC = () => {
  const { balance, transfer } = useBank();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleTransfer = () => {
    
    const trimmedAccountNumber = accountNumber.trim();
    if (!trimmedAccountNumber) {
      Alert.alert('Error', 'Por favor, ingrese un número de cuenta válido');
      return;
    }

    
    const amountValue = parseFloat(amount);
    
    
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Ingrese un monto válido mayor a cero');
      return;
    }

    
    if (amountValue > balance) {
      Alert.alert('Error', 'Saldo insuficiente para realizar la transferencia');
      return;
    }

    
    try {
      const transactionDescription = `Transferencia de L.${amountValue.toFixed(2)} a ${trimmedAccountNumber}`;
      
      if (transfer(amountValue, transactionDescription)) {
        Alert.alert(
          'Transferencia Exitosa', 
          `Has transferido L.${amountValue.toFixed(2)} a ${trimmedAccountNumber}`,
          [{ 
            text: 'OK', 
            onPress: () => {
              setAccountNumber('');
              setAmount('');
            }
          }]
        );
      } else {
        Alert.alert('Error', 'No se pudo completar la transferencia');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al procesar la transferencia');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Actual: L.{balance.toFixed(2)}</Text>
      
      <Text style={styles.label}>Número de Cuenta:</Text>
      <TextInput
        value={accountNumber}
        onChangeText={setAccountNumber}
        placeholder="Ingrese el número de cuenta"
        keyboardType="numeric"
        style={styles.input}
        maxLength={20}
      />
      
      <Text style={styles.label}>Monto a Transferir:</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => {
          
          const formattedText = text.replace(/[^0-9.]/g, '');
          
          
          const decimalParts = formattedText.split('.');
          if (decimalParts.length > 2) {
            return;
          }
          
    
          if (decimalParts[1] && decimalParts[1].length > 2) {
            return;
          }
          
          setAmount(formattedText);
        }}
        placeholder="Ingrese el monto"
        keyboardType="decimal-pad"
        style={styles.input}
      />
      
      <Button 
        title="Transferir Saldo" 
        onPress={handleTransfer} 
        disabled={!accountNumber || !amount} 
      />
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  label: TextStyle;
  input: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  }
});

export default TransferScreen;