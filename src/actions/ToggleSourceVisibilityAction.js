const OBSAction = require('./OBSAction');
const SetSourceVisibilityAction = require('./SetSourceVisibilityAction');

class ToggleSourceVisibilityAction extends OBSAction{
    /**
     * 
     * @param {string} source 
     * @param {string} [scene] 
     */
    constructor(source, scene){
        super();
        this.name = "GetSceneItemProperties";
        this.menu = "ToggleSourceVisibilityMenu";
        this.action = "ToggleSourceVisibilityAction";

        this.properties = {item: source};
        if(scene){
            this.properties["scene-name"] = scene;
        }

    }

    get callback(){
        return (data, connection) => {
            let setvis = new SetSourceVisibilityAction(this.properties.item, !data.visible, this.properties["scene-name"]);
            connection.sendAction(setvis);
        }
    }

}

module.exports = ToggleSourceVisibilityAction;