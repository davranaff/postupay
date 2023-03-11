import React from 'react';
import style from './test.module.css'
import Test from "@/app/components/Test/Test";
import {test} from "@/app/services/test/test";

function Index(props) {
    return (
        <section className={style.container}>
            <Test {...props} />
        </section>
    );
}

export async function getServerSideProps(context) {

    // let tests = await test.getTest(context.query.subject).then(res => console.log(res.data))
    let tests = await test.getTest(2).then(res => res.data)

    let data = [
        {
            id: 1,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '2+2 = 4'},
                {id: 2, checked: false, question: '2+2 = 3'},
                {id: 3, checked: false, question: '2+2 = 2'},
                {id: 4, checked: false, question: '2+2 = 1'},
            ]
        },
        {
            id: 2,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '2*2 = 4'},
                {id: 2, checked: false, question: '2*2*2 = 3'},
                {id: 3, checked: false, question: '2+2*2 = 2'},
                {id: 4, checked: false, question: '2+32 = 1'},
            ]
        },
        {
            id: 3,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '12+2 = 4'},
                {id: 2, checked: false, question: '24+2 = 3'},
                {id: 3, checked: false, question: '2+22 = 2'},
                {id: 4, checked: false, question: '28+2 = 1'},
            ]
        },
        {
            id: 4,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '12+2 = 4'},
                {id: 2, checked: false, question: '24+2 = 3'},
                {id: 3, checked: false, question: '2+22 = 2'},
                {id: 4, checked: false, question: '28+2 = 1'},
            ]
        },
        {
            id: 5,
            question: 'Lorem 123ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '121+2 = 4'},
                {id: 2, checked: false, question: '24+22 = 3'},
                {id: 3, checked: false, question: '2+22 = 2'},
                {id: 4, checked: false, question: '28+2 = 1'},
            ]
        },
        {
            id: 6,
            question: 'Lorem ipsum do123lor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '12+2 = 4'},
                {id: 2, checked: false, question: '24+2 = 3'},
                {id: 3, checked: false, question: '224+22 = 2'},
                {id: 4, checked: false, question: '28+2 = 1'},
            ]
        },
        {
            id: 7,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '12+2 = 4'},
                {id: 2, checked: false, question: '24+2 = 3'},
                {id: 3, checked: false, question: '2+22 = 2'},
                {id: 4, checked: false, question: '268+2 = 1'},
            ]
        },
        {
            id: 8,
            question: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta explicabo illum repellat. A ab asperiores commodi, eius, enim eveniet illum itaque libero mollitia quasi sit soluta tenetur vitae? Accusantium cumque eveniet harum in inventore iure minima minus molestias, nam nisi pariatur porro quia quis quisquam, recusandae, repudiandae sapiente sint ut. Ad atque aut dolorum eligendi enim eos fugiat harum illum laboriosam, libero mollitia nulla officiis possimus quae quod repellat ullam veniam veritatis vero voluptas. Et, facere, id? A alias amet at aut autem commodi consectetur consequuntur cum distinctio dolor doloremque dolores ea, est expedita facilis iusto labore libero maxime, placeat reprehenderit sequi sunt, tempora tempore ullam veniam voluptatibus voluptatum! Accusantium architecto debitis, eligendi, expedita explicabo illo inventore ipsam laborum nihil perspiciatis reiciendis sapiente, tempore ullam! Dolore dolorum, iusto magni necessitatibus perspiciatis quo totam. Aut, culpa, nemo? Aperiam, delectus doloribus error explicabo illo incidunt nobis quasi repellat, reprehenderit sint sit vel.',
            options: [
                {id: 1, checked: false, question: '112+2 = 4'},
                {id: 2, checked: false, question: '24+2 = 3'},
                {id: 3, checked: false, question: '23+22 = 2'},
                {id: 4, checked: false, question: '28+2 = 1'},
            ]
        },
    ]

    data = data.map(value => ({...value, done: false}))
    const questions = tests.answers.map(value => console.log(JSON.parse(value)))

    return {
        props: {
            data: data,
            tests: tests,
            questions
        }
    }
}

export default Index;