import React from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { getDeckFormData, commitDeckForm, setDeckFormTitle, setDeckFormTitleError } from '../decks/store';
import TextInput from '../components/TextInput';
import ActionButton from '../components/ActionButton';
import InputErrorMessage from '../components/InputErrorMessage';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    color: colors.textDefault,
    fontSize: 16,
    marginTop: 100,
  },
  formGroup: {
    marginTop: 40,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 40,
  },
});

function NewDeck(props) {
  const { formData, onSubmit, onTitleChange } = props;
  const { title, titleError } = formData;

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={styles.header}>
        What are you going to learn now?
      </Text>

      <View style={styles.formGroup}>
        <TextInput
          value={title}
          onChangeText={onTitleChange}
          placeholder='e.g. Javascript'
        />
        {!!titleError && (
          <InputErrorMessage>{titleError}</InputErrorMessage>
        )}
      </View>

      <ActionButton style={styles.submitButton} onPress={onSubmit}>
        Create deck
      </ActionButton>
    </KeyboardAvoidingView>
  );
}


function mapStateToProps(state) {
  return {
    formData: getDeckFormData(state),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: () => {
      const deck = dispatch(commitDeckForm());
      if (deck) {
        props.navigation.navigate('Deck', { deck: deck.id });
      }
    },
    onTitleChange: (title) => {
      dispatch(setDeckFormTitleError(''));
      dispatch(setDeckFormTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
