import React from 'react';

const MainContent = (props) => {
    const info = {
        bgImage: props.img,
        title: props.title,
        subtitle: props.subtitle,
        buttonText: props.button
    }
    return (
        <div
            className={"text-white relative mx-8"}>
            <div className="flex flex-col items-center py-20 z-10">
                <h1 className="text-7xl font-black tracking-tighter text-center my-8 z-10 ">{info.title}</h1>
                <h2 className="text-xl text-center my-8 z-10">{info.subtitle}</h2>
                {info.buttonText
                    ? <button
                        className="custom-animation text-center py-3 px-7 rounded-full my-4 z-10 font-black">{info.buttonText}</button>
                    : <></>
                }
            </div>
        </div>
    );
};

export default MainContent;