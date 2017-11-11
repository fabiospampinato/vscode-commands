
/* IMPORT */

import * as vscode from 'vscode';
import Statusbar from './statusbar';
import Config from '../config';

/* PROVIDERS */

const Providers = {

  providers: [Statusbar],

  async call ( method: string ) {

    const config = await Config.get (),
          {activeTextEditor} = vscode.window,
          filePath = activeTextEditor && activeTextEditor.document.uri.fsPath,
          language = activeTextEditor && activeTextEditor.document.languageId;

    Providers.providers.forEach ( provider => provider[method]( config, filePath, language ) );

  },

  async refresh () {

    return Providers.call ( 'refresh' );

  },

  async refreshTextEditor () {

    return Providers.call ( 'refreshTextEditor' );

  }

};

/* EXPORT */

export default Providers;
