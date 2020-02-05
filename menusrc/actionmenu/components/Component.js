let componentID = 0;

/**
 * 
 */
class Component{
    constructor(name){
        this.name = name;
        this.id = ++componentID;
    }

    /**
     * 
     * @param {string} str string to convert into html
     * @returns {Node} list of nodes
     */
    CreateFromString(str){
        let template = document.createElement('template');
        template.innerHTML = str.replace(/{{name}}/g, this.name).replace(/{{id}}/g, this.id).trim();
        return template.content.cloneNode(true);
    }
}

module.exports = Component;