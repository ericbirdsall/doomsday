export default {
  explain(text) {
    if (global.explain) {
      // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
      console.log('\x1b[33m%s\x1b[0m', text);
    }
  },
  log(text) {
    console.log(text);
  }
}
