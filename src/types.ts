
/* MAIN */

type Command = {
  /* COMMAND */
  command: string,
  arguments?: unknown[],
  /* STYLE */
  alignment?: string,
  color?: string,
  priority?: number,
  text?: string,
  tooltip?: string,
  /* FILTERS */
  filterFileRegex?: string,
  filterLanguageRegex?: string,
  filterWorkspaceFileRegex?: string
};

type Options = {
  commands: Command[]
};

/* EXPORT */

export type {Command, Options};
