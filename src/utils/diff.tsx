export function getDiff(
  arr1: string[],
  arr2: string[]
): { added: string[]; removed: string[] } {
  const added = arr2.filter(x => !arr1.includes(x));
  const removed = arr1.filter(x => !arr2.includes(x));

  return { added: added, removed: removed };
}
