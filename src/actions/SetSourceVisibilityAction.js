const OBSAction = require('./OBSAction');

class SetSourceVisibilityAction extends OBSAction{
    /**
     * Sends a request to set source item visibility
     * @param {string} source           - the name of the source to modify
     * @param {boolean} visibility      - whether the source should be visible or not
     * @param {string} [scene]          - optional, what scene to modify the source in
     */
    constructor(source, visibility, scene){
        super();
        this.name = "SetSceneItemProperties";
        this.menu = "SetSourceVisibilityMenu";
        this.action = "SetSourceVisibilityAction";

        this.properties = {item: source, visible: visibility};
        if(scene){
            this.properties["scene-name"] = scene;
        }
    }
}

module.exports = SetSourceVisibilityAction;