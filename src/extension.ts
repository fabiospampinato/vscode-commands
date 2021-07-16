
/* IMPORT */

import * as vscode from 'vscode';
import beggar from 'vscode-beggar';
import Providers from './providers';
import Utils from './utils';

/* ACTIVATE */

function activate ( context: vscode.ExtensionContext ) {

  beggar ({
    id: 'vscode-commands',
    title: '𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 - 𝗙𝘂𝗻𝗱𝗿𝗮𝗶𝘀𝗶𝗻𝗴 𝗔𝗻𝗻𝗼𝘂𝗻𝗰𝗲𝗺𝗲𝗻𝘁: We are collecting some money to allow for further development, if you find this extension useful please please please consider donating to it and be part of something amazing!',
    url: 'https://buy.stripe.com/cN29Cn77XgBVcRaaEH',
    actions: {
      yes: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-commands%22%2C%22result%22%3A1%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      },
      no: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-commands%22%2C%22result%22%3A0%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      },
      cancel: {
        webhook: `https://telemetry.notable.app/track?events=%5B%7B%22event%22%3A%22vscode-beggar%22%2C%22extension%22%3A%22vscode-commands%22%2C%22result%22%3A2%2C%22timestamp%22%3A${Date.now ()}%7D%5D`
      }
    }
  });

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
