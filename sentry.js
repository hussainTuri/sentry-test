const SentryCli = require('@sentry/cli');
const { argv } = require('yargs');
//require('dotenv').config({ path: './.env.stage' });
const { env, debug } = argv;
const testSite = [
  'abrar-test',
  'allas-test'
];

pushRelease = async (site) => {
  cli = new SentryCli();
  const version = await cli.releases.proposeVersion();
  //const fl = await cli.releases.execute(['releases', 'files', '1.0.3', 'list']);
  const a = await cli.releases.execute(['releases', 'new', '-p', site, `${site}-${version}`]);
  const b = await cli.releases.execute(['releases', 'set-commits', '--auto', `${site}-${version}`]);
  const c = await cli.releases.execute(['releases', 'finalize', `${site}-${version}`]);
  const d = await cli.releases.execute(['releases', 'deploys', `${site}-${version}`,'new', '-e', env] );

  console.log(a, b, c, d);
};

(async () => {
    for (let i = 0; i < testSite.length; i++) {
      await pushRelease(testSite[i]);
    }
  }
)();

