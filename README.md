# Kagi Translation Extension

<p align="center">
  <img src="./assets/banner.png" alt="Project Banner" width="80%">
</p>

## Extension

So ... do you ever get an ick of **eughh what a superficial post my friend sent on LinkedIn right now** which just devolves into nothing more than just a nothing-burger cause it mostly it is, well no worries this extension right here promises you can see right through their bullshit.

This extension is extremely lightweight infact 12kB to be precise cause less is more remember :D

## Features

| Option | Assumes selected text is | Translates to |
|---|---|---|
| To Plain English | LinkedIn speak | Plain English |
| To LinkedIn Speak | Plain English | LinkedIn speak |
 
 Straightforward no BS

## Demo

<video src="./assets/demo.mp4" controls width="100%"></video>

Pretty easy to use if you ask me

> [!IMPORTANT]
> First time using Kagi Site goes through CloudFlare verification so it can be a bit tedious at start however later uses is pretty streamlined

## Dev Setup

To get started

fork the repo

```bash
git clone https://github.com/{your-username}/kagi-translation-extension
cd kagi-translation-extension
```

```bash
bun install
```

for builds/production

```bash
# for chrome
bun run build
bun run zip
 
# for firefox
bun run build:firefox
bun run zip:firefox
```

## Tech stack

[![WXT](https://img.shields.io/badge/WXT-cross--browser-blue?logo=data:image/svg+xml;base64,PHN2Zy8+)](https://wxt.dev)
[![Vite](https://img.shields.io/badge/Vite-bundler-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

## Future

The extension itself was supposed to be integrated with the sideberry extension of Firefox however it seemed too tiresome and unfortunately with no official docs for Translator API till [now](https://github.com/kagisearch/kagi-docs/discussions/592) as of 18/03/2026

The addon for Firefox is currently put for review whereas for Chromium based websites I am not sure if I can provide support at the moment given the initial fee to contribute in chrome webstore.

You can however use the files to export in your browser of choice & also contribute to this to ensure support for all browsers and improve on any features.

### Credits

[Kagi Translate](https://translate.kagi.com/)