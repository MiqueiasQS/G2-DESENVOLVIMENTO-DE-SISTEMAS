import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput placeholder="nome" type="text" id="name" value={name} onChange={handleNameChange} />

      <Text>Email:</Text>
      <TextInput placeholder="e-mail" type="email" id="email" value={email} onChange={handleEmailChange} />
    </View>
  );
}

export default Home;