module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
          config.resolve.fallback.fs = false;
          config.resolve.fallback.module = false;
      }
      return config;
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    env: {
      FIREBASE_PROJECT_ID: "startgnv-dev"
    }
  };