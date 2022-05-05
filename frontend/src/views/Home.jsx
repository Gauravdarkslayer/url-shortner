import React from "react";
import ServiceRoutes from "../services";

export default function Home() {
    const [shortUrl, setShortUrl] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [error, setError] = React.useState('');
    const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;

    async function createShortUrl() {
        
        if (url.match(urlRegex)) {
            setError('');
            let response = await ServiceRoutes.shortenUrl({url});
            if (response.data.status === 200) {
                setShortUrl(response.data.data.shortUrl);
            }
        } else {
            setError('Please enter a valid url');
        }
    }

    return (
        <div className="site-wrapper">
            <div className="site-wrapper-inner">
                <div className="main-container">
                    <div className="inner cover">
                        <span className="glyphicon glyphicon-link"></span>
                        <h1>URL Shortener</h1>
                        <h4>Paste your website url below</h4>

                        <div className="row">

                            <div className="col-lg-12">
                                <div className="input-group input-group-lg">
                                    <input id="url-field"
                                        type="text"
                                        className="form-control"
                                        placeholder="Paste a link..."
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                    <span className="input-group-btn">
                                        <button className="btn btn-shorten" type="button" onClick={createShortUrl}>SHORTEN</button>
                                    </span>
                                </div>
                                {error && <span className="text-danger" style={{float:"left"}}>{error}</span>}
                            </div>

                            <div className="col-lg-12">
                                <div id="link">
                                    <a href={shortUrl} target="_blank">{shortUrl}</a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}