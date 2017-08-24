
/* IMPORT */

import * as vscode from 'vscode';
import Utils from '../../utils';

/* ITEM */

class Item {

  config;
  item;

  constructor ( config ) {

    this.config = config;

    this.init ();

  }

  init () {

    const alignment = this.config.alignment === 'right' ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left,
          priority = this.config.priority;

    this.item = vscode.window.createStatusBarItem ( alignment, priority );
    this.item.color = this.config.color;
    this.item.text = this.config.text;
    this.item.tooltip = this.config.tooltip || `Execute "${this.config.command}"`;
    this.item.command = Utils.command.get ( this.config.command, this.config.arguments );

  }

  dispose () {

    this.item.dispose ();

  }

  hide () {

    this.item.hide ();

  }

  show () {

    this.item.show ();

  }

}

/* EXPORT */

export default Item;
