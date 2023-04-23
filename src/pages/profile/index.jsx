import style from './profile.module.css'
import React from "react";
import Profile from "@/app/components/Profile/Profile";

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

    if (context.query.save) {
        return {
            props: {
                check: true,
            }
        }
    }

    return {
        props: {
            check: false,
        }
    }
}

export default Index;