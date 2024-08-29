import React, { useEffect, useState } from "react";
import style from "./WrongRoute.module.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';


const WrongRoute: React.FunctionComponent = () => {
    const [rotate, setRotate] = useState(false);

    const rotateIcon = () => {
        setRotate(true);
        const timeoutID = setTimeout(() => {
            setRotate(false);
        }, 2500);
        return () => clearTimeout(timeoutID);
    }

    useEffect(() => {
        setInterval(rotateIcon, 15000);
    }, [])

    return (
        <main className={style.main}>
            <div>
                <div className="u-l1">Error 404</div>
                <p className="u-p2">Sorry, this page doesn't exist.</p>
                <Link to="/" className="button_complementary u-pb1 btn btn-primary">Go Home</Link>
            </div>
            <FontAwesomeIcon icon={faFaceFrown} className={style.icon}
            style={{transform: rotate ? 'scaleX(-1)' : 'scaleX(1)'}}/>
        </main>
    );
}

export default WrongRoute;