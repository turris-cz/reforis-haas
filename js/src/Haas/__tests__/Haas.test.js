/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import {
    getByText,
    getByLabelText,
    render,
    wait,
    fireEvent,
} from "foris/testUtils/customTestRender";

import Haas from "../Haas";

describe("<Haas />", () => {
    const inputValidation = "Please enter a valid alphanumeric token.";

    it("Should render HaaS component.", async () => {
        const { container } = render(<Haas />);
        mockAxios.mockResponse({
            data: { enabled: false, token: "" },
        });
        await wait(() => {
            expect(getByText(container, "Proxy Settings")).toBeDefined();
        });
        expect(container).toMatchSnapshot();
    });

    it("Should render HaaS component and accept a valid token.", async () => {
        const { container } = render(<Haas />);
        mockAxios.mockResponse({
            data: { enabled: false, token: "random_token" },
        });
        await wait(() => {
            expect(getByText(container, "Proxy Settings")).toBeDefined();
        });

        fireEvent.click(getByLabelText(container, /Enable HaaS/));

        const changeToken = (value) =>
            fireEvent.change(getByLabelText(container, "HaaS token"), {
                target: { value },
            });

        changeToken("");
        expect(getByText(container, inputValidation)).toBeDefined();

        changeToken("0008033cd3b4566ead6c50862d1e0cc7111111abcadf1111");
        expect(container).toMatchSnapshot();
    });
});
