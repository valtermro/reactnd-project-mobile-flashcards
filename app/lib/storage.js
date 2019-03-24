import { AsyncStorage } from 'react-native';

const key = '@udacity-reactnd/projects/UdaciCards@';

export async function readAppState() {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data) || {};
}

export function mergeAppState(state) {
  return AsyncStorage.mergeItem(key, JSON.stringify(state));
}
