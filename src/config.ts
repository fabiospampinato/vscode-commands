
/* IMPORT */

import * as _ from 'lodash';
import confMerge from 'conf-merge';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import Providers from './providers';
import Utils from './utils';

/* CONFIG */

const Config = {

  getDefaults () {

    const defaults: any = {},
          {rootPath} = vscode.workspace;

    if ( rootPath ) defaults.configPath = path.join ( rootPath, '.vscode', 'commands.json' );

    return defaults;

  },

  getExtension ( extension = 'commands' ) {

    const config = vscode.workspace.getConfiguration ().get ( extension );

    if ( !config['configPath'] ) delete config['configPath'];

    return config;

  },

  async getFile ( filepath ) {

    const file = await Utils.file.read ( filepath );

    if ( !file ) return;

    const config = _.attempt ( JSON.parse, file );

    if ( _.isError ( config ) ) return;

    return config;

  },

  async get () {

    const defaults = Config.getDefaults (),
          extension: any = Config.getExtension (),
          configPath: string = extension.configPath || defaults.configPath,
          config = configPath && await Config.getFile ( configPath );

    return confMerge ( {}, defaults, extension, config ) as any;

  },

  async write ( filepath, config ) {

    const newConfig = _.omit ( config, ['configPath'] );

    await Utils.file.write ( filepath, JSON.stringify ( newConfig, undefined, 2 ) );

    return Providers.refresh ();

  }

};

/* EXPORT */

export default Config;
