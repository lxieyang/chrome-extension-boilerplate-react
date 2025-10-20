# TODOs

- ESLint
  - Add `eslint-plugin-jsx-a11y` and `eslint-plugin-import` to ESLint config
  - Merge branch `prettier-eslint` when a stable version of `prettier-eslint`
    v9 releases, to resolve conflicts between `prettier` and `eslint`
  - When it becomes stable, use the equivalent of the current
    `--flag unstable_config_lookup_from_file` command-line argument
    instead of `-c` to dynamically resolve the config file. See more at:
    [feature flags](https://eslint.org/docs/latest/flags#flag-prefixes)
- Add ESLint/Prettier Git CI integration
- Configure .hintrc
- Add tests with Playwright for Node.js
