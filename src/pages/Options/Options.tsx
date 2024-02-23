import React from 'react';
import './Options.css';
import { useState, useRef } from "react";
import { BskyAgent } from '@atproto/api'

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [login, setLogin] = useState("");
  const [loginStatus, setLoginStatus] = useState(0);
  const [bspassword, setBspassword] = useState("");
  const agent = new BskyAgent({
    service: 'https://bsky.social'
  })
  chrome.storage.local.get(["bslogin", "bspassword"]).then((result) => {
    if (result.bslogin !== undefined) {
      setLogin(result.bslogin);
    } else {
      setLogin("未設定");
    }
    if (result.bspassword !== undefined) {
      setBspassword(result.bspassword);
    } else {
      setBspassword("*******");
    }
  });


  const loginRef = useRef();
  const passwordRef = useRef();


  const loginIdChange = (e) => {
    setLogin(e.target.value)
    setLoginStatus(0);
  }

  const passwordChange = (e) => {
    setBspassword(e.target.value)
    setLoginStatus(0);
  }

  const loginCheckButton = async () => {
    try {
      let result = await agent.login({
        identifier: loginRef.current.value,
        password: passwordRef.current.value
      })
      setLoginStatus(1);
    } catch {
      console.log("認証失敗");
      setLoginStatus(2);
    }
  }
  const loginSettingSave = () => {
    try {
      chrome.storage.local.set({ "bslogin": loginRef.current.value }, function () {
        //console.log(textString);
      });

      chrome.storage.local.set({ "bspassword": passwordRef.current.value }, function () {
        //console.log(textString);
      });
      setLoginStatus(3);
    } catch {
      console.log("保存失敗");
      setLoginStatus(0);
    }

  }

  if (loginStatus == 0) {
    return (
      <>
        <div className="OptionsContainer">{title} Page</div>
        <br />
        <div className="optionRow"><div className="optionTitle box">ログインアドレス</div><div className="box"><input type="text" className="inputBox" name="login" defaultValue={login} ref={loginRef} onChange={loginIdChange}></input></div></div><br />
        <div className="optionRow"><div className="optionTitle box">パスワード</div><div className="box"><input type="password" className="inputBox" name="password" defaultValue={bspassword} ref={passwordRef} onChange={passwordChange}></input></div></div><br />

        <div className="optionRow"><button className="optionButton notauth" onClick={loginCheckButton}>BlueSkyログイン確認</button></div>
      </>
    );
  } else if (loginStatus == 1) {
    return (
      <>
        <div className="OptionsContainer">{title} Page</div>
        <br />
        <div className="optionRow"><div className="optionTitle box">ログインアドレス</div><div className="box"><input type="text" className="inputBox" name="login" defaultValue={login} ref={loginRef} onChange={loginIdChange}></input></div></div><br />
        <div className="optionRow"><div className="optionTitle box">パスワード</div><div className="box"><input type="password" className="inputBox" name="password" defaultValue={bspassword} ref={passwordRef} onChange={passwordChange}></input></div></div><br />

        <div className="optionRow"><button className="optionButton auth">Bluesky認証済み</button></div>

        <div className="optionRow"><button className="optionButton buttonoff" onClick={loginSettingSave}>保存</button></div>
      </>
    );
  } else if (loginStatus == 2) {
    return (
      <>
        <div className="OptionsContainer">{title} Page</div>
        <br />
        <div className="optionRow"><div className="optionTitle box">ログインアドレス</div><div className="box"><input type="text" className="inputBox" name="login" defaultValue={login} ref={loginRef} onChange={loginIdChange}></input></div></div><br />
        <div className="optionRow"><div className="optionTitle box">パスワード</div><div className="box"><input type="password" className="inputBox" name="password" defaultValue={bspassword} ref={passwordRef} onChange={passwordChange}></input></div></div><br />

        <div className="optionRow"><button className="optionButton autherror" onClick={loginCheckButton}>BlueSky認証失敗</button></div>
      </>
    );
  } else if (loginStatus == 3) {
    return (
      <>
        <div className="OptionsContainer">{title} Page</div>
        <br />
        <div className="optionRow"><div className="optionTitle box">ログインアドレス</div><div className="box"><input type="text" className="inputBox" name="login" defaultValue={login} ref={loginRef} onChange={loginIdChange}></input></div></div><br />
        <div className="optionRow"><div className="optionTitle box">パスワード</div><div className="box"><input type="password" className="inputBox" name="password" defaultValue={bspassword} ref={passwordRef} onChange={passwordChange}></input></div></div><br />
        <div className="optionRow"><button className="optionButton buttonoff" onClick={loginSettingSave}>保存済み</button></div>
      </>
    );
  }
};

export default Options;
