# Admiral Action
Admiral Action runs admiral cli.

### Workflow

```yaml
name: admiral

on:
  pull_request:
  push:

permissions:
  contents: write

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v4
      -
        name: Run Admiral
        uses: DataliftHQ/admiral-action@v1
        with:
          version: latest
          args: release
        env:
          ADMIRAL_API_KEY: ${{ secrets.ADMIRAL_API_KEY }}
```

### Run on new tag

If you want to run Admiral only on new tag, you can use this event:

```yaml
on:
  push:
    tags:
      - '*'
```

Or with a condition on Admiral step:

```yaml
      -
        name: Run Admiral
        uses: DataliftHQ/admiral-action@v1
        if: startsWith(github.ref, 'refs/tags/')
        with:
          version: latest
          args: release
        env:
          ADMIRAL_API_KEY: ${{ secrets.ADMIRAL_API_KEY }}
```

> For detailed instructions please follow GitHub Actions [workflow syntax](https://help.github.com/en/articles/workflow-syntax-for-github-actions#About-yaml-syntax-for-workflows).

### Install Only

```yaml
steps:
  -
    name: Install ADMIRAL_API_KEY
    uses: DataliftHQ/admiral-action@v1
    with:
      install-only: true
  -
    name: Show ADMIRAL_API_KEY version
    run: admiral -v
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name             | Type    | Default      | Description                               |
|------------------|---------|--------------|-------------------------------------------|
| `version`**¹**   | String  | `latest`     | Admiral version                          |
| `args`           | String  |              | Arguments to pass to Admiral             |
| `workdir`        | String  | `.`          | Working directory (below repository root) |
| `install-only`   | Bool    | `false`      | Just install Admiral                     |

> **¹** Can be a fixed version like `v0.1.0` or a max satisfying semver one like `~> 0.1`. In this case this will return `v0.1.1`.

### outputs

Following outputs are available

| Name        | Type | Description           |
|-------------|------|-----------------------|
| `metadata`  | JSON | Build result metadata |


### environment variables

Following environment variables can be used as `step.env` keys

| Name               | Description           |
|--------------------|-----------------------|
| `ADMIRAL_API_KEY` | Your Admiral API Key |

## Development

```
# format code and build javascript artifacts
docker buildx bake pre-checkin

# validate all code has correctly formatted and built
docker buildx bake validate

# run tests
docker buildx bake test
```