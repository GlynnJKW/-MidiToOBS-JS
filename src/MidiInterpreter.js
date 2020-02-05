const midi = require('midi');
const { EventEmitter } = require('events');

class MidiInterpreter extends EventEmitter{

    constructor(){
        super();
        this.input = new midi.input();
        this.port = null;
    }

    OpenPort(portNumber){
        if(portNumber < 0 || portNumber > this.input.getPortCount()){
            return;
        }
        else{
            this.ClosePort();
            this.port = portNumber;
            //workaround - can't reuse input, so have to delete and create new
            delete(this.input);
            this.input = new midi.input();
            this.input.on('message', (deltaTime, message) => {
                this.Interpret(message);
            });
            this.input.openPort(portNumber);
        }
    }

    ClosePort(){
        if(this.port !== null){
            this.input.closePort();
        }
    }

    Interpret(message){
        let status = message[0];
        let data1 = message[1];
        let data2 = message[2];

        switch(status){
            //Note pressed
            case 144:
                this.emit('button_pressed', data1, data2);
                break;
            case 145:
                this.emit('note_pressed', data1, data2);
                break;

            //Note released
            case 128:
                this.emit('button_released', data1, data2);
                break;
            case 129:
                this.emit('note_released', data1, data2);
                break;

            //Control change
            case 176:
                this.emit('dial_change', data1, data2);
                break;
            case 177:
                this.emit('control_change', data1, data2);
                break;

        }
    }
}

module.exports = { MidiInterpreter }