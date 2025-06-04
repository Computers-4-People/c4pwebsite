import React from "react";
import DonationProgressBar from '../components/DonationProgressBar';

const scrollToForm = () => {
    document.getElementById("donate-form").scrollIntoView({ behavior: "smooth" });
};

export default function Support() {
    return (
        <div id="main-content">
            <div className="bg-gray-100 py-20 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
                    <div className="w-[360px] h-[640px] rounded-3xl overflow-hidden shadow-lg border border-gray-300">
                        <iframe
                            width="360"
                            height="640"
                            src="https://www.youtube.com/embed/DK6dEwQuCMQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                    <div className="text-left space-y-6 max-w-xl">
                    <h1 className="text-4xl font-bold">Jack, Will You Join Us?</h1>
<p className="text-lg">
    We’re raising $2 million to donate 40,000 computers, build a nationwide model, and launch Granson, your AI grandson that teaches people how to use a computer.
</p>
<p className="text-lg">
    At Computers 4 People, we’ve already delivered thousands of refurbished devices, over 5 million hours of internet, and digital skills training across NJ, NYC, and MA.
</p>
<p className="text-lg">
    With your support we can close the digital divide nationwide.
</p>
<button
    onClick={scrollToForm}
    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
>
    Help Us Make It Happen
</button>

                    </div>
                </div>
            </div>

            <DonationProgressBar />

            <div style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.jpeg')`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="bg-fixed">
                <iframe
                    scrolling="no"
                    aria-label='Donate Form'
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src='https://forms.zohopublic.com/Computers4People/form/DonateForm/formperma/-oOB6dH1UA3fpQV30XIgZNSyj7TFVh19ptZh_AebFWk'
                    id="donate-form"
                ></iframe>
            </div>
        </div>
    );
}
