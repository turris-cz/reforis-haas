# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-03-06

### Added

-   Added & updated translations
-   Added command to install foris-controller-haas-module in Makefile

### Changed

-   Updated dependencies in package.json
-   Updated Node.js to v21.x in Makefile
-   Updated ESLint and Prettier configurations
-   Updated .gitignore to exclude minified JS files and license files
-   Updated webpack.config.js with process/browser alias
-   Updated CI to use shared scripts, build and publish python package
-   Replaced Pylint & Pycodestyle for Ruff
-   Fixed changelog's file extension
-   NPM audit fix

## [0.1.4] - 2022-09-23

-   Add & update translations
-   Restructure & update Makefile
-   Update Python image to v3.10.x
-   Improve intro text & strings parsing
-   Move reforis to devel extras dependencies
-   Fix enabled state when a token is missing
-   NPM audit fix

## [0.1.3] - 2021-06-07

-   Add support for longer tokens
-   Use Switch instead of Checkbox for HaaS proxy

## [0.1.2] - 2021-05-24

-   Add translations
-   Update Foris JS library to v0.1.2
-   NPM audit fix

## [0.1.1] - 2021-02-04

-   Remove duplicate Norwegian language
-   Remove translation file for the source language
-   Update Foris JS library to version 5.1.9

## [0.1.0] - 2020-11-26

-   Init plugin
-   Add HaaS endpoint
-   Add HaaS proxy settings
-   Add tests and snapshots
-   Move HaaS page under Sentinel

[unreleased]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v1.1.1...master
[1.0.0]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v0.1.4...v1.0.0
[0.1.4]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v0.1.3...v0.1.4
[0.1.3]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v0.1.2...v0.1.3
[0.1.2]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v0.1.1...v0.1.2
[0.1.1]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/compare/v0.1.0...v0.1.1
[0.1.0]: https://gitlab.nic.cz/turris/reforis/reforis-haas/-/tags/v0.1.0
