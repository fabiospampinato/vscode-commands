
/* IMPORT */

import Item from './item';
import Utils from '../../utils';

/* STATUSBAR */

const Statusbar = {

  items: [],

  refresh ( config, filePath, language ) {

    Statusbar.items.forEach ( item => item.dispose () );

    Statusbar.items = [];

    config.commands.forEach ( async command => {

      const item = new Item ( command );

      Statusbar.items.push ( item );

      const isHidden = await Utils.command.isFiltered ( command, filePath, language );

      if ( !isHidden ) item.show ();

    });

  },

  refreshTextEditor ( config, filePath, language ) {

    Statusbar.items.forEach ( async item => {

      const command = item.config,
            isHidden = await Utils.command.isFiltered ( command, filePath, language );

      item[isHidden ? 'hide' : 'show']();

    });

  }

};

/* EXPORT */

export default Statusbar;
