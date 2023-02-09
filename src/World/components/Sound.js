export class Sound {

    audioElement;
    
    constructor(audioElementName) {
        this.audioElement = document.getElementById( audioElementName );
        console.log('this.audioElement :: ', this.audioElement);
    }

    createSound() {
        return this;
    }

}