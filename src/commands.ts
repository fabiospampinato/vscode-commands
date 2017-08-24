
/* IMPORT */

import * as vscode from 'vscode';
import Config from './config';
import Providers from './providers';
import Utils from './utils';

/* COMMANDS */

async function initConfig () {

  const config = await Config.get ();
  const defaultConfig = {
    commands: [{
      command: 'commands.refresh',
      text: '$(sync)',
      tooltip: 'Refresh commands',
      color: '#FFCC00'
    }]
  };
  const content = JSON.stringify ( defaultConfig, undefined, 2 );

  return Utils.file.make ( config.configPath, content );

}

async function editConfig () {

  const {rootPath} = vscode.workspace;

  if ( !rootPath ) return vscode.window.showErrorMessage ( 'You have to open a project before being able to edit its configuration' );

  const config = await Config.get (),
        hasFile = !!( await Utils.file.read ( config.configPath ) );

  if ( !hasFile ) await initConfig ();

  return Utils.file.open ( config.configPath );

}

async function refresh () {

  return Providers.refresh ();

}

/* EXPORT */

export {initConfig, editConfig, refresh};
