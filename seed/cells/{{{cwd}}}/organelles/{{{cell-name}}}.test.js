const OrganelleJob = require('./{{{cell-name}}}')
const Plasma = require('organic-plasma')

test('executes', async () => {
  let plasma = new Plasma()
  let dna = {log: true}
  let instance = new OrganelleJob(plasma, dna)
  await instance.execute()
  instance.dispose()
})
