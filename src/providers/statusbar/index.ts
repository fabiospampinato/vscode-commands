
/* IMPORT */

import Item from './item';
import Utils from '../../utils';

/* STATUSBAR */

const Statusbar = {

  items: [],

  refresh ( config, filePath, language ) {

    Statusbar.items.forEach ( item => item.dispose () );

    Statusbar.items = [];

    config.commands.forEach ( command => {

      const item = new Item ( command );

      Statusbar.items.push ( item );

      const isHidden = ( Utils.command.isFiltered ( command, filePath, language ) );

      if ( !isHidden ) item.show ();

    });

  },

  refreshTextEditor ( config, filePath, language ) {

    Statusbar.items.forEach ( item => {

      const command = item.config,
            isHidden = ( Utils.command.isFiltered ( command, filePath, language ) );

      item[isHidden ? 'hide' : 'show']();

    });

  }

};

/* EXPORT */

export default Statusbar;
