// @ts-check

/** @type {import('next').NextConfig} */
export default (phase, { defaultConfig }) => {
  const nextConfig = {
    // Suas configurações aqui, por exemplo:
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
    experimental: {
      webpackBuildWorker: true,
      parallelServerBuildTraces: true,
      parallelServerCompiles: true,
    },
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development', // Evita ativar o PWA em ambiente de desenvolvimento
    },
    // Adicione outras configurações do Next.js conforme necessário
  }

  return nextConfig
}
