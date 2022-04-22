// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {app, BrowserWindow, Menu, Rectangle, Session, session} from 'electron';
import log from 'electron-log';

import {TeamWithTabs} from 'types/config';
import {RemoteInfo} from 'types/server';
import {Boundaries} from 'types/utils';

import Config from 'common/config';
import {MattermostServer} from 'common/servers/MattermostServer';
import {TAB_FOCALBOARD, TAB_LOGIN, TAB_MEET, TAB_MESSAGING, TAB_PLAYBOOKS} from 'common/tabs/TabView';
import urlUtils from 'common/utils/url';
import Utils from 'common/utils/util';

import {createMenu as createAppMenu} from 'main/menus/app';
import {createMenu as createTrayMenu} from 'main/menus/tray';
import {ServerInfo} from 'main/server/serverInfo';
import {setTrayMenu} from 'main/tray/tray';
import WindowManager from 'main/windows/windowManager';

import {mainProtocol} from './initialize';

export function openDeepLink(deeplinkingUrl: string) {
    try {
        WindowManager.showMainWindow(deeplinkingUrl);
    } catch (err) {
        log.error(`There was an error opening the deeplinking url: ${err}`);
    }
}

export function updateSpellCheckerLocales() {
    if (Config.data?.spellCheckerLocales.length && app.isReady()) {
        session.defaultSession.setSpellCheckerLanguages(Config.data?.spellCheckerLocales);
    }
}

export function updateServerInfos(teams: TeamWithTabs[]) {
    const serverInfos: Array<Promise<RemoteInfo | string | undefined>> = [];
    teams.forEach((team) => {
        const serverInfo = new ServerInfo(new MattermostServer(team.name, team.url));
        serverInfos.push(serverInfo.promise);
    });
    Promise.all(serverInfos).then((data: Array<RemoteInfo | string | undefined>) => {
        const teams = Config.teams;
        teams.forEach((team) => openExtraTabs(data, team));
        Config.set('teams', teams);
    }).catch((reason: any) => {
        log.error('Error getting server infos', reason);
    });
}

function openExtraTabs(data: Array<RemoteInfo | string | undefined>, team: TeamWithTabs) {
    const remoteInfo = data.find((info) => info && typeof info !== 'string' && info.name === team.name) as RemoteInfo;
    if (remoteInfo) {
        team.tabs.forEach((tab) => {
            if (tab.name !== TAB_MESSAGING && remoteInfo.serverVersion && Utils.isVersionGreaterThanOrEqualTo(remoteInfo.serverVersion, '6.0.0')) {
                if (tab.name === TAB_PLAYBOOKS && remoteInfo.hasPlaybooks && tab.isOpen !== false) {
                    log.info(`opening ${team.name}___${tab.name} on hasPlaybooks`);
                    tab.isOpen = true;
                }
                if (tab.name === TAB_FOCALBOARD && remoteInfo.hasFocalboard && tab.isOpen !== false) {
                    log.info(`opening ${team.name}___${tab.name} on hasFocalboard`);
                    tab.isOpen = true;
                }
                if (tab.name === TAB_LOGIN && tab.isOpen !== false) {
                    log.info(`opening ${team.name}___${tab.name} on hasFocalboard`);
                    tab.isOpen = true;
                }
                if (tab.name === TAB_MEET && tab.isOpen !== false) {
                    log.info(`opening ${team.name}___${tab.name} on hasFocalboard`);
                    tab.isOpen = true;
                }
            }
        });
    }
}

export function handleUpdateMenuEvent() {
    const aMenu = createAppMenu(Config);
    Menu.setApplicationMenu(aMenu);
    aMenu.addListener('menu-will-close', WindowManager.focusBrowserView);

    // set up context menu for tray icon
    if (shouldShowTrayIcon()) {
        const tMenu = createTrayMenu(Config.data!);
        setTrayMenu(tMenu);
    }
}

export function getDeeplinkingURL(args: string[]) {
    if (Array.isArray(args) && args.length) {
    // deeplink urls should always be the last argument, but may not be the first (i.e. Windows with the app already running)
        const url = args[args.length - 1];
        if (url && mainProtocol && url.startsWith(mainProtocol) && urlUtils.isValidURI(url)) {
            return url;
        }
    }
    return undefined;
}

export function shouldShowTrayIcon() {
    return Config.showTrayIcon || process.platform === 'win32';
}

export function wasUpdated(lastAppVersion?: string) {
    return lastAppVersion !== app.getVersion();
}

export function clearAppCache() {
    // TODO: clear cache on browserviews, not in the renderer.
    const mainWindow = WindowManager.getMainWindow();
    if (mainWindow) {
        mainWindow.webContents.session.clearCache().then(mainWindow.reload);
    } else {
    //Wait for mainWindow
        setTimeout(clearAppCache, 100);
    }
}

function isWithinDisplay(state: Rectangle, display: Boundaries) {
    const startsWithinDisplay = !(state.x > display.maxX || state.y > display.maxY || state.x < display.minX || state.y < display.minY);
    if (!startsWithinDisplay) {
        return false;
    }

    // is half the screen within the display?
    const midX = state.x + (state.width / 2);
    const midY = state.y + (state.height / 2);
    return !(midX > display.maxX || midY > display.maxY);
}

function getValidWindowPosition(state: Rectangle) {
    // Check if the previous position is out of the viewable area
    // (e.g. because the screen has been plugged off)
    const boundaries = Utils.getDisplayBoundaries();
    const display = boundaries.find((boundary) => {
        return isWithinDisplay(state, boundary);
    });

    if (typeof display === 'undefined') {
        return {};
    }
    return {x: state.x, y: state.y};
}

export function resizeScreen(browserWindow: BrowserWindow) {
    function handle() {
        const position = browserWindow.getPosition();
        const size = browserWindow.getSize();
        const validPosition = getValidWindowPosition({
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1],
        });
        if (typeof validPosition.x !== 'undefined' || typeof validPosition.y !== 'undefined') {
            browserWindow.setPosition(validPosition.x || 0, validPosition.y || 0);
        } else {
            browserWindow.center();
        }
    }

    browserWindow.on('restore', handle);
    handle();
}

function flushCookiesStore(session: Session) {
    session.cookies.flushStore().catch((err) => {
        log.error(`There was a problem flushing cookies:\n${err}`);
    });
}

export function initCookieManager(session: Session) {
    // Somehow cookies are not immediately saved to disk.
    // So manually flush cookie store to disk on closing the app.
    // https://github.com/electron/electron/issues/8416
    app.on('before-quit', () => {
        flushCookiesStore(session);
    });

    app.on('browser-window-blur', () => {
        flushCookiesStore(session);
    });
}
