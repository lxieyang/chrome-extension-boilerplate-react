# LeetCode Mistake Tracker Chrome Extension

This is a Chrome Extensions to help LeetCode users keep track of the LeetCode questions they would like to re-do in the future.

After users specified time period, the extension will remind the users to re-do the LeetCode question selected.

## User Installation

Install the extension from [here](https://chrome.google.com/webstore/detail/leetcode-mistake-tracker/gdkafhifmmkcifpdcfbppiieckgfpjbb)

## Features

This Chrome Extension currently supports:

- **Save the re-do LeetCode questions**
![wrong_answers.png](/screenshots/wrong_anwser_button_update.png?raw=true)
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
<table>
<tr>
    <td align="center">
        <a href="https://github.com/arctdav">
            <img src="https://avatars.githubusercontent.com/u/93011580?v=4" width="100;" alt="arctdav"/>
            <br />
            <sub><b>Arctdav</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/architec">
            <img src="https://avatars.githubusercontent.com/u/32494274?v=4" width="100;" alt="architec"/>
            <br />
            <sub><b>Architec</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/lxieyang">
            <img src="https://avatars.githubusercontent.com/u/16089305?v=4" width="100;" alt="lxieyang"/>
            <br />
            <sub><b>Michael Xieyang Liu</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Ayush0730">
            <img src="https://avatars.githubusercontent.com/u/68139755?v=4" width="100;" alt="Ayush0730"/>
            <br />
            <sub><b>Ayush Jain</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/GeekaholicLin">
            <img src="https://avatars.githubusercontent.com/u/13808849?v=4" width="100;" alt="GeekaholicLin"/>
            <br />
            <sub><b>Void</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/lakshya8066">
            <img src="https://avatars.githubusercontent.com/u/73181332?v=4" width="100;" alt="lakshya8066"/>
            <br />
            <sub><b>Lakshya8066</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/raulrusu88">
            <img src="https://avatars.githubusercontent.com/u/10065009?v=4" width="100;" alt="raulrusu88"/>
            <br />
            <sub><b>Raul Rusu</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Sukhija-Aniket">
            <img src="https://avatars.githubusercontent.com/u/79650434?v=4" width="100;" alt="Sukhija-Aniket"/>
            <br />
            <sub><b>Sukhija-Aniket</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/VasekS">
            <img src="https://avatars.githubusercontent.com/u/23295673?v=4" width="100;" alt="VasekS"/>
            <br />
            <sub><b>Vaclav Sekret</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/whyang0808">
            <img src="https://avatars.githubusercontent.com/u/40038303?v=4" width="100;" alt="whyang0808"/>
            <br />
            <sub><b>Yang Wei Hao</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ghousahmed">
            <img src="https://avatars.githubusercontent.com/u/25761034?v=4" width="100;" alt="ghousahmed"/>
            <br />
            <sub><b>Ghous Ahmed</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->

## Credits

- [chrome-extension-boilerplate-react](https://github.com/lxieyang/chrome-extension-boilerplate-react)
