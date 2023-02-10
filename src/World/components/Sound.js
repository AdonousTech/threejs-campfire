export class Sound {

    audioElement;
    
    constructor(audioElementName) {
        this.audioElement = document.getElementById( audioElementName );
    }

    createSound() {
        return this;
    }

}