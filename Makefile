#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

.PHONY: all venv prepare-dev install install-js install-local-reforis watch-js build-js lint lint-js lint-js-fix lint-web test test-js test-web test-js-update-snapshots create-messages init-langs update-messages compile-messages clean

VENV_NAME?=venv
VENV_BIN=$(shell pwd)/$(VENV_NAME)/bin

PYTHON=python3

JS_DIR=./js

LANGS = cs da de el en fi fo fr hr hu it ja ko lt nb nb_NO nl pl ro ru sk sv

all:
	@echo "make prepare-env"
	@echo "    Install tools for development environment: node, npm, Python, virtualenv"
	@echo "make prepare-dev"
	@echo "    Create python virtual environment and install dependencies."
	@echo "make install"
	@echo "    Install package in your system (for running on router)."
	@echo "make watch-js"
	@echo "    Compile JS in watch mode."
	@echo "make build-js"
	@echo "    Compile JS."
	@echo "make lint"
	@echo "    Run lint on project."
	@echo "make test"
	@echo "    Run tests on project."
	@echo "make create-messages"
	@echo "    Create locale messages (.pot)."
	@echo "make update-messages"
	@echo "    Update locale messages from .pot file."
	@echo "make compile-messages"
	@echo "    Compile locale messager."
	@echo "make clean"
	@echo "    Remove python artifacts and virtualenv."

venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate: setup.py
	test -d $(VENV_NAME) || $(PYTHON) -m virtualenv -p $(PYTHON) $(VENV_NAME)
	# Some problem in latest version of setuptools during extracting translations.
	$(VENV_BIN)/$(PYTHON) -m pip install -U pip setuptools==39.1.0
	$(VENV_BIN)/$(PYTHON) -m pip install -e .[devel]
	touch $(VENV_NAME)/bin/activate

prepare-env:
	which npm || curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
	which npm || sudo apt install -y nodejs
	which $(PYTHON) || sudo apt install -y $(PYTHON) $(PYTHON)-pip
	which virtualenv || sudo $(PYTHON) -m pip install virtualenv
prepare-dev:
	cd $(JS_DIR); npm install
	make venv

install:
	$(PYTHON) -m pip install -e .
	ln -sf /tmp/reforis-haas/reforis_static/reforis_haas /tmp/reforis/reforis_static/
	/etc/init.d/lighttpd restart
install-js: js/package.json
	cd $(JS_DIR); npm install --save-dev
install-local-reforis:
	$(VENV_BIN)/$(PYTHON) -m pip install -e ../reforis

watch-js:
	cd $(JS_DIR); npm run-script watch
build-js:
	cd $(JS_DIR); npm run-script build

lint: lint-js lint-web
lint-js:
	cd $(JS_DIR); npm run lint
lint-js-fix:
	cd $(JS_DIR); npm run lint:fix
lint-web: venv
	$(VENV_BIN)/$(PYTHON) -m pylint --rcfile=pylintrc reforis_haas
	$(VENV_BIN)/$(PYTHON) -m pycodestyle --config=pycodestyle reforis_haas

test: test-js test-web
test-js:
	cd $(JS_DIR); npm test
test-web: venv
	$(VENV_BIN)/$(PYTHON) -m pytest -vv tests
test-js-update-snapshots:
	cd $(JS_DIR); npm test -- -u

create-messages:
	$(VENV_BIN)/pybabel extract -F babel.cfg -o ./reforis_haas/translations/messages.pot .
init-langs: create-messages
	for lang in $(LANGS); do \
		$(VENV_BIN)/pybabel init \
		-i reforis_haas/translations/messages.pot \
		-d reforis_haas/translations/ -l $$lang \
	; done
update-messages:
	$(VENV_BIN)/pybabel update -i ./reforis_haas/translations/messages.pot -d ./reforis_haas/translations
compile-messages:
	$(VENV_BIN)/pybabel compile -f -d ./reforis_haas/translations

clean:
	find . -name '*.pyc' -exec rm -f {} +
	rm -rf $(VENV_NAME) *.eggs *.egg-info dist build .cache
	rm -rf dist build *.egg-info
	rm -rf $(JS_DIR)/node_modules/ reforis_static/reforis_haas/js/app.min.js
	$(PYTHON) -m pip uninstall -y reforis_haas
