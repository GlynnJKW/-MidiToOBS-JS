/** 
 * @property {Array<Component>} components  - Components should be in the same order that they will be sent to the action
*/
class ActionMenuItem{
    constructor(action, desc){
        this.action = action;
        this.desc = desc;
        this.components = [];
    }

    GetFieldInfo(){
        return this.components.map(c => c.value);
    }

    get dom(){
        let dom = document.createElement('ul');
        dom.className = "action-options";
        for(let component of this.components){
            dom.append(component.dom);
        }
        return dom;
    }
}

module.exports = ActionMenuItem;