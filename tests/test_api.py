#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from reforis.test_utils import mock_backend_response


@mock_backend_response({'haas': {'get_settings': {'token': '', 'enabled': False}}})
def test_get_settings(client):
    response = client.get('/haas/api/settings')
    assert response.status_code == HTTPStatus.OK
    assert response.json['token'] == ''
    assert response.json['enabled'] is False


@mock_backend_response({'haas': {'update_settings': {'result': True}}})
def test_post_settings_invalid_json(client):
    response = client.post('/haas/api/settings', json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == 'Invalid JSON'


@mock_backend_response({'haas': {'update_settings': {'result': True}}})
def test_post_settings(client):
    response = client.post('/haas/api/settings',
                           json={'enabled': True, 'token': '81f2cd612ea14da5bbaeaf08e7dc2a39'})
    assert response.status_code == HTTPStatus.OK


@mock_backend_response({'haas': {'update_settings': {'result': False}}})
def test_post_settings_bad_foris_controller_response(client):
    response = client.post('/haas/api/settings',
                           json={'enabled': True, 'token': ''})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Cannot update HaaS settings'
