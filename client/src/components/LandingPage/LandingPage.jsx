import React from 'react'
import {Link} from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="bg">
            <div >
            <h1 className="title">Dogs House</h1>
            </div>
            <div className="outer button">
                <Link to='/home'>
                <button target='_blank'>E N T E R</button>
                <span></span>
                <span></span>
                </Link>
            </div>
        </div>
    )
}
