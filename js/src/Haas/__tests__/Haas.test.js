/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render, waitForElement } from "foris/testUtils/customTestRender";

import Haas from "../Haas";

describe("<Haas />", () => {
    let container;

    it("Should render HaaS component & form's disabled submit button.", async () => {
        const { getByText, container } = render(<Haas />);
        mockAxios.mockResponse({
            data: { enabled: false, token: "random_token" },
        });
        await waitForElement(() => getByText("Proxy Settings"));
        expect(container).toMatchSnapshot();
    });

    it("Should render HaaS component & form's enabled submit button.", async () => {
        const { getByText, container } = render(<Haas />);
        mockAxios.mockResponse({
            data: { enabled: false, token: "d4c8033cd3b4566ead6c50862d1e0cc7" },
        });
        await waitForElement(() => getByText("Proxy Settings"));
        expect(container).toMatchSnapshot();
    });
});
