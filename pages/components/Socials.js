import React from 'react';
import spotify from '../../static/socials/spotify.svg'
import apple from '../../static/socials/apple.svg'
import amazon from '../../static/socials/amazon.svg'
import youtube from '../../static/socials/youtube.svg'
import tiktok from '../../static/socials/tiktok.svg'

const Socials = () => {
    const info = {
        title: "Unlimited Distribution Starting at $14.99/year",
        subtitle: "Get your music on Spotify, Apple Music, TikTok, YouTube, Tidal, Tencent and more. Keep 100% ownership of your music and stay in control of your career.",
        buttonText: "View All 150+ Stores",
        socials: [
            {
                name: "Spotify",
                img: spotify,
                href: "#"
            },
            {
                name: "Apple music",
                img: apple,
                href: "#"
            },
            {
                name: "Amazon music",
                img: amazon,
                href: "#"
            },
            {
                name: "Youtube",
                img: youtube,
                href: "#"
            },
            {
                name: "TikTok",
                img: tiktok,
                href: "#"
            }
        ]
    }
    return (
        <div
            className={"bg-neutral-900 text-white relative"}>
            <div className="flex flex-col items-center py-20 z-10">
                <h1 className="text-5xl font-black tracking-tighter text-center my-8 z-10 ">{info.title}</h1>
                <h2 className="text-xl text-center my-8 z-10">{info.subtitle}</h2>
                <div className="flex w-full justify-evenly my-8 flex-wrap">
                    {info.socials.map((social, key) => (
                        <a href={social.href} key={key}>
                            <img className="h-8 mx-2 my-4" src={social.img} alt={social.name}/>
                        </a>
                    ))}
                </div>
                <button
                    className="custom-animation text-center py-3 px-7 rounded-full my-4 z-10 font-black">{info.buttonText}</button>
            </div>
        </div>
    );
};

export default Socials;