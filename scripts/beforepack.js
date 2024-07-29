// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const {exec} = require('child_process');

exports.default = async function beforePack(context) {
    return new Promise((resolve, reject) => {
        const arch = getArch(context.arch);
        exec(`npm run postinstall -- --arch ${arch}`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

function getArch(arch) {
    const architectureMap = {
        0: 'ia32',
        1: 'x64',
        2: 'armv7l',
        3: 'arm64',
        4: 'universal'
    };
    return architectureMap[arch] || '';
}