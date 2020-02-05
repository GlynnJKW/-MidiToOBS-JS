const ActionMenuItem = require('./ActionMenuItem');
const { BoolComponent, StringComponent } = require('./components');


class SetSourceVisibilityMenu extends ActionMenuItem{
    constructor(){
        super("SetSourceVisibilityAction", "Set Source Visibility");
        this.components.push(new StringComponent("item"));
        this.components.push(new BoolComponent("visible"));
        this.components.push(new StringComponent("scene-name"));
    }
}

module.exports = SetSourceVisibilityMenu;