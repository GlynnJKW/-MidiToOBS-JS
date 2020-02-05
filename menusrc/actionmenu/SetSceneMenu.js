const ActionMenuItem = require('./ActionMenuItem');
const { StringComponent } = require('./components');


class SetSceneMenu extends ActionMenuItem{
    constructor(){
        super("SetSceneAction", "Set Current Scene");
        this.components.push(new StringComponent("scene-name"));
    }
}

module.exports = SetSceneMenu;