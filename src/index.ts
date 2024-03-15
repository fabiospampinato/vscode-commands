
/* IMPORT */

import vscode from 'vscode';
import * as Commands from './commands';
import Providers from './providers';

/* MAIN */

const activate = (): void => {

  vscode.commands.registerCommand ( 'commands.editConfig', Commands.editConfig );
  vscode.commands.registerCommand ( 'commands.refresh', Commands.refresh );

  Providers.onChangeAll ();

  vscode.workspace.onDidChangeConfiguration ( Providers.onChangeAll );
  vscode.workspace.onDidChangeWorkspaceFolders ( Providers.onChangeEditor );
  vscode.window.onDidChangeActiveTextEditor ( Providers.onChangeEditor );

};

/* EXPORT */

export {activate};
