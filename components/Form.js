import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Form = ({ setCurr, setCrypt }) => {
  const [currency, setCurrency] = useState('USD');
  const [cryptoCurrency, setCryptoCurrency] = useState('BTC');
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const getCryptos = async () => {
      const URL =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const q = await axios.get(URL);
      setCryptos(q.data.Data);
    };
    getCryptos();
  }, []);

  const getCurrency = v => {
    setCurrency(v);
    setCurr(v);
  };

  const getCryptoCurrency = v => {
    setCryptoCurrency(v);
    setCrypt(v);
  };

  return (
    <View>
      <Text style={styles.label}>Currency</Text>
      <Picker
        selectedValue={currency}
        onValueChange={value => getCurrency(value)}>
        <Picker.Item label="USA Dollar" value="USD" />
        <Picker.Item label="British Pound" value="GBT" />
        <Picker.Item label="Argentine Peso" value="ARS" />
      </Picker>
      <Text style={styles.label}>Crypto Currency</Text>
      <Picker
        selectedValue={cryptoCurrency}
        onValueChange={value => getCryptoCurrency(value)}>
        {cryptos.map(crypto => (
          <Picker.Item
            key={crypto.CoinInfo.Id}
            label={crypto.CoinInfo.FullName}
            value={crypto.CoinInfo.Name}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 16,
  },
});

export default Form;
