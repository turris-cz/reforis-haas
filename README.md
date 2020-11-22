# reForis HaaS plugin
reForis HaaS Plugin.
To learn more about the plugin system see documentation of [reForis](https://gitlab.labs.nic.cz/turris/reforis).

## Installing reForis Python package
By default, the latest version of reForis package is installed automatically when executing `make prepare-dev` command. If you wish to use development (editable) version from a local directory run `make install-local-reforis`. This assumes that reForis is in `reforis` directory alongside plugin directory.

Please note that you still need to upload reForis code to the router for changes to be taken into account.
