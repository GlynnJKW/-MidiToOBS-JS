const MenuItems = require('./index');

class ActionMenu{
    constructor(){
        let dom = document.createElement('div');
        dom.className = "action-menu";


        let items = [];

        for(let item in MenuItems){
            let obj = new (MenuItems[item])();
            items.push(obj);

            let itemText = document.createElement('a');
            itemText.innerText = obj.desc;
            dom.appendChild(itemText);

            itemText.onclick = () => {this.optionClicked(obj)};
        }

        this.dom = dom;
    }

    optionClicked(option){
        console.log(option);
    }
}

module.exports = ActionMenu;