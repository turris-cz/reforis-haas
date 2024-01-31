#  Copyright (C) 2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

"""
HaaS module for reForis.
"""

from pathlib import Path
from http import HTTPStatus

from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import validate_json, APIError

blueprint = Blueprint(
    'Haas',
    __name__,
    url_prefix='/haas/api',
)

BASE_DIR = Path(__file__).parent

haas = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_haas/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/settings', methods=['GET', 'POST'])
def haas_settings():
    """
    .. http:get:: /api/haas
        See ``get_settings`` action in the `foris-controller haas module JSON schema
        <https://gitlab.nic.cz/turris/foris-controller/foris-controller-haas-module/-/blob/master/foris_controller_modules/haas/schema/haas.json>`_.

    .. http:post:: /api/haas
        See ``update_settings`` action in the `foris-controller haas module JSON schema
        <https://gitlab.nic.cz/turris/foris-controller/foris-controller-haas-module/-/blob/master/foris_controller_modules/haas/schema/haas.json>`_.
    """
    if request.method == 'GET':
        response = current_app.backend.perform('haas', 'get_settings')
    elif request.method == 'POST':
        validate_json(request.json, {'token': str})
        response = current_app.backend.perform('haas', 'update_settings', request.json)
        if response.get('result') is not True:
            raise APIError(_('Cannot update HaaS settings'),
                           HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify(response)
