/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import Haas from "../Haas";

describe("<Haas />", () => {
    it("should render component", () => {
        const { getByText } = render(<Haas />);
        expect(getByText("Haas")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith(
            "/reforis/haas/api/example",
            expect.anything()
        );
    });
});
