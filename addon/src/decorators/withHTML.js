import { addons, makeDecorator } from '@storybook/addons';
import { EVENT_CODE_RECEIVED } from '../shared';

export const withHTML = makeDecorator({
  name: 'withHTML',
  parameterName: 'html',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { parameters = {} }) => {
    setTimeout(() => {
      const channel = addons.getChannel();
      const rootSelector = parameters.root || '#root';
      const roots = document.querySelectorAll(rootSelector);

      roots.forEach((el) => {
        html += el.innerHTML;
      })

      if (parameters.removeEmptyComments) {
        html = html.replace(/<!--\s*-->/g, '');
      }

      channel.emit(EVENT_CODE_RECEIVED, { html: html ?? `${rootSelector} not found.`, options: parameters });
    }, 0);
    return storyFn(context);
  },
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
