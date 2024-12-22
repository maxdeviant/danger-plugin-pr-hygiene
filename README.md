# danger-plugin-pr-hygiene

[![npm](https://img.shields.io/npm/v/danger-plugin-pr-hygiene.svg?maxAge=3600)](https://www.npmjs.com/package/danger-plugin-pr-hygiene)
[![CI](https://github.com/maxdeviant/danger-plugin-pr-hygiene/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/maxdeviant/danger-plugin-pr-hygiene/actions/workflows/ci.yml)

A [Danger](https://danger.systems/js/) plugin for enforcing good PR hygiene.

## Installation

```sh
npm install -D danger-plugin-pr-hygiene
```

## Usage

In your `Dangerfile`:

```ts
import { prHygiene } from "danger-plugin-pr-hygiene";

prHygiene();
```

This is a test.
