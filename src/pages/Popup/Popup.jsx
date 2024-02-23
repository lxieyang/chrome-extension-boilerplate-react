import React from 'react';
import { useState, useRef } from "react";
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { BskyAgent, RichText } from '@atproto/api'



const Popup = () => {
  const [urlText, setUrlText] = useState("");
  const [text, setText] = useState("");
  const [loginId, setLoginId] = useState("");
  const [bsPassword, setBsPassword] = useState("");
  const postTextRef = useRef();
  const [postStatus, setPostStatus] = useState("-1");

  const [space, setTSpace] = useState(" ");

  if (postStatus == 0 || postStatus == 1 || postStatus == 2 || postStatus == 3) {

  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentURL = tabs[0].url;
      if (currentURL.startsWith("https://twitter.com/")) {
        chrome.storage.local.get(["bsPostText", "bslogin", "bspassword"]).then((result) => {
          setUrlText("");
          if (result.bsPostText !== undefined) {
            let text = result.bsPostText;

            var pattern = /https:\/\/[\w\d\/.?=&#-]+/g;
            var matches = result.bsPostText.match(pattern);
            if (matches) {
              setUrlText(matches[0]);
              setText(text.replace(matches, ""));
            } else {
              setText(result.bsPostText);
            }

          } else {
            setText("");
          }
          setLoginId(result.bslogin);
          setBsPassword(result.bspassword);

        });
      } else {
        chrome.storage.local.get(["bslogin", "bspassword"]).then((result) => {
          setLoginId(result.bslogin);
          setBsPassword(result.bspassword);
        });

        setUrlText(currentURL);
        setText(tabs[0].title + " ");
      }
    });
  }


  const post = async () => {
    let settingStatus = 1;
    if (settingStatus = 1) {
      const agent = new BskyAgent({
        service: 'https://bsky.social'
      })
      try {
        let result = await agent.login({
          identifier: loginId,
          password: bsPassword
        })
      } catch {
        setPostStatus(3);
      }
      let postText = postTextRef.current.value
      const rt = new RichText({
        text: postText,
      })

      await rt.detectFacets(agent);
      let postRecord;
      if (urlText.length > 0 && text.length > 0) {
        postRecord = {
          $type: 'app.bsky.feed.post',
          text: rt.text,
          facets: rt.facets,
          embed: {
            $type: 'app.bsky.embed.external',
            external: {
              uri: urlText,
              title: text,
              description: rt.text,
            }
          },
          createdAt: new Date().toISOString(),
        }
      } else {
        postRecord = {
          $type: 'app.bsky.feed.post',
          text: rt.text,
          facets: rt.facets,
          createdAt: new Date().toISOString(),
        }
      }
      try {
        await agent.post(postRecord);
        setPostStatus(1);
      } catch {
        setPostStatus(2);
      }

    }
  }


  if (postStatus == 1) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <button className="popupbutton buttonoff">ポスト完了</button>
          </p>
        </header>
      </div>
    );

  } else if (postStatus == 2) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <textarea name="post_text" className="popuptext" defaultValue={text} ref={postTextRef} />
            <br />
            リンクカード情報<br />
            <input name="post_title" className="post_title" defaultValue={text} /><br />
            <input name="post_url" className="post_url" defaultValue={urlText} />
            <br /><br />
            <button className="popupbutton buttonoff" onClick={post}>投稿失敗</button>
          </p>
        </header>
      </div>
    );

  } else if (postStatus == 3) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <textarea name="post_text" className="popuptext" defaultValue={text} ref={postTextRef} />
            <br />
            リンクカード情報<br />
            <input name="post_title" className="post_title" defaultValue={text} /><br />
            <input name="post_url" className="post_url" defaultValue={urlText} />
            <br /><br />
            <button className="popupbutton buttonoff">認証失敗</button>
          </p>
        </header>
      </div>
    );

  } else if (postStatus == 0) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <textarea name="post_text" className="popuptext" defaultValue={text} ref={postTextRef} />
            <br />
            リンクカード情報<br />
            <input name="post_title" className="post_title" defaultValue={text} /><br />
            <input name="post_url" className="post_url" defaultValue={urlText} />
            <br /><br />
            <button className="popupbutton buttonoff" onClick={post}>Blueskyにポスト</button>
          </p>
        </header>
      </div>
    );

  } else {
    setPostStatus(0);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <textarea name="post_text" className="popuptext" defaultValue={text} ref={postTextRef} />
            <br />
            リンクカード情報<br />
            <input name="post_title" className="post_title" defaultValue={text} /><br />
            <input name="post_url" className="post_url" defaultValue={urlText} />
            <br /><br />
            <button className="popupbutton buttonoff" onClick={post}>Blueskyにポスト</button>
          </p>
        </header>
      </div>
    );
  }
};

export default Popup;
