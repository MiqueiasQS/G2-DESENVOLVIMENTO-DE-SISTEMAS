import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [questionCorrects, setQuestionCorrects] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [quizStart, setQuizStart] = useState(false);

  const options = [
    { label: "Easy", value: "easy", icon: "robot-happy", color: "#0f0" },
    { label: "Medium", value: "medium", icon: "robot", color: "#FFEB3B" },
    { label: "Hard", value: "hard", icon: "robot-angry", color: "#F00" },
  ];

  const optionsQuantity = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];

  useEffect(() => {
    if (quizStart) {
      fetchQuestions();
    }
  }, [quizStart]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      shuffleOptions();
    }
  }, [currentQuestionIndex, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
      const data = await response.json();
      setQuestions(data.results);
    } catch (error) {
      console.error('Erro ao obter as perguntas:', error);
    }
  };

  const shuffleOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.incorrect_answers) {
      const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      options.sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    }
  };

  const selectAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = shuffledOptions[selectedAnswer] === currentQuestion.correct_answer;

      if (isCorrect) {
        setQuestionCorrects(questionCorrects + 1);
      }

      alert(`Pergunta ${currentQuestionIndex + 1}: ${isCorrect ? 'Correta' : 'Incorreta'}`);

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true); // Indicar que o quiz foi concluído
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setQuestionCorrects(0);
    setQuizStart(true)
  };

  if (!quizStart) {
    return (
      <View style={styles.container}>
        <Text>Select Difficulty:</Text>
        <View>
          {/* <Controller
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={onChange}
              >
                {options.map(option => (
                  <Picker.Item label={option.label} value={option.value} />
                ))}
              </Picker>
            )}
            name="difficulty"
          /> */}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={restartQuiz}>
          <Text>Iniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <Text>Desafio concluído! Você acertor {questionCorrects} questões.</Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text>Reiniciar Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text>Desafio concluído! Você acertor {questionCorrects} questões.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>

      {shuffledOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === index && { backgroundColor: 'green', borderColor: 'darkgreen' },
          ]}
          onPress={() => selectAnswer(index)}
        >
          <Text>{`${index + 1}. ${option}`}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={submitAnswer}>
        <Text>Submeter Resposta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  select: {
  }
});

export default QuizScreen;
