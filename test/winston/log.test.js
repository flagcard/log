const fs = require('fs');
const path = require('path');
const log = require('../../index');

describe('Log', () => {
  const directory = 'log';
  after(() => {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      fs.unlinkSync(path.join(directory, file));
    });
  });
  it('Log format structure for info level', () => {
    const MESSAGE = 'this is a simple INFO message';
    log.info(MESSAGE);
    const files = fs.readdirSync(directory).filter(file => file.startsWith('info-'));
    const content = fs.readFileSync(path.join(directory, files[0]), 'utf8');
    expect(content.startsWith('[INFO]')).to.be.equal(true);
    expect(content.indexOf(MESSAGE) > -1).to.be.equal(true);
  });
  it('Log format structure for error level', () => {
    const MESSAGE = 'this is a simple ERROR message';
    log.error(MESSAGE);
    const files = fs.readdirSync(directory).filter(file => file.startsWith('error-'));
    const content = fs.readFileSync(path.join(directory, files[0]), 'utf8');
    expect(content.startsWith('[ERROR]')).to.be.equal(true);
    expect(content.indexOf(MESSAGE) > -1).to.be.equal(true);
  });
});
