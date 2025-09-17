import { ActionPanel, Action, Clipboard, Icon, showHUD } from "@raycast/api";
import fetch from "node-fetch";
import tempy from "tempy";

export async function copyUrlBlob(url: string) {
  await showHUD("Copying image...");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  const fileExtension = response.headers.get("Content-Type")?.split("/")[1];
  const filePath = await tempy.write(await response.body!, { name: "misty." + fileExtension });
  Clipboard.copy({ file: filePath });
  await showHUD("Image copied to clipboard");
}
export function MistyActions({ imageUrl }: { imageUrl: string }) {
  return (
    <ActionPanel title="Copy Image">
      <Action
        title="Copy Image"
        icon={Icon.Image}
        onAction={() => copyUrlBlob(imageUrl)}
        shortcut={{ modifiers: ["ctrl"], key: "c" }}
      />
      <Action.CopyToClipboard
        title="Copy Image URL"
        content={imageUrl}
        shortcut={{ modifiers: ["ctrl", "shift"], key: "c" }}
      />
    </ActionPanel>
  );
}
