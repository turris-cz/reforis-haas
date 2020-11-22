#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from reforis.test_utils import mock_backend_response


@mock_backend_response({'example_module': {'example_action': {'key': 'value'}}})
def test_get_example(client):
    response = client.get('/haas/api/example')
    assert response.status_code == HTTPStatus.OK
    assert response.json['key'] == 'value'


@mock_backend_response({'example_module': {'example_action': {'result': True}}})
def test_post_example_invalid_json(client):
    response = client.post('/haas/api/example', json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == 'Invalid JSON'


@mock_backend_response({'example_module': {'example_action': {'key': 'value'}}})
def test_post_example_backend_error(client):
    response = client.post('/haas/api/example', json={'modules': []})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Cannot create entity'
