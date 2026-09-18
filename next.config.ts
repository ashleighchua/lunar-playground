import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  // pdfjs-dist's own internal dynamic import of its worker script breaks
  // under Turbopack bundling ("Setting up fake worker failed") — excluding
  // it from bundling lets it load via plain Node require at runtime instead,
  // same as it would in an unbundled script.
  //
  // @napi-rs/canvas is pdfjs-dist's own optional Node dependency (it
  // self-detects and requires it to polyfill DOMMatrix/Path2D for text
  // extraction — see node_modules/pdfjs-dist/legacy/build/pdf.mjs's
  // node_utils.js). It does that detection via
  // `createRequire(import.meta.url)` wrapped in try/catch, a pattern Vercel's
  // output file tracer can't follow statically, so its native binary
  // silently got dropped from the deployed function — pdfjs-dist loaded fine
  // but crashed the instant it touched DOMMatrix ("DOMMatrix is not
  // defined"), holding every natal-chart job for review. Adding it to
  // serverExternalPackages alone does NOT fix this (verified against a local
  // `next build` trace) — that only stops Turbopack from bundling it, it
  // doesn't make the tracer discover an untraceable dynamic require.
  // outputFileTracingIncludes below is the actual fix: it force-includes the
  // package's files (native binary included) for the workflow step route
  // regardless of what the tracer can see.
  //
  // geo-tz is the same class of gap again: it opens its timezone polygon
  // data (`data/timezones-1970.geojson.geo.dat`) at runtime via
  // `path.join(__dirname, '..', 'data')` + fs.openSync, which the tracer
  // can't follow. Bundled by Turbopack, __dirname became a "/ROOT/..."
  // placeholder and the .dat file wasn't shipped — every relocation job's
  // runFacts step failed with ENOENT on that file (order #18, 2026-09-18)
  // on a build with no config change from one that had worked two weeks
  // earlier, i.e. the builder's tracing drifted underneath us. Keeping it
  // external gives it a real __dirname; the tracing include ships the data.
  serverExternalPackages: ['pdfjs-dist', '@napi-rs/canvas', 'geo-tz'],
  // The @napi-rs/canvas glob covers the package itself plus whichever
  // platform-specific binary package (`@napi-rs/canvas-linux-x64-gnu` on
  // Vercel) npm resolved as its optionalDependency — js-binding.js picks
  // that package at runtime via process.platform/arch, another dynamic
  // require the tracer can't see on its own.
  //
  // pdf.worker.mjs hits the exact same class of gap one file over: getting
  // past DOMMatrix only revealed the next untraceable reference — pdfjs-dist
  // falls back to running its "fake worker" (no real Worker/worker_threads
  // available in this runtime) by importing pdf.worker.mjs as a plain module
  // rather than inlining it, and the tracer doesn't follow that either.
  // Confirmed live: fixing DOMMatrix alone still held the job for review,
  // now on "Cannot find module '.../pdf.worker.mjs'".
  outputFileTracingIncludes: {
    '/.well-known/workflow/v1/**': [
      './node_modules/@napi-rs/canvas*/**',
      './node_modules/pdfjs-dist/legacy/build/**',
      './node_modules/geo-tz/data/**',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/Images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withWorkflow(nextConfig);
