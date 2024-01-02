import {TITLE_RE} from '~/lib/constants';

export function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}