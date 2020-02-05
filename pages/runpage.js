const OBSConnection = require('../src/OBSConnection');
const { MidiInterpreter } = require('../src/MidiInterpreter');
const { dialog } = require('electron').remote;
const { ReadActionFile, WriteActionFile } = require('../src/ActionReaderWriter');
const path = require('path');

let obs_actions = {
    "note": [],
    "button": [],
    "dial": [],
    "control": []
};


let filepath = "";

let interpreter = new MidiInterpreter();
let connection = new OBSConnection("localhost:4444");


document.getElementById('select-file').addEventListener('click', function(){
    dialog.showOpenDialog({ title: "Configuration file", defaultPath: filepath, filters: [{name: 'JSON config file', extensions: ['json']}] }, 
    (filePaths) => {
        if(!filePaths || !filePaths[0]){
            return;
        }

        filepath = filePaths[0];
        console.log(ReadActionFile(filepath));
        let {note, button, dial, control} = ReadActionFile(filepath);
        obs_actions.note = note;
        obs_actions.button = button;
        obs_actions.dial = dial;
        obs_actions.control = control;
    });
});



document.getElementById("current-midi-id").innerText = "ID of last key pressed";

document.getElementById("portCount").textContent = interpreter.input.getPortCount() + " device(s) found";
for(let i = 0; i < interpreter.input.getPortCount(); ++i){
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = interpreter.input.getPortName(i);
    button.onclick = function(){
        interpreter.OpenPort(i);
    };

    li.appendChild(button);
    document.getElementById("ports").appendChild(li);
}

(async () => {
    
    await connection.init();

    //makes testing easier - delete for actual
    interpreter.OpenPort(0);
    filepath = path.resolve("testconfig.json");
    let {note, button, dial, control} = ReadActionFile(filepath);
    obs_actions.note = note;
    obs_actions.button = button;
    obs_actions.dial = dial;
    obs_actions.control = control;

    interpreter.on('note_pressed', (id, vel) => {
        RunAction(id, vel, 'note');
    });
    interpreter.on('button_pressed', (id, vel) => {
        RunAction(id, vel, 'button')
    });
    interpreter.on('dial_change', (id, vel) => {
        RunAction(id, vel, 'dial');
    });
    interpreter.on('control_change', (id, vel) => {
        RunAction(id, vel, 'control')
    });

})();

function RunAction(id, vel, type){
    if(obs_actions[type][id]){
        for(let action of obs_actions[type][id]){
            action.setVelocity(vel/127.0);
            connection.sendAction(action);        
        }
    }

    document.getElementById("current-midi-id").innerText = `${type} #${id}`;
}