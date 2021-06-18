import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Form from './components/Form';
import Header from './components/Header';
import axios from 'axios';

const App = () => {
  const [currency, setCurr] = useState('USD');
  const [cryptoCurrency, setCrypt] = useState('BTC');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSubmit(cryptoCurrency, currency);
  }, [cryptoCurrency, currency]);

  const handleSubmit = async (crypto, curr) => {
    setLoading(true);
    try {
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${curr}`;
      const q = await axios.get(URL);
      setData(q.data.DISPLAY[crypto][curr]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <StatusBar backgroundColor="#5e49e2" />
      <Header />
      <View style={styles.container}>
        <View style={styles.conversionContainer}>
          <View style={styles.pricesContainer}>
            {data !== null ? (
              <>
                {loading ? (
                  <View style={styles.exchange}>
                    <ActivityIndicator size="large" color="#eee" />
                  </View>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => handleSubmit(cryptoCurrency, currency)}>
                    <View style={styles.exchange}>
                      <Text style={styles.exchangeText}>
                        {cryptoCurrency} to {currency}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}

                <View style={styles.priceContainer}>
                  <View style={styles.priceChangeContainer}>
                    <Text
                      style={
                        data.CHANGEPCT24HOUR >= 0
                          ? styles.textSuccess
                          : styles.textDanger
                      }>
                      {data.CHANGEPCT24HOUR >= 0 ? (
                        <Svg
                          viewBox="0 0 24 24"
                          width={12}
                          height={12}
                          stroke="#64bc26"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <Path d="M12 19V5M5 12l7-7 7 7" />
                        </Svg>
                      ) : (
                        <Svg
                          viewBox="0 0 24 24"
                          width={12}
                          height={12}
                          stroke="#ea1601"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <Path d="M12 5v14M19 12l-7 7-7-7" />
                        </Svg>
                      )}
                      {data.CHANGEPCT24HOUR}
                    </Text>
                    <Text style={styles.price}>{data.PRICE}</Text>
                  </View>
                  <View style={styles.extraInfo}>
                    <Text style={{ color: '#eee' }}>
                      <Svg
                        viewBox="0 0 24 24"
                        width={12}
                        height={12}
                        stroke="#64bc26"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <Path d="M12 19V5M5 12l7-7 7 7" />
                      </Svg>
                      {data.HIGHDAY}
                    </Text>
                    <Text style={{ color: '#eee' }}>
                      <Svg
                        viewBox="0 0 24 24"
                        width={12}
                        height={12}
                        stroke="#ea1601"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <Path d="M12 5v14M19 12l-7 7-7-7" />
                      </Svg>
                      {data.LOWDAY}
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#eee',
                      marginBottom: 10,
                    }}>
                    {data.LASTUPDATE}
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                <ActivityIndicator size="large" color="#5e49e2" />
              </View>
            )}
          </View>
        </View>
        <Form setCurr={setCurr} setCrypt={setCrypt} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },

  conversionContainer: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },

  pricesContainer: {
    borderRadius: 10,
    backgroundColor: '#eeee',
    width: '100%',
    height: '100%',
    display: 'flex',
  },

  exchange: {
    borderRadius: 10,
    height: 48,
    margin: 8,
    marginBottom: 0,
    backgroundColor: '#5e49e2bb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  exchangeText: {
    fontSize: 24,
    color: '#fff',
  },

  priceContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: '#5e49e2',
    borderRadius: 10,
  },

  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  price: {
    fontWeight: 'bold',
    fontSize: 32,
    marginLeft: 16,
    color: '#eee',
  },

  textSuccess: {
    color: '#64bc26',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textDanger: {
    color: '#ea1601',
    fontSize: 16,
    fontWeight: 'bold',
  },

  extraInfo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default App;
