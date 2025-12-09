import * as path from 'path';
import * as context from './context';
import * as admiral from './admiral';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    const bin = await admiral.install(inputs.version);
    core.info(`Admiral ${inputs.version} installed successfully`);

    if (inputs.installOnly) {
      const admiralDir = path.dirname(bin);
      core.addPath(admiralDir);
      core.debug(`Added ${admiralDir} to PATH`);
      return;
    } else if (!inputs.args) {
      core.setFailed('args input required');
      return;
    }

    if (inputs.workdir && inputs.workdir !== '.') {
      core.info(`Using ${inputs.workdir} as working directory`);
      process.chdir(inputs.workdir);
    }

    await exec.exec(`${bin} ${inputs.args}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
