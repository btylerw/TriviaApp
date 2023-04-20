import React, {useState, useEffect, } from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import Navigator from './src/Navigator';

export default function App() {
  
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
