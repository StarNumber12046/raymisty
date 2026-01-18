# Misty Raycast Extension

This is a [Raycast](https://raycast.com) extension that lets you browse and view images of Misty.

## Features

- **Browse Images**: View a grid of all available Misty images.
- **Random Image**: Quickly get a random Misty image.
- **Copy Actions**: 
  - Copy the image file directly to your clipboard.
  - Copy the image URL to your clipboard.

## Commands

| Command | Description |
| --- | --- |
| `Misty Images` | Displays a paginated grid of all Misty images. |
| `Random Misty Image` | Shows a single random image of Misty. |

## How it Works

The extension fetches a list of image URLs from a remote JSON endpoint (`https://starnumber.vercel.app/misty.json`). It uses `@tanstack/react-query` for data fetching and caching.

## Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/StarNumber12046/raymisty.git
   cd raymisty
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   This will open the Raycast developer window where you can launch the extension.

## License

MIT
