import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  InputContainer,
  Input,
} from "./styles";

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState('');
  const [selectedDificulty, setSelectedDificulty] = useState('');
  const [questions, setQuestions] = useState(["10", "20", "30"]);

  const navigation = useNavigation();

  const handleNumberQuestionsChange = (event) => {
    setSelectedNumberQuestions(event.target.value);
  };

  const handleDificultyChange = (event) => {
    setSelectedDificulty(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const getQuestions = () => {
    return questions;
  };

  return (
    <Container>
      <Text style={styles.Nome}>Show do Milhão</Text>
      
      <View style={styles.Form}>

        <Text style={styles.Text}>Name:</Text>
        <InputContainer>
            <Input
              value={name}
              onChange={handleNameChange}
            />
        </InputContainer>

        <Text style={styles.Text}>E-mail:</Text> 
        <InputContainer> 
            <Input
              value={email}
              onChange={handleEmailChange}
            />
        </InputContainer>

        <Text style={styles.Text}>Número de Questões:</Text> 
        <InputContainer>
          <Picker 
            onValueChange={handleNumberQuestionsChange} 
            selectedValue={selectedNumberQuestions}
            items={getQuestions()}
          />
        </InputContainer>

        <Text style={styles.Text}>Dificultade:</Text> 
        <InputContainer>
          <Picker 
            onValueChange={handleDificultyChange} 
            selectedValue={selectedDificulty}
            items={["easy", "medium", "hard"]}
          />
        </InputContainer>

        <Button title="Start" onPress={() => navigation.navigate('Questions')}/>

      </View>

    </Container>
  );
}

const styles = StyleSheet.create({

  Nome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 120,
    color: '#fff',
  },
  Form: {
    alignContent: 'center',
    flex: 1,
  },
  Text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});


export default Home;