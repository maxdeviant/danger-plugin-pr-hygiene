# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.6.1] - 2024-12-22

### Changed

- Updated the package version in the feedback link.

## [0.6.0] - 2024-12-22

### Changed

- Rewrote library in Gleam.
  - This has not impacted the public API in any way, and should mostly be transparent.

### Fixed

- `useImperativeMood`: Fixed a false positive for PR titles starting with "Bring".
- `useSentenceCase`: Fixed a false positive for PR titles with an inline code block containing a `:`.

## [0.5.0] - 2023-06-21

### Added

- `useImperativeMood`: Added detection of more third-person singular verbs

## [0.4.1] - 2022-11-21

### Fixed

- Fixed an issue where `io-ts` was not listed as a dependency

## [0.4.0] - 2022-11-19

### Added

- Added a feedback link to plugin output ([#6](https://github.com/maxdeviant/danger-plugin-pr-hygiene/pull/6))
- `useImperativeMood`: Added detection of more third-person singular verbs

## [0.3.0] - 2022-09-01

### Added

- Added support for rendering violations with visual indicators

### Fixed

- Fixed some false positives in `useImperativeMood`

## [0.2.0] - 2022-08-17

### Added

- Added support for processing PR titles with prefixes
- Added `useSentenceCase` rule
- Added `requirePrefix` rule

### Changed

- Simplified `useImperativeMood` to reduce false positives

### Fixed

- Fixed `noTrailingPunctuation` rule not being applied

## [0.1.0] - 2022-08-16

### Added

- Initial release

[unreleased]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.6.1...HEAD
[0.6.1]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/maxdeviant/danger-plugin-pr-hygiene/compare/3bd367b...v0.1.0
