# MZouti Bot

### Your WhatsApp assistant --- simple, fast and powerful.

[![Beta](https://img.shields.io/badge/status-beta-7c3aed?style=for-the-badge)](https://github.com/mrmarco-svg/mzouti-bot)
[![Languages](https://img.shields.io/badge/languages-French%20%7C%20English-2563eb?style=for-the-badge)](#language)
[![WhatsApp](https://img.shields.io/badge/platform-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://www.whatsapp.com/)

**MZouti Bot** is a multifunctional WhatsApp assistant designed to
simplify group administration and provide useful automation features for
individual users and communities.

[Source code](https://github.com/mrmarco-svg/mzouti-bot)

------------------------------------------------------------------------

## Overview

MZouti Bot brings practical WhatsApp features together in one assistant.
It includes group-management commands, connection utilities, and
configurable automation.

The project is currently in **beta**. Features, commands, and
configuration may evolve as development continues.

## Features

The following features are reported as operational in the current beta:

  -----------------------------------------------------------------------
  Command / feature                   Description
  ----------------------------------- -----------------------------------
  `ping`                              Checks whether the bot is
                                      responding.

  `menu`                              Displays the available commands.

  `owner`                             Shows the bot owner's information.

  `repo`                              Displays the project repository.

  `welcome`                           Welcomes new members in groups.

  `anticall`                          Handles incoming WhatsApp calls
                                      according to the bot's
                                      configuration.

  `antilink`                          Helps group administrators manage
                                      links shared in a group.

  `mode`                              Switches the bot's operating mode.

  `alwaysonline`                      Enables the configured
                                      online-presence behavior.

  `antiviewonce`                      Provides the configured handling
                                      for view-once messages.

  `paircommand`                       Provides the command used for the
                                      pairing flow.

  `replynumber`                       Replies using a phone number or
                                      text, according to command options.

  `autoview`                          Enables automatic status viewing.
  -----------------------------------------------------------------------

Feature availability and behavior can depend on the connection method,
permissions, and configuration.

## Connection methods

MZouti Bot supports both connection approaches:

-   **Pairing code**
-   **QR code**

Follow the instructions displayed by the application during setup. Keep
WhatsApp session credentials private. Never publish them in an issue,
screenshot, or public repository.

## Deployment and hosting

MZouti Bot is intended to support different hosting environments,
including local environments and compatible cloud or VPS providers.

For exact installation and deployment commands, consult the current
source files and package manifest. Runtime versions, dependencies,
environment variables, and start commands must match the current
release; they are not specified here to avoid publishing incorrect setup
instructions.

## Language

MZouti Bot is intended for both **French and English** users. The
language available in a command or interface may depend on the current
implementation and configuration.

## Intended audience

-   **Individual users** who want practical WhatsApp automation.
-   **Group administrators and communities** who need moderation and
    member-management utilities.

## Project status

**Beta**

The project is under active development. Users may encounter bugs,
incomplete behavior, or changes between versions. Back up configuration
and session data before updating.

## Security and responsible use

-   Treat pairing codes, QR sessions, authentication files, and
    environment variables as private credentials.
-   Do not commit session data, API keys, passwords, or `.env` files.
-   Use group-management features only where you have the appropriate
    permissions.
-   Respect WhatsApp's terms, applicable laws, and the privacy of other
    users.
-   Do not use automation to spam, harass, impersonate, or access
    another person's account without authorization.

## Support and bug reports

For bugs, feature requests, or technical questions, open an issue in the
project repository:

[Report an issue](https://github.com/mrmarco-svg/mzouti-bot/issues)

When reporting a problem, include the bot version or commit, hosting
environment and runtime version, the command or action that caused the
problem, and relevant logs with personal information, phone numbers,
credentials, and session data removed.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1.  Check existing issues to avoid duplicates.
2.  Describe the purpose and impact of the proposed change.
3.  Test the affected commands.
4.  Never include secrets, private session files, or personal data in a
    commit.

## License

The repository's license determines the permissions for using,
modifying, and redistributing this project. Consult the `LICENSE` file
in the repository. If no license file is present, do not assume that
redistribution is permitted.

------------------------------------------------------------------------

**MZouti Bot**\
*More than a bot. A smarter WhatsApp assistant.*
