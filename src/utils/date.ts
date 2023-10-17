import { days, months } from '.';

export const getCreatedAtArticle = (createdAt: Date): string =>
  new Date().getTime() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24
    ? 'Today'
    : new Date().getTime() - new Date(createdAt).getTime() > 1000 * 60 * 60 * 24 &&
      new Date().getTime() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 2
    ? 'Yesterday'
    : new Date().getTime() - new Date(createdAt).getTime() > 1000 * 60 * 60 * 24 * 2 &&
      new Date().getTime() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7
    ? days[new Date(createdAt).getDay()].toString()
    : `${new Date(createdAt).getDay()} ${months[new Date(createdAt).getMonth()]}`.toString();
