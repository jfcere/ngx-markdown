# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **BREAKING (dependency metadata):** `clipboard`, `emoji-toolkit`, `katex`, `mermaid`, and `prismjs` are no longer `optionalDependencies`. They are now **optional `peerDependencies`** with `peerDependenciesMeta.optional: true`, so they are not installed by default when you add ngx-markdown. Install the packages you use when enabling syntax highlight, emoji, math, diagrams, or the clipboard button. See the [README](README.md#installation) and plugin sections for the usual `npm install` commands.
