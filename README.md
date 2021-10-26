# LeetCode Mistake Tracker Chrome Extension

This is a Chrome Extensions to help LeetCode users keep track of the LeetCode questions they would like to re-do in the future.

After users specified time period, the extension will remind the users to re-do the LeetCode question selected.

## User Installation

TODO

## Features

This Chrome Extension currently supports:

- **Save the re-do LeetCode questions**
![wrong_answers.png](/screenshots/wrong_answer.png?raw=true)
- **Show the list of LeetCode questions by extension popup**
![popup.png](/screenshots/popup.png?raw=true)


## Developer Installing and Running

### Procedures

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` or `yarn install` to install the dependencies.
6. Run `npm start` or `yarn start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

### Build by Docker
For step 5 and 6 above, you can use the following
```sh
npm run compose
```
or
```sh
yarn compose
```


## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.


## Contributors

<!-- readme: collaborators,contributors -start -->
<!-- readme: collaborators,contributors -end -->

## Credits

- [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)
