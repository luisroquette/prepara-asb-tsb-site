const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};
