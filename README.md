# VSC Commands

<p align="center">
	<img src="https://raw.githubusercontent.com/fabiospampinato/vscode-commands/master/resources/logo-128x128.png" alt="Logo">
</p>

Trigger arbitrary commands from the statusbar. Supports passing arguments!

It comes packed with a lot of features:
  - **Supports passing arguments**: No other extension of this kind supports passing arguments to commands. This feature makes it quite powerful, for instance adding the ability to trigger custom terminal commands via [Terminals](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals), more about it below.
  - **Configuration based**: No need to create an extension just for adding some simple items to the statusbar, just edit the configuration.
  - **Global and local commands**: Define commands in your settings to make them global, define them in a local configuration file to make them project-specific.
  - **Configurable**: Many aspects of the statusbar items can be configured, including text, tooltip, color, position etc.
  - **Per language commands**: Show a particular statusbar item only if the currently opened file's language matches a provided regex.
  - **Per file commands**: Show a particular statusbar item only if the currently opened file's path matches a provided regex.

## Install

Run the following in the command palette:

```shell
ext install vscode-commands
```

## Usage

It adds 2 commands to the command palette:

```js
Commands: Edit Configuration // Open the local configuration file
Commands: Refresh // Force a refresh, must be called after editing the local configuration
```

## Configuration

Run the `Commands: Edit Configuration` command to create the local configuration file. If you want to define global commands simply add them to your Visual Studio Code settings under the key `commands.commands`.

The configuration is an object that looks like this, most options are optional:

```js
{
  "commands": [ // Array of commands
    { // An object describing a command, most entries are optional
      "alignment": "left", // Should the item be placed to the left or right?
      "priority": 0, // The priority of this item. Higher value means the item should be shown more to the left.
      "color": "#FFCC00", // The foreground color for this item.
      "text": "$(gear) Settings", // The text to show for the entry
      "tooltip": "Open User Settings", // The tooltip text when you hover over this item.
      "command": "workbench.action.openGlobalSettings", // Command to execute.
      "arguments": [1, 2, 3], // Arguments to pass to the command handler.
      "filterLanguageRegex": "markdown", // Show only if current file's language matches this regex. Requires double escaping.
      "filterFileRegex": ".*\\.ext", // Show only if the current file's path matches this regex. Requires double escaping.
    }
  ]
}
```

## Examples

Click on the description to see the configuration used to achieve that particular result.

### Simple commands

<details>
  <summary>Add buttons for opening the command palette, the global settings and toggling zen mode</summary>

  ```js
  {
    "text": "$(chevron-right)",
    "command": "workbench.action.showCommands",
    "tooltip": "Show commands"
  },
  {
    "text": "$(gear)",
    "command": "workbench.action.openGlobalSettings",
    "tooltip": "Settings"
  },
  {
    "text": "Zen",
    "command": "workbench.action.toggleZenMode",
    "tooltip": "Toggle zen mode"
  }
  ```

</details>

![Basic](resources/demo/basic.png)

<details>
  <summary>Add some file-related buttons: create a new untitled file and save all files</summary>

  ```js
  {
    "text": "$(file-code) New file",
    "command": "workbench.action.files.newUntitledFile",
    "tooltip": "New file"
  },
  {
    "text": "$(checklist) Save all",
    "command": "workbench.action.files.saveAll",
    "tooltip": "Save all files"
  }
  ```

</details>

![File-Related](resources/demo/file_related.png)

<details>
  <summary>Add a button for showing the Markdown preview to the side, only when a Markdown file is currently active</summary>

  ```js
  {
    "text": "$(markdown)",
    "command": "markdown.showPreviewToSide",
    "tooltip": "Open markdown preview",
    "filterFileRegex": ".*\\.md"
  }
  ```

</details>

![Markdown](resources/demo/markdown.png)

### Implementing existing extensions' functionality

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=Tyriar.terminal-tabs">Terminal Tabs</a>: Add buttons for easy switching to the N-th terminal instance</summary>

  ```js
  {
    "text": "$(terminal) 1",
    "command": "workbench.action.terminal.focusAtIndex1",
    "tooltip": "Focus to terminal #1"
  },
  {
    "text": "$(terminal) 2",
    "command": "workbench.action.terminal.focusAtIndex2",
    "tooltip": "Focus to terminal #2"
  },
  {
    "text": "$(terminal) 3",
    "command": "workbench.action.terminal.focusAtIndex3",
    "tooltip": "Focus to terminal #3"
  }
  ```

</details>

![Terminal Tabs](resources/demo/terminal_tabs.png)

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.activitusbar">Activitus Bar</a>: Replace the activity bar with buttons in the statusbar</summary>

  ```js
  {
    "text": "$(file-directory)",
    "command": "workbench.view.explorer",
    "tooltip": "Explorer"
  },
  {
    "text": "$(search)",
    "command": "workbench.view.search",
    "tooltip": "Search"
  },
  {
    "text": "$(repo-forked)",
    "command": "workbench.view.scm",
    "tooltip": "Source Control"
  },
  {
    "text": "$(bug)",
    "command": "workbench.view.debug",
    "tooltip": "Debug"
  },
  {
    "text": "$(package)",
    "command": "workbench.view.extensions",
    "tooltip": "Extensions"
  }
  ```

</details>

![Activitus Bar](resources/demo/activitus_bar.png)

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-statusbar-debugger">StatusBar Debugger</a>: Replace the floating debugger widget with some statusbar buttons. That extension is actually a bit more powerful than this, but if you don't need all it's functionalities the following configuration might be good enough.</summary>

  ```js
  {
    "text": "$(triangle-right)",
    "command": "workbench.action.debug.start",
    "tooltip": "Start debugging"
  },
  {
    "text": "$(primitive-square)",
    "command": "workbench.action.debug.stop",
    "tooltip": "Stop debugging"
  }
  ```

</details>

![StatusBar Debugger](resources/demo/statusbar_debugger.png)

### Plays well with others

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-projects-plus">Projects+</a>: Add some buttons for quickly switch between projects</summary>

  ```js
  {
    "text": "$(file-submodule)",
    "command": "projects.open",
    "tooltip": "Open a project"
  },
  {
    "text": "Projects+",
    "command": "projects.openByName",
    "arguments": ["vscode-projects-plus"],
    "tooltip": "Open Projects+"
  },
  {
    "text": "Todo+",
    "command": "projects.openByName",
    "arguments": ["vscode-todo-plus", true],
    "tooltip": "Open Todo+ in a new window"
  },
  {
    "text": "My Group",
    "command": "projects.openByName",
    "arguments": ["My Group", false, true],
    "tooltip": "Switch to the My Group"
  }
  ```

</details>

![Projects+](resources/demo/projects_plus.png)

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus">Todo+</a>: Add a button for opening the todo file, and if that is opened add a button for viewing all your todos across your projects, using <a href="https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-projects-plus-todo-plus">Projects+ Todo+</a></summary>

  ```js
  {
    "text": "$(check)",
    "command": "todo.open",
    "tooltip": "Open todo"
  },
  {
    "text": "$(checklist)",
    "command": "projects.todo",
    "tooltip": "Open global todo",
    "filterLanguageRegex": "todo"
  }
  ```

</details>

![Todo+](resources/demo/todo_plus.png)

<details>
  <summary><a href="https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals">Terminals</a>: Trigger custom advanced terminal commands</summary>

  ```js
  {
    "text": "$(terminal)",
    "command": "terminals.runTerminal",
    "tooltip": "Run a terminal"
  },
  {
    "text": "Init",
    "command": "terminals.runTerminalByName",
    "arguments": ["init"],
    "tooltip": "Init the project"
  },
  {
    "text": "Serve",
    "command": "terminals.runTerminalByName",
    "arguments": ["serve"],
    "tooltip": "Serve the project"
  }
  ```

</details>

![Terminals](resources/demo/terminals.png)

## Hits:

- **Icons**: [here](https://octicons.github.com/) you can browse a list of supported icons. If for instance you click the first icon, you'll get a page with `.octicon-alert` written in it, to get the string to use simply remove the `.octicon-` part, so in this case the icon name would be `alert`.
- **Live Refresh**: Even if you're crafting some local commands, it's advisable to start by adding them globally, since every time you edit your global settings your commands will be automatically refresh. Once you're done just move them to the local configuration file.

## License

MIT © Fabio Spampinato
