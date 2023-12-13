import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/native";

import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { db, app } from "../../firebase/firebase";

import {
  Container,
  InputContainer,
  Input,
} from "./styles";
import { ref } from 'firebase/database';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState('Selecione...');
  const [selectedDificulty, setSelectedDificulty] = useState('Selecione...');

  const navigation = useNavigation();
  
  const NumberQuestion = () => {
    return (
      <View>
        <ModalDropdown
          options={['10 questions', '20 questions', '30 questions']}
          defaultValue={selectedNumberQuestions}
          onSelect={(index, value) => {
            handleNumberQuestionsChange(value);
          }}
          defaultIndex={null}
          dropdownStyle={{ width: 200, backgroundColor: '#7145BC', borderWidth: 1 }}
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
          defaultValue={selectedDificulty}
          onSelect={(index, value) => {
            handleDificultyChange(value);
          }}
          defaultIndex={null}
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

  const checkUserExists = async (name, email) => {
    // Verifique se o usuário existe
    try {
      const snapshot = await db.ref('user').orderByChild('email').equalTo(email).once('value');
      const user = snapshot.val();
  
      if (user) {
        // Verifique se o nome do usuário também corresponde
        if (user.name === name || user.email === email) {

          if(user.name === name){
            setNameError("O nome já está cadastrado com esse e-mail.");
            return true
          }
          if(user.email === email){
            setNameError("O e-mail já está cadastrado com esse nome.");
            return true
          }
          setNameError("O nome e email ja estão cadastrados");
          return true; // Usuário existe
        } else {
          console.log('Opa, deu certo')
          return false;
        }
      } else {
        setNameError("Usuário não existe");
        return true; // Email não existe
      }
    } catch (error) {
      setNameError("Não sei o que ta acontecendo");
      console.error(error);
    }
  }

  const createUser = async (name, email) => {
    try {
      // Crie um novo usuário
      const user = await db.ref('user').push();
  
      // Defina os dados do usuário
      user.set({
        email,
        name,
      });
  
      // Retorne o usuário criado
      return user.val();
    } catch (error) {
      console.error(error);
      return null; // Erro ao criar usuário
    }
  };
  

  const validarDados = async () => {

    if (name === '' || email === '') {

      alert('Por favor, preencha todos os campos.');
    } else {
      checkUserExists(email, name)
    }
  };

  const handleButtonPress = () => {
    navigation.navigate('Questions', { selectedNumberQuestions, selectedDificulty });
  };

  const handleNumberQuestionsChange = (event) => {
    setSelectedNumberQuestions(event);
  };

  const handleDificultyChange = (event) => {
    setSelectedDificulty(event);
  };

  const handleNameChange = (event) => {
    setName(event);
  };

  const handleEmailChange = (event) => {
    setEmail(event);
  };

  return (
    <Container>
      <Text style={styles.Nome}>Show do Milhão</Text>

      <View style={styles.Form}>

        <Text style={styles.Text}>Name:</Text>
        <InputContainer>
          <Input
            value={name}
            onChangeText={handleNameChange}
          />
        </InputContainer>

        <Text style={styles.Text}>E-mail:</Text>
        <InputContainer>
          <Input
            value={email}
            onChangeText={handleEmailChange}
          />
        </InputContainer>

        <Text style={styles.Text}>Número de Questões:</Text>
        <InputContainer>
          <NumberQuestion />
        </InputContainer>

        <Text style={styles.Text}>Dificultade:</Text>
        <InputContainer>
          <SelectDificulty />
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