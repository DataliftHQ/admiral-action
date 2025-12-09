import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as admiral from '../src/admiral';

describe('install', () => {
  it('acquires v0.1.0 version of Admiral', async () => {
    const bin = await admiral.install('v0.1.0');
    expect(fs.existsSync(bin)).toBe(true);
  }, 100000);

  it('acquires latest version of Admiral', async () => {
    const bin = await admiral.install('latest');
    expect(fs.existsSync(bin)).toBe(true);
  }, 100000);

  it('acquires latest v0 version of Admiral', async () => {
    const bin = await admiral.install('~> v0');
    expect(fs.existsSync(bin)).toBe(true);
  }, 100000);
});
