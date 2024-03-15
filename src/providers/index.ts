
/* IMPORT */

import Statusbar from './statusbar';

/* MAIN */

const Providers = {

  /* PROVIDER API */

  onChangeAll: (): void => {

    Statusbar.onChangeAll ();

  },

  onChangeEditor: (): void => {

    Statusbar.onChangeEditor ();

  }

};

/* EXPORT */

export default Providers;
