import { Grid } from "@raycast/api";

import { useQuery } from "@tanstack/react-query";
import fetch from "node-fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MistyActions } from "./utils/actions";

// We are fetching all images to avoid caching the random one

const client = new QueryClient();

function Command() {
  const query = useQuery({
    queryKey: ["misty-images"],
    queryFn: async () =>
      await fetch("https://starnumber.vercel.app/misty.json").then(async (res) => (await res.json()) as string[]),
  });
  const imageUrl = query.data?.[Math.floor(Math.random() * query.data.length)] ?? "https://starnumber.vercel.app/misty";
  return (
    <Grid columns={1}>
      <Grid.Item
        content={{
          source: imageUrl,
        }}
        actions={<MistyActions imageUrl={imageUrl} />}
      />
    </Grid>
  );
}

export default function WrappedCommand() {
  return (
    <QueryClientProvider client={client}>
      <Command />
    </QueryClientProvider>
  );
}
