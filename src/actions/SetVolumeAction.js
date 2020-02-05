const OBSAction = require('./OBSAction');

class SetVolumeAction extends OBSAction{
    /**
     * Sends a request to set source item visibility
     * @param {string} source            - the name of the source to modify
     * @param {number} [lowerBound]      - the lower bound of the volume (default 0)
     * @param {number} [upperBound]      - the upper bound of the volume (default 1)
     */
    constructor(source, lowerBound, upperBound){
        super();
        this.name = "SetVolume";
        this.menu = "SetVolumeMenu";
        this.action = "SetVolumeAction";

        this.properties = {
            source: source,
            volume: 0,
            lowerBound: lowerBound,
            upperBound: upperBound
        };
    }

    setVelocity(vel){
        let scale = this.properties.lowerBound + vel * (this.properties.upperBound - this.properties.lowerBound);
        this.properties.volume = Math.pow(scale, 3);
    }
}

module.exports = SetVolumeAction;