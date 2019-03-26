import { Permissions, Notifications } from 'expo';

export async function setupLocalNotification() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }

  Notifications.createChannelAndroidAsync('UdaciCardsReminder', {
    name: 'UdaciCards Reminder',
    sound: true,
    vibrate: true,
    priority: 'high',
  });
}

export async function rescheduleLocalNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const time = new Date();
  time.setDate(time.getDate() + 1);
  time.setHours(20);
  time.setMinutes(0);
  time.setSeconds(0);

  return Notifications.scheduleLocalNotificationAsync(
    createLocalNotification(),
    { time: time, repeat: 'day' }
  );
}

function createLocalNotification() {
  return {
    title: "Don't forget to study today",
    body: 'How would you like a quiz today?',
    android: {
      channelId: 'UdaciCardsReminder',
      sticky: false,
    },
  };
}
