/*
 * Copyright (C) 2020-2022 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { Switch, TextInput } from "foris";

HAASForm.propTypes = {
    formData: PropTypes.shape({
        enabled: PropTypes.bool,
        token: PropTypes.string,
    }).isRequired,
    setFormValue: PropTypes.func,
    disabled: PropTypes.bool,
    formErrors: PropTypes.shape({
        token: PropTypes.string,
    }),
};

HAASForm.defaultProps = {
    formData: {
        enabled: false,
        token: "",
    },
    formErrors: {},
};

export default function HAASForm({
    formData,
    setFormValue,
    disabled,
    formErrors,
}) {
    return (
        <>
            <h2>{_("Proxy Settings")}</h2>
            <Switch
                checked={formData.enabled}
                label={_("Enable HaaS proxy")}
                onChange={setFormValue((value) => ({
                    enabled: { $set: value },
                }))}
                disabled={disabled}
            />
            {formData.enabled && (
                <TextInput
                    value={formData.token || ""}
                    label={_("HaaS token")}
                    error={formErrors.token}
                    helpText={_(
                        `Token used to match SSH session with device in HaaS proxy.`
                    )}
                    onChange={setFormValue((value) => ({
                        token: { $set: value },
                    }))}
                    disabled={disabled}
                />
            )}
        </>
    );
}
