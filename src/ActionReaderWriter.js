const fs = require('fs');
const Actions = require('./actions');

function ReadActionFile(filepath){
    let filetext = fs.readFileSync(filepath);
    let json = JSON.parse(filetext);

    let actions = {
        "note": [],
        "button": [],
        "dial": [],
        "control": []
    }

    for(let jsonAction of json.actions){
        //get correct class from Actions
        let actionClass = Actions[jsonAction.action]

        //create blank action and set properties correctly
        let action = new actionClass();
        action.properties = jsonAction.properties;
        if(!actions[jsonAction.type][jsonAction.id]){
            actions[jsonAction.type][jsonAction.id] = [];
        }
        actions[jsonAction.type][jsonAction.id].push(action);
    }

    return actions;
}

function WriteActionFile(filepath, actions){
    console.log(actions);
    jsonActions = [];
    for(let type in actions){
        console.log(type, actions[type]);
        if(!actions[type]){
            continue;
        }
        for(let [id, typeActions] of actions[type].entries()){
            console.log(typeActions);
            if(typeActions){
                for(let action of typeActions){
                    console.log(action);
                    let a = {
                        "properties": action.properties,
                        "action": action.action,
                        "type": type,
                        "id": id
                    };
                    jsonActions.push(a);            
                }
            }
        }    
    }

    let json = JSON.stringify({actions: jsonActions}, null, 2);
    console.log(filepath);
    return fs.writeFileSync(filepath, json);
}

module.exports = { ReadActionFile, WriteActionFile };