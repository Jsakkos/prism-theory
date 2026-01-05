export function getPhotoUrl(filename: string): string {
  return `/images/photos/${filename}`;
}

export function getLogoUrl(filename: string | undefined): string | null {
  return filename ? `/images/${filename}` : null;
}
