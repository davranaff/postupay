import React from 'react';
import style from './filter.module.css'
import Filter from "@/app/components/Filter/Filter";
import {filter} from "@/app/services/filter/filter";


function Index(props) {
    return (
        <div className={style.filterContent}>
            <Filter {...props}/>
        </div>
    );
}

export async function getServerSideProps() {
    let regions = await filter.getRegions().then(res => res.data).catch(e => console.log(e))
    let subjects = await filter.getSubjects().then(res => res.data).catch(e => console.log(e))
    let educationTypes = await filter.getEducationTypes().then(res => res.data).catch(e => console.log(e))
    let educationForms = await filter.getEducationForms().then(res => res.data).catch(e => console.log(e))
    let educationDegrees = await filter.getEducationDegrees().then(res => res.data).catch(e => console.log(e))

    regions = regions && regions.map(value => {
        return {...value, name: 'city'}
    })
    subjects = subjects && subjects.map(value => {
        return {...value, name: 'subject'}
    })
    educationTypes = educationTypes && educationTypes.map(value => {
        return {...value, name: 'education_type'}
    })
    educationForms = educationForms &&  educationForms.map(value => {
        return {...value, name: 'education_form'}
    })
    educationDegrees = educationDegrees && educationDegrees.map(value => {
        return {...value, name: 'degree'}
    })


    return {
        props: {
            regions,
            subjects,
            educationTypes,
            educationForms,
            educationDegrees
        }
    }
}

export default Index;