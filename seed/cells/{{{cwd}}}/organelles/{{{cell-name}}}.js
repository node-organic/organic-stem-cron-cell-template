const IntervalWorker = require('organic-worker-interval')

module.exports = class extends IntervalWorker {
  async execute () {
    console.log('running')
  }
}
