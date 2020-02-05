/**
 * @property {string} name              - the name of the request being made
 * @property {object} properties        - the properties that will be sent as part of the request
 * @property {function} callback        - the action taken when data is returned
 */
class OBSAction{
    constructor(){
        this.name = "";
        this.properties = {};
    }

    /**
     * 
     * @param {number} vel The velocity of the action
     */
    setVelocity(vel){

    }

    /**
     * Is a getter because needs to be dynamically generated based on properties
     * Returns a function that accepts two params: data (response from request) and the existing connection
     */
    get callback(){
        return function(data, connection){};
    }
}

module.exports = OBSAction;