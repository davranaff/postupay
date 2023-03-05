import style from './profile.module.css'
import React from "react";
import Profile from "@/app/components/Profile/Profile";

function Index(props) {
    return (
        <div className={style.profile}>
            <div className={style.profileContent}>
                <Profile/>
            </div>
        </div>
    );
}

function getStaticProps() {

    return {
        props: {}
    }
}

export default Index;