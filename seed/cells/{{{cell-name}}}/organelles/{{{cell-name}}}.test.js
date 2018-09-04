const OrganelleJob = require('./{{{cell-name}}}')
const Plasma = require('organic-plasma')

test('executes', async () => {
  let plasma = new Plasma()
  let dna = {}
  let instance = new OrganelleJob(plasma, dna)
  await instance.execute()
  instance.dispose()
})

test('starts and disposes', async () => {
  let plasma = new Plasma()
  let dna = {}
  let instance = new OrganelleJob(plasma, dna)
  instance.start()
  instance.dispose()
})
