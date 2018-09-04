const timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test('the cell\'s cron organelle skips execution cycles properly once started', async () => {
  const Plasma = require('organic-plasma')
  const Organelle = require('../seed/cells/{{{cell-name}}}/organelles/{{{cell-name}}}')
  Organelle.prototype.execute = async () => {
    return timeout(2 * 1000)
  }
  let plasma = new Plasma()
  let dna = {
    intervalMiliseconds: 1000
  }
  let instance = new Organelle(plasma, dna)
  instance.start()
  await timeout(2 * 1100)
  expect(instance.executeCallSkipped).toBe(true)
  instance.dispose()
})
