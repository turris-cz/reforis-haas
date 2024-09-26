/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForisForm } from "foris";

import HaasForm from "./HaasForm";
import API_URLs from "../API";

export default function Haas() {
    return (
        <>
            <h1>{_("Honeypot as a Service")}</h1>
            <p>
                {_(
                    "Honeypot as a Service (HaaS) is a special software which simulates an operating system and allows an attacker to log in via SSH or telnet and execute commands or download malware."
                )}
            </p>
            <p>
                {_(
                    "If you want to use Honeypot as a Service on your router, you should have the public IPv4 address, register on the HaaS website, and fill out the token. Also, there you can see sessions and statistics from the SSH honeypot from your router. For more information click "
                )}
                <a
                    href="https://haas.nic.cz/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {_("here")}
                    <sup>
                        <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            className="fa-xs ms-1"
                        />
                    </sup>
                </a>
                .
            </p>
            <ForisForm
                forisConfig={{
                    endpoint: API_URLs.haas,
                }}
                prepData={prepData}
                validator={validator}
            >
                <HaasForm />
            </ForisForm>
        </>
    );
}

function prepData(formData) {
    if (formData.token === "") formData.enabled = false;
    return formData;
}

function validator(formData) {
    const error = {};
    const regex = /[a-f0-9]{32,48}/;

    if (formData.token.length > 48 || !regex.test(formData.token))
        error.token = _("Please enter a valid alphanumeric token.");

    return error.token ? error : undefined;
}
