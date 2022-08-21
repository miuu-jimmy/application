import React from 'react';
const image ='../../static/Why_Choose_Miuu_Sm.png'

const WhyWe = () => {
    const info = {
        image: {
            img: image,
            alt: "image"
        },
        title: "Why Choose Miuu",
        content: [
            {
                subtitle: "Unlimited Worldwide Music Distribution",
                text: "Get your music playing in over 150 digital stores and streaming services across 200+ countries worldwide. Starting at $14.99/year."
            },
            {
                subtitle: "Unlimited Releases to Social Platforms",
                text: "Get your music on TikTok, YouTube, Instagram, Facebook, Reels and for no annual fee."
            },
            {
                subtitle: "Comprehensive Sales Data",
                text: "Find out exactly where fans are downloading and streaming your music so you can increase marketing efforts and plan tours around those cities."
            },
        ],
        buttonText: "Join Miuu",
    }
    return (
        <div className="flex container justify-evenly flex-wrap items-center py-8">
            <img src={String(info.image.img)} alt={info.image.alt} className="h-fit"/>
            <div className="max-w-3xl mx-4">
                <h1 className="text-5xl font-black tracking-tighter text-center my-8">{info.title}</h1>
                <div>
                    {info.content.map((item, key) => (
                        <div key={key}>
                            <h2 className="text-3xl my-8 font-black">{item.subtitle}</h2>
                            <h3 className="text-base">{item.text}</h3>
                        </div>
                    ))}
                    <button
                        className="custom-animation text-center py-3 px-7 rounded-full my-4 z-10 font-black">{info.buttonText}</button>
                </div>
            </div>
        </div>
    );
};

export default WhyWe;