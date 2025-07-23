# Contract Lot Sizer Chrome Extension

A lightweight toolbar popup that lets futures traders quickly calculate contract sizing and dollar risk for a position.  Supports **hard** and **soft** stop‑loss distances and ½ R / Full R position sizing.

---

## Features

* 🔢 **Real, floor & ceiling contract size**
* 🎛️ **½ R / Full R toggle** for risk per trade
* 🎯 **Hard & optional soft stop‑loss** in points (soft stop must be smaller than hard stop)
* 💸 Works with any symbol—defaults include **MNQ (\$2/pt)**
---

## Installation (developer mode)

1. **Clone or download** this folder so it contains:

   ```
   manifest.json
   popup.html
   popup.js
   popup.css
   icons/16.png  icons/48.png  icons/128.png
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Toggle **Developer mode** on (top‑right).
4. Click **Load unpacked** and choose the extension folder.
5. A new icon appears in the toolbar—click it to open the popup.

> **Tip:** Any time you edit the code, click **Reload** on the extension card to see changes.

---

## Usage

1. Select a **symbol** (sets \$/pt).
2. Enter your **Risk per Trade (R)**.
3. Pick **½ R** or **Full R**.
4. Enter a **Hard Stop‑Loss** in points (required).
5. Optionally enter a **Soft Stop‑Loss** in points (must be < hard stop).
6. Hit **Calculate**.  Results show:

   * Real Contract Size (fractional)
   * Fixed Size (Floor) + Risk at floor size
   * Fixed Size (Ceiling) + Risk at ceiling size
   * Fixed Size (Soft) – one less than floor size (only if soft stop provided)

---

## Customising

### Add more symbols

Edit **`popup.html`** and add new `<option>` lines inside the `<select id="symbol">` element:

```html
<option value="5">MES – $5/pt</option>
<option value="50">CL – $50/pt</option>
```

The `value` attribute should equal the contract’s dollar value per point.

### Change default icons

Replace the PNGs in the **`icons/`** folder with your own artwork (same filenames/sizes), or edit `manifest.json` to point to differently named files.

---

## License

MIT – see `LICENSE` for details.
