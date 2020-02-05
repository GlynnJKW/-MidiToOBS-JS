const OBSWebSocket = require("obs-websocket-js");

class OBSConnection{
    constructor(address){
        this.connectionAddress = address;
        this.connection = new OBSWebSocket();
    }

    async init(){
        await this.connection.connect({address: this.connectionAddress}).catch(error => console.log(error));
        return this;
    }

    async sendAction(action){
        await this.connection.send(action.name, action.properties)
            .then(data => action.callback(data, this))
            .catch(error => {
                console.log(error);
            });
    }
}

module.exports = OBSConnection;