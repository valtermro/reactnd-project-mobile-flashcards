// NOTE: Right now, the validation logic is the same for all user-inputed values
// and the functions here could be merged into a single one. I'm keeping multiple
// functions, though, so it's easier to add specific logic for each input value
// latter. Also, the naming helps a little with the code semantics...

export function validateCardQuestion(text) {
  return !!text;
}

export function validateCardAnswer(text) {
  return !!text;
}

export function validateDeckTitle(text) {
  return !!text;
}
