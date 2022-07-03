export function getFilename(path?: string): string | undefined {
  return path?.split('\\')[path.split('\\').length - 1];
}

export function getFileExtension(path?: string): string | undefined {
  return getFilename(path)?.split('.')[1];
}
