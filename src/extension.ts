
/* IMPORT */

import * as vscode from 'vscode';
import Providers from './providers';
import Utils from './utils';

/* ACTIVATE */

function activate ( context: vscode.ExtensionContext ) {

  Providers.refresh ();

  context.subscriptions.push (
    vscode.workspace.onDidChangeConfiguration ( Providers.refresh ),
    vscode.workspace.onDidChangeWorkspaceFolders ( Providers.refreshTextEditor ),
    vscode.window.onDidChangeActiveTextEditor ( Providers.refreshTextEditor )
  );

  return Utils.initCommands ( context );

}

/* EXPORT */

export {activate};
