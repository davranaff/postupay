import React, {useContext, useState} from 'react';
import {UserContext} from "@/app/context/BaseContext";


function Index(props) {
    const {count, setCount} = useContext(UserContext)
    return (
        <div>
            <h1 style={{color: 'red'}}>Count: {count}</h1>
            {/*<button onClick={() => setCount(p => p + 1)}>Click</button>*/}
        </div>
    );
}

export async function getServerSideProps() {

    return {
        props: {}
    }
}

export default Index;