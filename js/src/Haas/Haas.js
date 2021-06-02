/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { ForisForm } from "foris";

import API_URLs from "../API";
import HaasForm from "./HaasForm";

export default function Haas() {
    return (
        <>
            <h1>{_("Honeypot as a Service")}</h1>
            <p
                dangerouslySetInnerHTML={{
                    __html: _(`Honeypot as a Service (HaaS) is a special \
software which simulates an operating system and allows an attacker to log in \
via SSH or telnet and execute commands or download malware. For more \
information click <a href="https://haas.nic.cz/" target="_blank" rel="noopener \
noreferrer">here<sup><i class="fas fa-external-link-alt link-outside-icon \
fa-xs"></i></sup></a>.`),
                }}
            />
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.haas,
                }}
                validator={validator}
            >
                <HaasForm />
            </ForisForm>
        </>
    );
}

function validator(formData) {
    const error = {};
    const regex = /[a-f0-9]{32,48}/;

    if (formData.token.length > 48 || !regex.test(formData.token))
        error.token = _("Please enter a valid alphanumeric token.");

    return error.token ? error : undefined;
}
