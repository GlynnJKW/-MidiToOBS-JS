const OBSAction = require('./OBSAction');

class SetSceneAction extends OBSAction{
    /**
     * Sends a request to set the current scene
     * @param {string} scene            - what scene to switch to
     */
    constructor(scene){
        super();
        this.name = "SetCurrentScene";
        this.menu = "SetSceneMenu";
        this.action = "SetSceneAction";

        this.properties = {"scene-name": scene};
    }
}

module.exports = SetSceneAction;