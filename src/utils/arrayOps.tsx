export function getDuplicates<T>(input: T[]): Map<T, number[]> {
  return input.reduce((output, element, idx) => {
    const recordedDuplicates = output.get(element);
    if (recordedDuplicates) {
      output.set(element, [...recordedDuplicates, idx]);
    } else if (input.lastIndexOf(element) !== idx) {
      output.set(element, [idx]);
    }

    return output;
  }, new Map<T, number[]>());
}
