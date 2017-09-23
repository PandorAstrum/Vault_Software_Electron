const electron = require('electron');
const url = require('url');
const path = require('path');


const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow = null;
// var TEMPLATE_DIR = '/Templates/';
var TEMPLATE_DIR = path.join(__dirname + '../Templates');

// production settings
// process.env.NODE_ENV = 'production';

// listen for the app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        // resizable: false,
        // frame: false
    });

    // Load html into window
    mainWindow.loadURL(url.format({
        // pathname: path.join(__dirname, '/templates/main.html'),
        pathname: TEMPLATE_DIR + '/main.html',
        protocol: 'file',
        slashes: true
    }));

    // Quit app when close
    mainWindow.on('closed', function(){
        // mainWindow = null;
        app.quit();
    });

    // Create Main Window
    // mainWindow = new BrowserWindow({});
    
    

    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }));
    

    // mainWindow.resizable= false;
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

// Catch val
ipcMain.on('user:name', function(e, val){
    console.log(val);
    // Send to any window
    // mainWindow.webContents.send('user:name');
    
});

// All close
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});


// Create Menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'New Project',
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Open Project',
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu:[
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            }
        ]
    }
];


// Add developer tools when not in production
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Debug Console'
            },
            {
                label: 'Show Inspectors',
                accelerator: 'CmdOrCtrl+I',
                click(item, focusedWindow){
                    focusedWindow.openDevTools({
                        detach: true
                    });
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}