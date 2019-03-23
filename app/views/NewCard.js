import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { validateCardQuestion, validateCardAnswer } from '../lib/validation';
import TextInput from '../components/TextInput';
import ActionButton from '../components/ActionButton';
import InputErrorMessage from '../components/InputErrorMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 40,
  },
  inputLabel: {
    color: colors.textDefault,
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
});

class NewCard extends React.Component {
  state = {
    question: '',
    answer: '',
    questionError: '',
    answerError: '',
  }

  onQuestionChange = (question) => {
    this.setState({ question: question, questionError: '' });
  }

  onAnswerChange = (answer) => {
    this.setState({ answer: answer, answerError: '' });
  }

  onSubmit = () => {
    const { question, answer } = this.state;

    const errors = {};
    if (!validateCardQuestion(question)) {
      errors.questionError = 'Invalid question';
    }
    if (!validateCardAnswer(answer)) {
      errors.answerError = 'Invalid answer';
    }
    if (Object.keys(errors).length > 0) {
      return this.setState(errors);
    }
  }

  render = () => {
    const { question, answer, questionError, answerError } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            First, the question:
          </Text>
          <TextInput
            value={question}
            onChangeText={this.onQuestionChange}
            placeholder="e.g. What's the answer to the universe?"
          />
          {!!questionError && (
            <InputErrorMessage>{questionError}</InputErrorMessage>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            The the answer:
          </Text>
          <TextInput
            placeholder='e.g. 42'
            value={answer}
            onChangeText={this.onAnswerChange}
          />
          {!!answerError && (
            <InputErrorMessage>{answerError}</InputErrorMessage>
          )}
        </View>

        <ActionButton style={styles.submitButton} onPress={this.onSubmit}>
          Create card
        </ActionButton>
      </View>
    );
  }
}

export default NewCard;
