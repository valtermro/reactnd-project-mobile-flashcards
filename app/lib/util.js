const MAX_HEADER_TITLE_LENGTH = 36;

export function trimHeaderTitle(title) {
  if (title.length <= MAX_HEADER_TITLE_LENGTH) {
    return title;
  }

  return title.slice(0, MAX_HEADER_TITLE_LENGTH).trim() + '...';
}
