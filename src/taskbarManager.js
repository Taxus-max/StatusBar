const {Tray, Menu, app, nativeImage} = require("electron");
const {spawn} = require('child_process');
const path = require('path');
const textToPicture = require('text-to-picture')
let tray = null;
let tray2 = null;
const si = require('systeminformation');

const createTaskbarIcon = () =>{
    tray = new Tray(__dirname + '/assets/tmp-logo.png')
    tray2 = new Tray(__dirname + '/assets/tmp-logo.png')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Close app', click: function () {
                app.quit();
            }
        }
    ])
    tray.setToolTip('Current CPU temperature')
    tray2.setToolTip('Current CPU load')
    tray.setContextMenu(contextMenu)
    setInterval(watcher,2000);

}

const watcher = () =>{
    si.currentLoad()
        .then(data =>{
            changeLoadReadout(parseInt(data.currentLoad))
        })

    let python = spawn('python', [path.join(app.getAppPath(),'python_scripts/cpuTemp.py')]);
    python.stdout.on('data', (data) => {
        changeTempReadout(parseInt(data.toString()))
    });

}
const changeLoadReadout = (load) =>{
    let cLoad = load.toString();
    textToPicture.convert({
        text: `${cLoad}`,
        source: {
            width: 165,
            height: 180
        },
        size: 128,
        color: 'white',
        quality: 100

    }).then(result => {
        return result.getBase64()
    }).then(str => {
        let image = nativeImage.createFromDataURL(str)
        tray2.setImage(image)
        //console.log("Done")
    }).catch(err => null)

}

const changeTempReadout = (temp) => {
    let tmp = temp.toString();
      textToPicture.convert({
        text: `${tmp}`,
        source: {
            width: 165,
            height: 180
        },
        size: 128,
        color: 'white',
        quality: 100

    }).then(result => {
        return result.getBase64()
    }).then(str => {
        let image = nativeImage.createFromDataURL(str)
        tray.setImage(image)
        //console.log("Done")
    }).catch(err => null)

}

module.exports = {createTaskbarIcon}