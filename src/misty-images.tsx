import { Grid } from "@raycast/api";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import fetch from "node-fetch";
import { useState } from "react";
import { MistyActions } from "./utils/actions";

const client = new QueryClient();
const PAGE_SIZE = 15;

function Command() {
  const query = useQuery({
    queryKey: ["misty-images"],
    queryFn: async () =>
      await fetch("https://starnumber.vercel.app/misty.json").then(async (res) => (await res.json()) as string[]),
  });

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const images = query.data ?? [];

  const pagedImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <Grid
      columns={3}
      pagination={{
        pageSize: PAGE_SIZE,
        hasMore,
        onLoadMore: () => setVisibleCount((prev) => prev + PAGE_SIZE),
      }}
    >
      <Grid.Section title="Images" columns={5}>
        {pagedImages.map((item, index) => (
          <Grid.Item key={index} content={{ source: item }} actions={<MistyActions imageUrl={item} />} />
        ))}
      </Grid.Section>
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
