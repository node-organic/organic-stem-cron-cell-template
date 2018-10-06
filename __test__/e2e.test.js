const path = require('path')
const os = require('os')
const execa = require('execa')
const terminate = require('terminate')
const generateCore = require('organic-stem-core-template')

let tempDir = path.join(os.tmpdir(), 'test-stack-upgrade-' + Math.random())

const timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

beforeAll(async () => {
  jest.setTimeout(60 * 1000)
  await generateCore({
    destDir: tempDir,
    answers: {
      'project-name': 'test'
    }
  })
})

test('stack upgrade', async () => {
  jest.setTimeout(60 * 1000)
  let execute = require('../index')
  await execute({
    destDir: tempDir,
    answers: {
      'cell-name': 'testcell',
      'intervalMiliseconds': 1000,
      'cell-groups': ['test'],
      'cwd': 'crons/testcell'
    }
  })
})

test('the cell works', async () => {
  let cmds = [
    'cd ' + tempDir + '/cells/crons/testcell',
    'npm run develo'
  ]
  let child = execa.shell(cmds.join(' && '))
  let buffer = ''
  child.stdout.on('data', (chunk) => {
    buffer += chunk.toString()
  })
  child.stderr.pipe(process.stderr)
  await timeout(2 * 1000)
  terminate(child.pid, 'SIGINT')
  await timeout(3 * 1000)
  expect(buffer).toContain('running')
  expect(buffer).toContain('terminating')
})

test('the cell\'s test works', async () => {
  let cmds = [
    'cd ' + tempDir + '/cells/crons/testcell',
    'npm run test'
  ]
  let {stdout} = await execa.shell(cmds.join(' && '))
  expect(stdout).toContain('running')
  expect(stdout).toContain('terminating')
})
