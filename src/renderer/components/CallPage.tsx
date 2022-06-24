// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable max-lines */

// import 'renderer/css/settings.css';
import React from 'react';

import {CALL_CLOSED, CALL_COMMAND} from 'common/communication';

import JitsiMeetExternalAPI from 'renderer/external_api';

export default class CallPage extends React.PureComponent<Record<string, never>> {
    currentRef: React.RefObject<HTMLDivElement>;

    constructor(props: Record<string, never>) {
        super(props);

        this.currentRef = React.createRef();
    }

    componentDidMount() {
        window.ipcRenderer.on('jitsi-connect', (_, msg) => this.handleConnect(msg.id, msg.url, msg.name, msg.avatar));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.body.style['-webkit-app-region'] = 'drag';
    }

    handleConnect(id: string, url: string, name: string, avatar: string) {
        const configOverwrite = {
            startWithAudioMuted: false,
            startWithVideoMuted: true,
            subject: name,
            prejoinConfig: {enabled: false},
            disableDeepLinking: true,
            feedbackPercentage: 0,
        };

        const options = {
            configOverwrite,
            interfaceConfigOverwrite: {HIDE_INVITE_MORE_HEADER: true},

            // parentNode: this.currentRef.current,
            roomName: id,
        };

        const api = new JitsiMeetExternalAPI('kmeet.preprod.dev.infomaniak.ch', {
            ...options,
        });

        window.jitsiNodeAPI.setupRenderer(api, {
            enableRemoteControl: false,
            enableAlwaysOnTopWindow: true,
        });

        api.executeCommand('avatarUrl', avatar);

        api.on('readyToClose', () => {
            window.ipcRenderer.send(CALL_CLOSED, id);
            api.dispose();
        });

        api.addListener('audioMuteStatusChanged', (status) => {
            window.ipcRenderer.send('call-audio-status-change', status);
        });

        api.addListener('videoMuteStatusChanged', (status) => {
            window.ipcRenderer.send('call-video-status-change', status);
        });

        api.addListener('screenSharingStatusChanged', (status) => {
            window.ipcRenderer.send('call-ss-status-change', status);
        });

        window.ipcRenderer.on(CALL_COMMAND, (_, msg) => {
            api.executeCommand(msg.command);
        });
    }

    render() {
        return (
            <React.Fragment/>
        );
    }
}
