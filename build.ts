const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './out',
  // target: "bun", // default: browser
  splitting: true,
  // sourcemap: "external", // enable for debugging
  minify: true,
  external: [],
  naming: {
    entry: '[dir]/[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]',
  }
  // publicPath: 'https://cdn.example.com/',
})
/*
result.
  outputs
  success
  logs
*/

if (!result.success) {
  console.error("Build failed");
  for (const message of result.logs) {
    // Bun will pretty print the message object
    console.error(message);
  }
}