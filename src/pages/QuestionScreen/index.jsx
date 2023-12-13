import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

import { useNavigation, useRoute } from "@react-navigation/native";

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [questionCorrects, setQuestionCorrects] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);

  function moveToResults() {
    navigation.navigate('Results', { questionCorrects, currentQuestionIndex });
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      shuffleOptions();
    }
  }, [currentQuestionIndex, questions]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=' + route.params.selectedNumberQuestions.substring(0, 2) + '&category=18&difficulty=' + route.params.selectedDificulty.toLowerCase() + '&type=multiple');
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
      if (selectedAnswer === null) {
        alert("Selecione uma resposta");
        return;
      }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      moveToResults()
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setQuestionCorrects(0);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando perguntas...</Text>
      </View>
    );
  }

  if (quizCompleted) {
    return (
      <View style={styles.container}>
        <Text>Desafio concluído! Você acertor {questionCorrects} questões.</Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text>Reiniciar Quiz</Text>
          <Button title="Resultado" onPress={() => navigation.navigate('Results')} />
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
      <View style={styles.questionContainer}>
        <Text style={styles.categoricalText}>Question {questions[currentQuestionIndex].category}</Text>
        <Text style={styles.indexQuestion}>Question {currentQuestionIndex + 1} of {route.params.selectedNumberQuestions.substring(0, 2)}</Text>
        <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
      </View>

      <View style={styles.answerContainer}>
        {shuffledOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && { backgroundColor: '#00AAFF', borderColor: '#008CE7' },
            ]}
            onPress={() => selectAnswer(index)}
          >
            <Text>{`${index + 1}. ${option}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={submitAnswer}>
          <Text style={styles.buttonText}>SUBMETER RESPOSTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45237F',
  },
  categoricalText: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  indexQuestion: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 100,
    color: '#fff',
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'justify',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#1CB201',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionContainer: {
    marginTop: 100,
    width: '90%',
    height: '40%'
  },
  answerContainer: {
    width: '90%',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 100,
  },
  loadingText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default QuizScreen;
