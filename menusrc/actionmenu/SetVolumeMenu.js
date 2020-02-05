const ActionMenuItem = require('./ActionMenuItem');
const { NumberComponent, StringComponent } = require('./components');


class SetVolumeMenu extends ActionMenuItem{
    constructor(){
        super("SetVolumeAction", "Set Audiosource Volume");
        this.components.push(new StringComponent("source"));
        this.components.push(new NumberComponent("lowerBound"));
        this.components.push(new NumberComponent("upperBound"));
    }
}

module.exports = SetVolumeMenu;