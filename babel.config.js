module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "Antd", libraryDirectory: "es", style: "css" } //注意官网这里是style:true,这可能会导致报错。建议使用style:"css"
    ]
  ]
};
