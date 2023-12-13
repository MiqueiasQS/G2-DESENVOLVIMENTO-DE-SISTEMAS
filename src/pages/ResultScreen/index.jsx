import React from 'react';
import { TextInput, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from "@react-navigation/native";

function Results() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>

      <Text style={styles.Title}>Results</Text>
      <Text style={styles.Scored}>Your Scored {route.params.questionCorrects}/{route.params.currentQuestionIndex + 1}</Text>
      <Text style={styles.Rank}>Ranking</Text>

      <TouchableOpacity style={styles.buttonPlayAgain} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>PLAY AGAIN</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45237F',
  },

  Title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    top: 80,
    position: "absolute",
  },

  Scored: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    top: 200,
    position: "absolute",
  },
  Rank: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    top: 250,
    position: "absolute",
  },
  buttonPlayAgain: {
    backgroundColor: '#1CB201',
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Results;