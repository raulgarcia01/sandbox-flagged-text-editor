# Angular Essay Text Utility Project

This Angular project provides a dynamic text editing interface for writing essays, with support for:

- **Text Highlighting** (partial and full word match)
- **Text Replacement** (based on search)
- **Undo** functionality
- Real-time reactive communication between components

## 📦 Features

- **PrimeNG Editor** integration
- Custom `TextUtilService` for shared actions
- Highlighting logic using `RegExp`
- HTML-safe highlight rendering
- Observable-based component communication

## 🧠 Architecture

- **EditorComponent**: Displays and edits content using `<p-editor>`. Applies highlights or replacements based on shared service triggers.
- **TextUtilService**: Handles text normalization, regex generation, and emits shared actions.
- **Payload model**: Defines structure for highlight/replace inputs.

## 🚀 Usage

## Development

To execute this project follow the next instructions:

```bash
npm install
ng serve
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```
