import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return { url: () => "" };
  return builder.image(source);
}
