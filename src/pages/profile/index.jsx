import style from './profile.module.css'
import React from "react";
import Profile from "@/app/components/Profile/Profile";
import axios from "axios";

function Index({check}) {
    return (
        <div className={style.profile}>
            <div className={style.profileContent}>
                <Profile check={check}/>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    let check = false

    if (context.query.save) {
        check = true
        return {
            props: {
                check: check,
            }
        }
    }

    return {
        props: {
            check: check,
        }
    }
}

export default Index;