import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => <Text style={styles.header}>Crypto</Text>;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Lato-Black',
    backgroundColor: '#5e49e2',
    padding: 16,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
  },
});

export default Header;
