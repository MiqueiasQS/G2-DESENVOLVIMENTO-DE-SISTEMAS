import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  InputContainer,
  Input,
} from "./styles";

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState('');
  const [selectedDificulty, setSelectedDificulty] = useState('');

  const navigation = useNavigation();

  const NumberQuestion = () => {
    return (
      <View>
        <ModalDropdown
          options={['10 questions', '20 questions', '30 questions']}
          defaultValue="Selecione uma opção"
          value={selectedNumberQuestions}
          onChange={value => handleNumberQuestionsChange(value)}
          dropdownStyle={{ width: 200, height: 200, backgroundColor: '#7145BC', borderWidth: 1 }}
          dropdownTextStyle={{ color: '#fff', fontSize: 18, backgroundColor: '#7145BC', width: '100%', padding: 10, borderRadius: 8, marginTop: 10 }}
          dropdownTextHighlightStyle={{ color: '#41FF2A' }}
          dropdownButtonStyle={{ width: 200, height: 40, backgroundColor: 'gray', borderRadius: 5 }}
          dropdownArrowStyle={{ color: '#fff', fontSize: 14 }}
          textStyle={{ color: '#fff', fontSize: 18, backgroundColor: '#7145BC', width: '100%', padding: 10, borderRadius: 8, marginTop: 10 }}
        />
      </View>
    );
  };

  const SelectDificulty = () => {
    return (
      <View>
        <ModalDropdown
          options={['Easy', 'Medium', 'Hard']}
          defaultValue="Selecione uma opção"
          value={selectedDificulty}
          onChange={(value) => handleDificultyChange(value)}
          dropdownStyle={{ width: 200, height: 200, backgroundColor: '#7145BC', borderWidth: 1 }}
          dropdownTextStyle={{ color: 'white', fontSize: 18, backgroundColor: '#7145BC', width: '100%', padding: 10, borderRadius: 8, marginTop: 10 }}
          dropdownTextHighlightStyle={{ color: '#41FF2A' }}
          dropdownButtonStyle={{ width: 200, height: 40, backgroundColor: 'gray', borderRadius: 5 }}
          dropdownArrowStyle={{ color: 'white', fontSize: 14 }}
          textStyle={{ color: '#fff', fontSize: 18, backgroundColor: '#7145BC', width: '100%', padding: 10, borderRadius: 8, marginTop: 10 }}
        />
      </View>
    );
  };

  const validarDados = () => {
    if (name === '' || email === '') {
      alert('Por favor, preencha todos os campos.');
    } else {
      // Exiba uma mensagem de erro ou faça alguma ação caso os dados não estejam preenchidos
      handleButtonPress
    }
  };

  const handleButtonPress = () => {
    navigation.navigate('Questions');
  };

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
          <NumberQuestion/>
        </InputContainer>

        <Text style={styles.Text}>Dificultade:</Text> 
        <InputContainer>
          <SelectDificulty/>
        </InputContainer>

        <TouchableOpacity style={styles.startButton} onPress={validarDados}>
          <Text style={styles.Text}>START</Text>
        </TouchableOpacity>

      </View>

    </Container>
  );
}

const styles = StyleSheet.create({

  Nome: {
    fontSize: 34,
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
  },
  startButton: {
    backgroundColor: '#1CB201',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
});


export default Home;