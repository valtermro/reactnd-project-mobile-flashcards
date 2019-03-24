import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
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

class NewDeck extends React.Component {
  onTitleChange = (title) => {
    this.props.onTitleChange(title);
  }

  render = () => {
    const { formData, onSubmit } = this.props;
    const { title, titleError } = formData;

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

        <ActionButton style={styles.submitButton} onPress={onSubmit}>
          Create deck
        </ActionButton>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    formData: getDeckFormData(state),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: () => {
      if (dispatch(commitDeckForm())) {
        props.navigation.navigate('DeckList');
      }
    },
    onTitleChange: (title) => {
      dispatch(setDeckFormTitleError(''));
      dispatch(setDeckFormTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
