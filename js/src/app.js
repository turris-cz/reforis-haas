/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import Haas from "./Haas/Haas";

const HaasPlugin = {
    name: _("Haas"),
    weight: 100,
    submenuId: "haas",
    path: "/haas",
    component: Haas,
    icon: "cube",
};

ForisPlugins.push(HaasPlugin);
