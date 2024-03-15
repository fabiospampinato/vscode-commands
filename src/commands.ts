
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import {alert, getProjectRootPath, openInEditor, prompt} from 'vscode-extras';
import {DEFAULT_OPTIONS} from './constants';
import Providers from './providers';

/* MAIN */

const initConfig = async (): Promise<void> => {

  const rootPath = getProjectRootPath ();

  if ( !rootPath ) return alert.error ( 'You have to open a project before being able to init its configuration' );

  const configContent = JSON.stringify ( DEFAULT_OPTIONS, undefined, 2 ); //TODO: Read the default indentation from somewhere
  const configFolderPath = path.join ( rootPath, '.vscode' );
  const configFilePath = path.join ( configFolderPath, 'commands.json' );

  if ( fs.existsSync ( configFilePath ) ) return;

  await fs.promises.mkdir ( configFolderPath, { recursive: true } );
  await fs.promises.writeFile ( configFilePath, configContent );

  await editConfig ();

};

const editConfig = async (): Promise<void> => {

  const rootPath = getProjectRootPath ();

  if ( !rootPath ) return alert.error ( 'You have to open a project before being able to edit its configuration' );

  const configFolderPath = path.join ( rootPath, '.vscode' );
  const configFilePath = path.join ( configFolderPath, 'commands.json' );

  const isFile = fs.existsSync ( configFilePath );

  if ( !isFile && !await prompt.boolean ( 'Configuration file not found, do you want to create it?' ) ) return;

  if ( !isFile ) await initConfig ();

  openInEditor ( configFilePath );

};

const refresh = async (): Promise<void> => {

  return Providers.onChangeAll ();

};

/* EXPORT */

export {initConfig, editConfig, refresh};
