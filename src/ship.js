class ship{
    #hitCounter = 0
    #sunk = false
    #length

    constructor(length){
        this.#length = length
    }

    hit(){
        this.#hitCounter += 1
    }

    isSunk(){
        if(this.#hitCounter == this.#length) this.#sunk = true
        return this.#sunk
    }

    // Get functions
    getHitCounter(){
        return this.#hitCounter
    }

}

export {ship}