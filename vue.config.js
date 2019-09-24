module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/variables.scss";
        `,
      },
    },
  },
};
