import React from 'react';
import useToken from '../../hooks/useToken.js';
import cl from './FAQ.module.scss';
import profilepage from '../../assets/profilepage.png';
import addpostbutton from '../../assets/addpostbutton.png';
import post from '../../assets/post.png'
const FAQ = () => {
    useToken();
    return (
        <div className={cl.faq}>
            <div className={cl.faqMain}>
                <div className={cl.faqMainTitle}>Hi! here's some info about app and developers!</div>
                <div className={cl.faqQuestions}>
                    <div className={cl.faqQuestionitem}>
                        <div className={cl.faqQuestion}>What do I need this app for?</div>
                        <div className={cl.faqAnswer}>
                            This app is created to share your photos in general feed with other users! Moreover, you can share your emotions writing comments, and giving likes to others!
                        </div>
                    </div>
                    <div className={cl.faqQuestionitem}>
                    <div className={cl.faqQuestion}>How use this app?</div>
                        <div className={cl.faqAnswer}>
                            <div className={cl.faqAnswerText}>First of all go to the your profile page</div>
                            <div className={cl.imgWrapper+' '+cl.profileFAQtool}><img src={profilepage} alt="" /></div>
                            <div className={cl.faqAnswerText}>Then click this button to add post</div>
                            <div className={cl.imgWrapper}><img src={addpostbutton} alt="" /></div>
                            <div className={cl.faqAnswerText}>Finally, you can see your photo in the feed</div>
                            <div className={cl.imgWrapper}><img src={post} alt="" /></div>
                        </div>
                    </div>
                    <div className={cl.faqQuestionitem}>
                        <div className={cl.faqQuestion}>Who is developers?</div>
                        <div className={cl.faqAnswer}>
                           Developers are two enthusiastic students of NAU "KHAI". Backend developer O.Cherevkov and the frontend developer is V.Grashchenko.<br/> You can see our code on github <a className={cl.faqLink} href="https://github.com/grwadl/imageSocialNetwork">Frontend</a> <a className={cl.faqLink} href="https://github.com/oleksandrcherevkov/PhotoAppApi">Backend</a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default FAQ;