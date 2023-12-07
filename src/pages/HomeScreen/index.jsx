import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
  Container,
  Title,
  InputContainer,
  Input,
} from "./style";

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedNumberQuestions, setSelectedNumberQuestions] = useState('');
  const [selectedDificulty, setSelectedDificulty] = useState('');
  const [questions, setQuestions] = useState(["10", "20", "30"]);

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
      <Title>Show do Milhão</Title>
      <Text>Nome:</Text>
      <InputContainer>
          <Input
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
      </InputContainer>

      <Text>E-mail:</Text>  
      <InputContainer>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />
      </InputContainer>

      <Text>Número de Questões:</Text> 
      <InputContainer>
        <Picker 
          onValueChange={handleNumberQuestionsChange} 
          selectedValue={selectedNumberQuestions}
          items={getQuestions()}
        />

      </InputContainer>

      <Text>Dificultade:</Text> 

      <Button title="Start"/>

    </Container>
  );
}

export default Home;