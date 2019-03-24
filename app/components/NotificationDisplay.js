import React from 'react';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { getAppNotification, popAppNotification } from '../store';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    position: 'absolute',
    top: Constants.statusBarHeight,
    right: 0,
    left: 0,
    padding: 8,
    elevation: 6,
  },
  topBar: {
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: -8,
  },
  closeIcon: {
    color: colors.white,
  },
  body: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  message: {
    color: colors.white,
  },
  actionButton: {
    backgroundColor: colors.white,
    elevation: 6,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 6,
    marginTop: 20,
  },
  actionButtonText: {
    color: colors.textDefault,
    fontSize: 13,
  },
});

function NotificationDisplay(props) {
  const { notification, close } = props;

  if (!notification) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.6}
          onPress={close}
        >
          <Ionicons name='md-close' color={styles.closeIcon.color} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.message}>
          {notification.message}
        </Text>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.6}
          onPress={notification.actionHandler}
        >
          <Text style={styles.actionButtonText}>{notification.actionLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function mapStateToProps(state) {
  return {
    notification: getAppNotification(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => {
      return dispatch(popAppNotification());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDisplay);
