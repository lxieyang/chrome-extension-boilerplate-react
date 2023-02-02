This is a Chrome extension that allows you to quickly generate question/answer pairs via GPT-3 and add them to your Anki deck while browsing the web.

To use it:

Before installing extension:
1. Install and configure anki-connect plugin for your desktop Anki client (ankiweb does not provide API access so this is necessary to programmatically insert cards).
2. Obtain an OpenAI API Key if you do not already have one

Installing extension:
1. npm install
2. npm run dev (you can cancel after the build folder is generated)
3. go to chrome://extensions, click "load unpacked" button and use the build folder from this repo as the directory to use.
4. Set the OpenAI key, anki-connect API key, and name of your anki deck in the options page of the Chrome extension (right click on options picture, or see the "Settings" button when you bring it up by selecting text - click on the messages to fill them in)

There was a problem with the production webpack build that I couldn't resolve, so I am just using the dev version for now. I will aim to fix it at some point

Happy prompt making!

Video of it in action: https://twitter.com/i/status/1621025729013239813


This uses the React Chrome Extension template by Michael Xieyang Liu | [Website](https://lxieyang.github.io) and code from https://github.com/yewsiang/tailwind-react-chrome-extension-template to make Tailwind work
