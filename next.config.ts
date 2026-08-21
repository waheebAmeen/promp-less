const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
trailingSlash: true,
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  reactStrictMode: false,

  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'nativewind',
    'react-native-gesture-handler',
  ],
}

module.exports = withExpo(nextConfig)