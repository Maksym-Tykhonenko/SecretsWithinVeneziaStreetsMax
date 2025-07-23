import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SecretsWithinVeneziaLoadingBar = () => {
    const dimensions = Dimensions.get('window');

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: transparent;
                overflow: hidden;
            }

            .loader {
                height: 30px;
                display: inline-block;
            }

            .loader > div {
                width: 10px;
                height: 10px;
                border-radius: 100%;
                box-shadow: 0 0 10px orange;
                background: #FFECBA;
                float: left;
                margin: 5px;
                transform: scale(2);
            }

            .loader > div:nth-child(1) {
                animation: anm-BL-53-move1 1s infinite linear;
            }

            .loader > div:nth-child(2) {
                animation: anm-BL-53-move2 1s infinite linear;
                animation-delay: 0.2s;
            }

            .loader > div:nth-child(3) {
                animation: anm-BL-53-move3 1s infinite linear;
                animation-delay: 0.3s;
            }

            .loader > div:nth-child(4) {
                animation: anm-BL-53-move4 1s infinite linear;
                animation-delay: 0.4s;
            }

            .loader > div:nth-child(5) {
                animation: anm-BL-53-move5 1s infinite linear;
                animation-delay: 0.5s;
            }

            @keyframes anm-BL-53-move1 {
                50% {
                    background: #FFBB00;
                    transform: scale(1);
                }
            }

            @keyframes anm-BL-53-move2 {
                50% {
                    background: #FFBB00;
                    transform: scale(1);
                }
            }

            @keyframes anm-BL-53-move3 {
                50% {
                    background: #FFBB00;
                    transform: scale(1);
                }
            }

            @keyframes anm-BL-53-move4 {
                50% {
                    background: #FFBB00;
                    transform: scale(1);
                }
            }

            @keyframes anm-BL-53-move5 {
                50% {
                    background: #FFBB00;
                    transform: scale(1);
                }
            }
        </style>
    </head>
    <body>
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </body>
    </html>
    `;

    return (
        <View style={{
            width: dimensions.width * 0.8,
            height: dimensions.height * 0.1,
            alignSelf: 'center',
            flex: 1,
        }}>
            <WebView
                source={{ html: htmlContent }}
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                }}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                scalesPageToFit={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}
                mixedContentMode="compatibility"
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
            />
        </View>
    );
};

export default SecretsWithinVeneziaLoadingBar;