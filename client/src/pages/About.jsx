import React, { useState } from "react";
// import useClipboard from "react-use-clipboard";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import 'regenerator-runtime/runtime';  // Import regenerator-runtime

import "./About.css";  // Ensure this is the correct path

export const About = () => {
    // const [textToCopy, setTextToCopy] = useState('');
    // const [isCopied, setCopied] = useClipboard(textToCopy);
    // const startListen = () => SpeechRecognition.startListening({ continuous: true });
    // const stopListen = () => SpeechRecognition.stopListening();
    // const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // if (!browserSupportsSpeechRecognition) {
    //     return <div>Your browser does not support speech recognition software! Try Chrome desktop, maybe?</div>;
    // }

    return (
        <div className="cont2">
            <h2>Make notes with this speech to text converter</h2>
            <br/>
            <div className="main-content" >
              
            </div>
            <div className="btn-style">
                <button >
                    {/* Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"} */}
                </button>
                <button >Start Listening</button>
                <button>Stop Listening</button>
            </div>
        </div>
    );
};
