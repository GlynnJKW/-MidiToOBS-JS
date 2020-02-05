const OBSConnection = require('../src/OBSConnection');
const Actions = require('../src/actions');
const { MidiInterpreter } = require('../src/MidiInterpreter');
const ActionMenu = require('../menusrc/actionmenu/ActionMenu');
const ActionMenus = require('../menusrc/actionmenu');
const { dialog } = require('electron').remote;
const { ReadActionFile, WriteActionFile } = require('../src/ActionReaderWriter');
const path = require('path');

let obs_actions = {
    "note": [],
    "button": [],
    "dial": [],
    "control": []
};
let editingActions = [];


let filepath = "";
let currentMidi = "None";
let currentType = "button";


let connection = new OBSConnection("localhost:4444");
let interpreter = new MidiInterpreter();



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

document.getElementById('save').addEventListener('click', function(){
    dialog.showSaveDialog({ title: "Configuration file", defaultPath: filepath, filters: [{name: 'JSON config file', extensions: ['json']}] }, 
    (filepath) => {
        if(!filepath){
            return;
        }

        WriteActionFile(filepath, obs_actions);
    });
});



document.getElementById("current-midi-id").innerText = "Press a key to edit its actions";



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
    // let {note, button, dial, control} = ReadActionFile(filepath);
    // obs_actions.note = note;
    // obs_actions.button = button;
    // obs_actions.dial = dial;
    // obs_actions.control = control;

    interpreter.on('note_pressed', (id, vel) => {
        OpenAction(id, 'note');
    });
    interpreter.on('button_pressed', (id, vel) => {
        OpenAction(id, 'button')
    });
    interpreter.on('dial_change', (id, vel) => {
        OpenAction(id, 'dial');
    });
    interpreter.on('control_change', (id, vel) => {
        OpenAction(id, 'control')
    });



    let menu = new ActionMenu();
    document.getElementById('action').appendChild(menu.dom);
    menu.optionClicked = (action) => EditAction(action);
})();



function OpenAction(id, type){
    obs_actions[currentType][currentMidi] = [];
    for(let action of editingActions){
        let props = action.GetFieldInfo();
        obs_actions[currentType][currentMidi].push(new (Actions[action.action])(...props));
    }

    ClearEdit();

    let actions = obs_actions[type][id];
    if(actions){
        for(let action of actions){
            let menudom = EditAction(new (ActionMenus[action.menu])());
            for(let prop in action.properties){
                let val = action.properties[prop];
                let element = menudom.querySelector(`input[name="${prop}"]`);
                if(element){
                    if(typeof val == "string" || typeof val == "number"){
                        element.value = val;
                    }
                    else if(typeof val == "boolean"){
                        element.checked = val;
                    }
                }
            }
        }
    }

    currentMidi = id;
    currentType = type;
    document.getElementById("current-midi-id").innerText = `${type} #${id}`;
}



function EditAction(actionmenu){
    let dom = actionmenu.dom;
    document.getElementById("actions").appendChild(dom);

    editingActions.push(actionmenu);
    
    return dom;
}

function ClearEdit(){
    let options = document.getElementById('actions');
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
    editingActions = [];
}