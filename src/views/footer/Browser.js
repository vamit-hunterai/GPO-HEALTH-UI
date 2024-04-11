/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render privacy page
 * Associated Route/Usage: /privacy
*/

import React from 'react'
import "./styles.css";

const Browser = () => {
    return (
        <div>
            <header id="header" style={{ marginLeft: '0px' }}>
                <div className="center-block">
                    <div className="logo">
                        <a href="/#">
                            <img src="logo-full.png" alt="hunter-ai" />
                        </a>
                    </div>
                </div>
            </header>

            <div className="content padded">
                <div className="container-fluid col-wrap">
                    <div className="row-fluid">
                        <div className="span8">
                            <header className="page-header">
                                <h1>Browser Support </h1>
                            </header>
                            <div>
                                <p>HunterAI Apps supports the following browsers</p>
                               
                                <p>We support the current and previous major releases of Chrome, Edge and Safari on a rolling basis. Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.</p>
                               
                               <p>Only supported browsers can be used to access hunter-ai apps  – all others may result in an error message and an inability to proceed.</p>
                               
                                <div><a href="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads" target="_blank" rel="noreferrer">
                                    <img src="/img/logo-ie.jpg" alt="https://support.microsoft.com/en-us/help/17621/internet-explorer-downloads" style={{ margin: '5px' }} /></a><br /></div>
                                <div>Internet Explorer - for PC, Mac &amp; Linux</div>
                                <div><em>(click icon to download for free)</em></div>
                                <div>  ​  ​ ​</div>
                                <div> </div>
                                <div><br /></div>
                                <div><strong>Other Browsers:</strong></div>
                                <div><br /></div>
                                <div style={{ textAlign: 'left' }}><a href="https://www.google.com/chrome/browser/desktop/index.html" target="_blank" rel="noreferrer" >
                                    <img src="/img/logo-chrome.png" alt="https://www.google.com/chrome/browser/desktop/index.html" style={{ margin: '5px' }} /></a><br /></div>
                                <div>Google Chrome - for PC, Mac &amp; Linux</div>
                                <div><em>(click icon to download for free)</em></div>
                                <div><br /></div>
                                <div><a href="https://www.mozilla.org/en-US/firefox/new/?f=118" target="_blank" rel="noreferrer" >
                                    <img src="/img/logo-firefox.jpg" alt="https://www.mozilla.org/en-US/firefox/new/?f=118" style={{ margin: '5px' }} /></a><br /></div>
                                <div>Mozilla Firefox - for PC, Mac &amp; Linux</div>
                                <div>(click icon to download for free)​<br /></div>
                                <div><br /></div>
                                <div><a href="https://support.apple.com/downloads/safari" target="_blank" rel="noreferrer" >
                                    <img src="/img/logo-safari.png" alt="https://support.apple.com/downloads/safari" style={{ margin: '5px' }} /></a><br /></div>
                                <div>Apple Safari - for Mac</div>
                                <div><em>(click icon to download for free)</em><br /></div>
                                <p>​<br /></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer" style={{ marginLeft: '0px', position: 'fixed' }}>
                <div className="center-block">
                    <p className="copyright">© HunterAI 2024</p>
                </div>
            </footer>
        </div>
    )
}

export default Browser
