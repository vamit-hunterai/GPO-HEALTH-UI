/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render privacy page
 * Associated Route/Usage: /privacy
*/

import React from 'react'
import "./styles.css";

const Privacy = () => {
    return (
        <div>
            <header id="header" style={{marginLeft: '0px'}}>
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
                                <h1>Privacy Policy </h1>
                            </header>
                            <p className="lead">
                            About this cookie policy
                            This Cookie Policy explains what cookies are and how we use them. You should read this policy to understand what cookies are, how we use them, the types of cookies we use i.e, the information we collect using cookies and how that information is used and how to control the cookie preferences. For further information on how we use, store and keep your personal data secure, see our Privacy Policy.
                            </p>
                            <p>You can at any time change or withdraw your consent from the Cookie Declaration on our website.</p>
                            <p>Learn more about who we are, how you can contact us and how we process personal data in our Privacy Policy.</p>
                            <p>Your consent applies to the following domains: test2.solvous.co.uk</p>

                            <p>Your current state: Consent Accepted. Allow all cookies (Necessary, Non Necessary). Manage your consent.</p>
                                                        
                            <h4>What are cookies ?</h4>
                            <p>Cookies are small text files that are used to store small pieces of information. The cookies are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make the website more secure, provide better user experience, and understand how the website performs and to analyze what works and where it needs improvement.</p>
                            
                            <h4>How do we use cookies ?</h4>
                            <p>As most of the online services, our website uses cookies first-party and third-party cookies for a number of purposes. The first-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.</p>
                            <p>The third-party cookies used on our websites are used mainly for understanding how the website performs, how you interact with our website, keeping our services secure, providing advertisements that are relevant to you, and all in all providing you with a better and improved user experience and help speed up your future interactions with our website.</p>

                            <h4>What types of cookies do we use ?</h4>
                            <p>The cookies used on our website are grouped into the following categories.</p>

                            <h4>Necessary</h4>
                            <p>Necessary cookies are absolutely essential for the website to function properly. This category only includes cookies that ensures basic functionalities and security features of the website. These cookies do not store any personal information.</p>
                            
                            <h4>Non Necessary</h4>
                            <p>Any cookies that may not be particularly necessary for the website to function and is used specifically to collect user personal data via analytics, ads, other embedded contents are termed as non-necessary cookies. It is mandatory to procure user consent prior to running these cookies on your website.</p>
                            
                            <h3>The below list details the cookies used in our website.</h3>
                            <table>
                                <thead>
                                    <tr><th>COOKIE</th><th>DESCRIPTION</th></tr>
                                    <tr><th>Necessary</th><th></th></tr>
                                </thead>
                                <tbody>
                                    <tr><th>viewed_cookie_policy</th><th>The cookie is set by the GDPR Cookie Consent plugin and is used to store whether or not user has consented to the use of cookies. It does not store any personal data.</th></tr>    
                                    <tr><th>cookielawinfo-checkbox-necessary</th><th>This cookie is set by GDPR Cookie Consent plugin. The cookies is used to store the user consent for the cookies in the category “Necessary”.</th></tr>
                                    <tr><th>cookielawinfo-checkbox-non-necessary</th><th>This cookie is set by GDPR Cookie Consent plugin. The cookies is used to store the user consent for the cookies in the category “Non Necessary”.</th></tr>    
                                    <tr><th>Non Necessary</th><th></th></tr>
                                    <tr><th>test_cookie</th><th></th></tr>
                                </tbody>   
                            </table>
                            
                            <p></p>
                            <h4>How can I control the cookie preferences ?</h4>
                            <p>You can manage your cookies preferences by clicking on the “Settings” button and enabling or disabling the cookie categories on the popup according to your preferences.</p>                         
                            <p>Should you decide to change your preferences later through your browsing session, you can click on the “Privacy & Cookie Policy” tab on your screen. This will display the consent notice again enabling you to change your preferences or withdraw your consent entirely.</p>
                            <p>In addition to this, different browsers provide different methods to block and delete cookies used by websites. You can change the settings of your browser to block/delete the cookies. To find out more out more on how to manage and delete cookies, visit wikipedia.org, www.allaboutcookies.org.</p>
                            
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

export default Privacy
