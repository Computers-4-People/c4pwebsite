import React from "react";
import BackgroundImage from '../background.jpg';
export default function Homepage() {
    console.log(BackgroundImage);
    return (
        <div>
            <div style={{backgroundImage: `url('${BackgroundImage}')`}} className="bg-cover h-screen bg-clip-border bg-center bg-cover bg-relative bg-local bg-no-repeat">
                <div class="font-mono text-justify absolute inset-x-20 inset-y-60 center text-8xl">
                    <div class='text-green-800'>TRANSFORM A LIFE</div>
                    <div class='text-white'>WITH TECHNOLOGY</div>
                </div>
            </div>
            <div>
                10,000,000 hours of connectivity provided
            </div>
        </div>
    )
}