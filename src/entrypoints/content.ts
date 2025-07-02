export default defineContentScript({
  matches: ['*://summer.hackclub.com/shop'],
  main() {
    console.log('Hello content.');
  },
});
