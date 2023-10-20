// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import ReactDOM from 'react-dom';
import {Certificate} from 'electron/renderer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'renderer/css/modals.css';
import 'renderer/css/components/CertificateModal.css';

import {CertificateModalInfo} from 'types/modals';

import setupDarkMode from '../darkMode';

import SelectCertificateModal from './certificateModal';

setupDarkMode();

const handleCancel = () => {
    window.desktop.modals.cancelModal();
};

const handleSelect = (cert: Certificate) => {
    window.desktop.modals.finishModal({cert});
};

const getCertInfo = () => {
    return window.desktop.modals.getModalInfo<CertificateModalInfo>();
};

const start = async () => {
    ReactDOM.render(
        <SelectCertificateModal
            onSelect={handleSelect}
            onCancel={handleCancel}
            getCertInfo={getCertInfo}
        />,
        document.getElementById('app'),
    );
};

start();
