
/* IMPORT */

import Item from './item';
import Utils from '../../utils';

/* STATUSBAR */

const Statusbar = {

  items: [],

  async refresh ( config, filePath, language ) {

    Statusbar.items.forEach ( item => item.dispose () );

    Statusbar.items = [];

    for (const command of config.commands) {

      const item = new Item ( command );

      Statusbar.items.push ( item );

      const isHidden = await ( Utils.command.isFiltered ( command, filePath, language ) );

      if ( !isHidden ) item.show ();

    };

  },

  async refreshTextEditor ( config, filePath, language ) {

    for (const item of Statusbar.items) {

      const command = item.config,
            isHidden = await ( Utils.command.isFiltered ( command, filePath, language ) );

      item[isHidden ? 'hide' : 'show']();

    };

  }

};

/* EXPORT */

export default Statusbar;
