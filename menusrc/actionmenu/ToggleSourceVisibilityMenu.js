const ActionMenuItem = require('./ActionMenuItem');
const { StringComponent } = require('./components')

class ToggleSourceVisibilityMenu extends ActionMenuItem{
    constructor(){
        super("ToggleSourceVisibilityAction", "Toggle Source Visibility");
        this.components.push(new StringComponent("item"));
        this.components.push(new StringComponent("scene-name"));
    }
}

module.exports = ToggleSourceVisibilityMenu;