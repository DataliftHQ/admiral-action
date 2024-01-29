import {describe, expect, it} from '@jest/globals'
import * as github from '../src/github'

describe('getRelease', () => {
  it('returns latest Admiral GitHub release', async () => {
    const release = await github.getRelease('latest')
    expect(release).not.toBeNull()
    expect(release?.tag_name).not.toEqual('')
  })

  it('returns v0.1.0 Admiral GitHub release', async () => {
    const release = await github.getRelease('v0.1.0')
    expect(release).not.toBeNull()
    expect(release?.tag_name).toEqual('v0.1.0')
  })

  it('returns v0.1.0 for version range Admiral GitHub release', async () => {
    const release = await github.getRelease('~> 0.1')
    expect(release).not.toBeNull()
    expect(release?.tag_name).toEqual('v0.1.0')
  })

  it('unknown Admiral release', async () => {
    await expect(github.getRelease('foo')).rejects.toThrow(
      new Error(
        'Cannot find Admiral release foo in https://releases.datalift.dev/admiral/tags.json'
      )
    )
  })
})
