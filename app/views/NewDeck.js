import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';
import ActionButton from '../components/ActionButton';
import TextInput from '../components/TextInput';
import InputErrorMessage from '../components/InputErrorMessage';
import { validateDeckTitle } from '../lib/validation';

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

class NewDeck extends React.Component {
  state = {
    title: '',
    titleError: '',
  }

  onTitleChange = (title) => {
    this.setState({ title: title, titleError: '' });
  }

  onSubmit = () => {
    const { title } = this.state;

    if (!validateDeckTitle(title)) {
      return this.setState({ titleError: 'Invalid title' });
    }
  }

  render = () => {
    const { title, titleError } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          What are you going to learn now?
        </Text>

        <View style={styles.formGroup}>
          <TextInput
            value={title}
            onChangeText={this.onTitleChange}
            placeholder='e.g. Javascript'
          />
          {!!titleError && (
            <InputErrorMessage>{titleError}</InputErrorMessage>
          )}
        </View>

        <ActionButton style={styles.submitButton} onPress={this.onSubmit}>
          Create deck
        </ActionButton>
      </View>
    );
  }
}

export default NewDeck;
