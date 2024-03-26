import { CSSProperties } from "react";
import { ServerTeam } from "types/server";
import { Theme } from "types/theme";

export function imageURLForTeam(team?: ServerTeam) {
    return team?.last_team_icon_update ? `${team.url}/api/v4/teams/${team.id}/image`: null;
}

export function initialForTeam(team?: ServerTeam) {
    return team?.name ? team.name.replace(/\s/g, '').substring(0, 2) : '??'
}

export function toRgbValues(hexStr: string): string {
    const rgbaStr = `${parseInt(hexStr.substr(1, 2), 16)}, ${parseInt(hexStr.substr(3, 2), 16)}, ${parseInt(hexStr.substr(5, 2), 16)}`;
    return rgbaStr;
}
export const applyCssVars = (theme: Theme) => {
    return {
        '--sidebar-background': theme.sidebarHeaderBg,
        '--sidebar-border-color-rgb': toRgbValues(theme.centerChannelBg),
        '--sidebar-team-bg': theme.sidebarTeamBarBg,
        '--sidebar-text-header-color': theme.sidebarHeaderTextColor,
        '--sidebar-text-color-rgb': toRgbValues(theme.sidebarText)
    } as CSSProperties
}
