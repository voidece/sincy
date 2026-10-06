# Sincy

> Dynamic music cards for discord bots

Requires Node.js 22.12 or newer.

## Installation

```bash
npm install sincy
```

## Usage

```javascript
import { writeFileSync } from "node:fs";
import { Sincy } from "sincy";

const image = await Sincy({
  artwork: "https://example.com/image.jpg",
  title: "Starboy",
  author: "The Weeknd",
  duration: 300000,
  position: 60000,
  scale: 2,
});

writeFileSync("preview.jpg", image);
```

CommonJS also works on Node.js 22.12+:

```javascript
const { Sincy } = require("sincy");
```

# Preview

<p align="center">
<img src="https://i.imgur.com/Vp1Dm6S.png" alt="Sincy Preview" width="800">
</p>
