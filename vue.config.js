module.exports = {
  devServer: {
    port:8082,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Adjust the target to your API server
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  transpileDependencies: [],
};