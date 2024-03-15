
/* IMPORT */

import type {Options} from './types';

/* MAIN */

const DEFAULT_OPTIONS: Options = {
  commands: [
    {
      command: 'commands.refresh',
      text: '$(sync)',
      tooltip: 'Refresh commands',
      color: '#FFCC00'
    }
  ]
};

/* EXPORT */

export {DEFAULT_OPTIONS};
