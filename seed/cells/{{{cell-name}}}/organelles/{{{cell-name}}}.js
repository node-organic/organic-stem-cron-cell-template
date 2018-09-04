module.exports = class {
  constructor (plasma, dna) {
    this.plasma = plasma
    this.dna = dna
    this.running = false
    this.executeLock = null
    this.intervalID = null
    this.exceptionThrown = null
    this.executeCallSkipped = false

    plasma.on(dna.disposeOn || 'kill', this.dispose, this)
    plasma.on(dna.startOn || '{{{cell-name}}}JobStart', this.start, this)
    if (dna.startOnInitialization) {
      this.start()
    }
  }
  start () {
    if (this.running) return console.warn('already started')
    this.running = true
    this.intervalID = setInterval(() => {
      if (this.executeLock) {
        this.executeCallSkipped = true
        return console.warn('skipping execute call, still in execution cycle!')
      }
      this.executeLock = this.execute()
      this.executeLock.then(() => {
        this.executeLock = null
        this.executeCallSkipped = false
      })
    }, this.dna.intervalMiliseconds)
  }
  async execute () {
    console.log('running') // TODO add your cron execute logic
  }
  dispose () {
    console.log('terminating')
    if (this.intervalID) {
      clearInterval(this.intervalID)
    }
    this.intervalID = null
    this.running = false
  }
}
