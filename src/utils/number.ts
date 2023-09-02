export function getDecimalPlaces (number: number) {
  const stringNumber = String(number)
  return stringNumber.substring(stringNumber.indexOf('.') + 1).length
}
