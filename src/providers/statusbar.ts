
/* IMPORT */

import vscode from 'vscode';
import {getActiveFileLanguage, getActiveFilePath} from 'vscode-extras';
import {getCommandIdentifier, getCommandVisibility, getCommands} from '../utils';
import type {Command} from '../types';

/* TYPES */

type Item = {
  item: vscode.StatusBarItem,
  command: Command
};

/* MAIN */

const Statusbar = {

  /* VARIABLES */

  items: <Item[]> [],

  /* API */

  create: ( command: Command ): Item => {

    const alignment = ( command.alignment === 'right' ) ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left;
    const priority = command.priority || 0;
    const item = vscode.window.createStatusBarItem ( alignment, priority );

    item.color = command.color;
    item.text = command.text || '';
    item.tooltip = command.tooltip || `Execute "${command.command}"`;
    item.command = getCommandIdentifier ( command.command, command.arguments );

    return { item, command };

  },

  createAll: (): void => {

    Statusbar.items = getCommands ().map ( Statusbar.create );
    Statusbar.refreshAll ();

  },

  disposeAll: (): void => {

    Statusbar.items.forEach ( item => item.item.dispose () );
    Statusbar.items = [];

  },

  refreshAll: (): void => {

    const filePath = getActiveFilePath ();
    const fileLang = getActiveFileLanguage ();

    Statusbar.items.forEach ( async item => {

      const isVisible = await getCommandVisibility ( item.command, filePath, fileLang );

      item.item[isVisible ? 'show' : 'hide']();

    });

  },

  resetAll: (): void => {

    Statusbar.disposeAll ();
    Statusbar.createAll ();

  },

  /* PROVIDER API */

  onChangeAll: (): void => {

    Statusbar.resetAll ();

  },

  onChangeEditor: (): void => {

    Statusbar.refreshAll ();

  }

};

/* EXPORT */

export default Statusbar;
