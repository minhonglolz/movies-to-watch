export function truncateToDecimal (number: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces)
  const truncatedNumber = Math.floor(number * factor) / factor
  return truncatedNumber
}
