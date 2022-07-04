module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    },
    electronBuilder: {
      nodeIntegration: true,
      externals: ['serialport'],
      builderOptions: {
        productName: '蓝牙调试工具',
        win: {
          icon: 'public/icon.ico',
          artifactName: '${productName}-${version}.${ext}',
          target: [
            {
              target: 'nsis',
              arch: ['x64']
            }
          ]
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        linux: {
          icon: 'build/electron-icon/icon.png',
          target: 'AppImage'
        },
        mac: {
          icon: 'build/electron-icon/icon.icns'
        },
        nsis: {
          oneClick: false,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'public/icon.ico',
          uninstallerIcon: 'public/icon.ico',
          installerHeaderIcon: 'public/icon.ico',
          createDesktopShortcut: true,
          createStartMenuShortcut: true
        }
      }
    }
  }
};
