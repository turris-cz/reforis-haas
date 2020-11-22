/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useEffect } from "react";

import { useAPIGet } from "foris";

import API_URLs from "API";

export default function Haas() {
    const [, getExample] = useAPIGet(API_URLs.example);
    useEffect(() => {
        getExample();
    }, [getExample]);

    return (
        <>
            <h1>Haas</h1>
            <p>{_("Add your components here")}</p>
        </>
    );
}
