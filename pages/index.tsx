import React from 'react';
import MainContent from "./components/MainContent";
import Socials from "./components/Socials";
import WhyWe from "./components/WhyWe";

const MainPage = () => {
    return (
        <div className="bg-neutral-900 text-white">
            <MainContent title="Sell Your Music Worldwide"
                         subtitle="Get your music on Spotify, Apple Music, TikTok, YouTube, Tidal, Tencent and more Keep 100% ownership of your music and stay in control of your career. Unlimited Releases starting at $14.99/year."
                         button="Sign up now"
            />
            <Socials/>
            <WhyWe/>
            <MainContent title="How to Sell Your Music Online"
                         subtitle="Before TuneCore, artists needed a label to get their music sold online. In 2006, we disrupted the industry by partnering directly with Digital Stores to allow any musician to sell their songs worldwide. Today, TuneCore is the world's leading digital music aggregator. Choose an unlimited distribution plan, upload your music, and we'll do the rest. Your music will hit top digital stores, like Spotify and Apple Music, in no time."
            />
        </div>
    );
};

export default MainPage;