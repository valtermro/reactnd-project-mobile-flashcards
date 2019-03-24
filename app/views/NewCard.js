import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../colors';
import {
  getCardFormData, commitCardForm,
  setCardFormQuestion, setCardFormQuestionError,
  setCardFormAnswer, setCardFormAnswerError,
} from '../cards/store';
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
  render = () => {
    const { formData, onQuestionChange, onAnswerChange, onSubmit } = this.props;
    const { question, answer, questionError, answerError } = formData;

    return (
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>
            First, the question:
          </Text>
          <TextInput
            value={question}
            onChangeText={onQuestionChange}
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
            onChangeText={onAnswerChange}
          />
          {!!answerError && (
            <InputErrorMessage>{answerError}</InputErrorMessage>
          )}
        </View>

        <ActionButton style={styles.submitButton} onPress={onSubmit}>
          Create card
        </ActionButton>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    formData: getCardFormData(state),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onQuestionChange: (question) => {
      dispatch(setCardFormQuestion(question));
      dispatch(setCardFormQuestionError(''));
    },
    onAnswerChange: (answer) => {
      dispatch(setCardFormAnswer(answer));
      dispatch(setCardFormAnswerError(''));
    },
    onSubmit: () => {
      if (dispatch(commitCardForm(props.navigation.getParam('deck')))) {
        props.navigation.goBack();
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
