import React, {useContext, useState} from 'react';
import {UserContext} from "@/app/context/BaseContext";
import Commerce from "@/pages/Commerce";


function Index(props) {
    const {count, setCount} = useContext(UserContext)
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(p => p+1)}>Click</button>

            <Commerce />
        </div>
    );
}

export async function getServerSideProps() {

    return {
        props: {}
    }
}

export default Index;