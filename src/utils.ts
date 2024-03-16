
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import JSONC from 'tiny-jsonc';
import vscode from 'vscode';
import {getConfig, getProjectRootPaths} from 'vscode-extras';
import type {Command} from './types';

/* MAIN */

const attempt = <T> ( fn: () => T ): T | undefined => {

  try {

    return fn ();

  } catch {

    return;

  }

};

const getCommandIdentifier = (() => {

  const cached = new Set<string> ();

  return ( command: string, args?: unknown[] ): string => {

    if ( !args?.length ) return command;

    const id = `commands.${command}${JSON.stringify ( args )}`;

    if ( cached.has ( id ) ) return id;

    vscode.commands.registerCommand ( id, () => {
      vscode.commands.executeCommand ( command, ...args );
    });

    cached.add ( id );

    return id;

  };

})();

const getCommandVisibility = async ( command: Command, filePath?: string, language?: string ): Promise<boolean> => {

  const {filterFileRegex, filterLanguageRegex, filterWorkspaceFileRegex} = command;

  if ( filterFileRegex && !filePath?.match ( new RegExp ( filterFileRegex, 'i' ) ) ) return false;

  if ( filterLanguageRegex && !language?.match ( new RegExp ( filterLanguageRegex, 'i' ) ) ) return false;

  if ( filterWorkspaceFileRegex && !( await vscode.workspace.findFiles ( filterWorkspaceFileRegex, null, 1 ) ).length ) return false; //FIXME: This is actually broken, it's a glob not a regex

  return true;

};

const getCommands = (): Command[] => {

  const internal = getCommandsFromInternalConfig ();
  const external = getCommandsFromExternalConfigs ();
  const commands = [...internal, ...external];

  return commands;

};

const getCommandsFromUnknown = ( options: unknown ): Command[] => { // This normalizes a potential "commands" array contained in a potential "options" object

  //TODO: Make actual regexes

  const commands: Command[] = [];

  if ( isObject ( options ) && isArray ( options.commands ) ) {

    for ( const command of options.commands ) {

      if ( !isObject ( command ) ) continue;

      const cmd = isString ( command?.command ) ? command.command : undefined;
      const args = isArray ( command?.arguments ) ? command.arguments : undefined;

      if ( !isString ( cmd ) ) continue;

      const alignment = isString ( command?.alignment ) ? command.alignment : undefined;
      const color = isString ( command?.color ) ? command.color : undefined;
      const priority = isNumber ( command?.priority ) ? command.priority : undefined;
      const text = isString ( command?.text ) ? command.text : undefined;
      const tooltip = isString ( command?.tooltip ) ? command.tooltip : undefined;

      const filterFileRegex = isString ( command?.filterFileRegex ) ? command.filterFileRegex : undefined;
      const filterLanguageRegex = isString ( command?.filterLanguageRegex ) ? command.filterLanguageRegex : undefined;
      const filterWorkspaceFileRegex = isString ( command?.filterWorkspaceFileRegex ) ? command.filterWorkspaceFileRegex : undefined;

      commands.push ({ command: cmd, arguments: args, alignment, color, priority, text, tooltip, filterFileRegex, filterLanguageRegex, filterWorkspaceFileRegex });

    }

  }

  return commands;

};

const getCommandsFromInternalConfig = (): Command[] => {

  const config = getConfig ( 'commands' );
  const commands = getCommandsFromUnknown ( config );

  return commands;

};

const getCommandsFromExternalConfig = ( rootPath: string ): Command[] => {

  const configPath = path.join ( rootPath, '.vscode', 'commands.json' );
  const configContent = attempt ( () => fs.readFileSync ( configPath, 'utf8' ) );
  const config = attempt ( () => configContent && JSONC.parse ( configContent ) );
  const commands = getCommandsFromUnknown ( config );

  return commands;

};

const getCommandsFromExternalConfigs = (): Command[] => {

  const rootPaths = getProjectRootPaths ();
  const commands = rootPaths.map ( getCommandsFromExternalConfig ).flat ();

  return commands;

};

const isArray = ( value: unknown ): value is unknown[] => {

  return Array.isArray ( value );

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isObject = ( value: unknown ): value is Record<string, unknown> => {

  return typeof value === 'object' && value !== null;

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {attempt, getCommandIdentifier, getCommandVisibility, getCommands, isArray, isNumber, isObject, isString};
