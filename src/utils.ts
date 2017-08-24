
/* IMPORT */

import * as _ from 'lodash';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as pify from 'pify';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-commands' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, () => handler () );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  file: {

    open ( filepath ) {

      return vscode.commands.executeCommand ( 'vscode.open', vscode.Uri.parse ( `file://${filepath}` ) );

    },

    async make ( filepath, content ) {

      await pify ( mkdirp )( path.dirname ( filepath ) );

      return Utils.file.write ( filepath, content );

    },

    async read ( filepath ) {

      try {
        return ( await pify ( fs.readFile )( filepath, { encoding: 'utf8' } ) ).toString ();
      } catch ( e ) {
        return;
      }

    },

    readSync ( filepath ) {

      try {
        return ( fs.readFileSync ( filepath, { encoding: 'utf8' } ) ).toString ();
      } catch ( e ) {
        return;
      }

    },

    async write ( filepath, content ) {

      return pify ( fs.writeFile )( filepath, content, {} );

    }

  },

  command: {

    proxiesHashes: [], // Array of hashes (`${command}${arguments}`) of proxy commands

    isFiltered ( command, filePath, language ) {

      return !!( command.filterFileRegex && ( !filePath || !filePath.match ( new RegExp ( command.filterFileRegex, 'i' ) ) ) ) ||
             !!( command.filterLanguageRegex && ( !language || !language.match ( new RegExp ( command.filterLanguageRegex, 'i' ) ) ) );

    },

    get ( command, args ) {

      if ( !args ) return command;

      const hash = `${command}${JSON.stringify ( args )}`,
            exists = !!Utils.command.proxiesHashes.find ( h => h === hash );

      if ( exists ) return hash;

      vscode.commands.registerCommand ( hash, () => {
        vscode.commands.executeCommand ( command, ...args );
      });

      Utils.command.proxiesHashes.push ( hash );

      return hash;

    }

  }

};

/* EXPORT */

export default Utils;
