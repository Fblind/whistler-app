import React from 'react'
import './Knowledge.css'

function Knowledge (props) {
  const knowledge = {
    title: "5 things that might surprise a JavaScript beginner/ OO Developer",
    url: "https://dev.to/itnext/5-things-that-might-surprise-a-javascript-beginner-oo-developer-1nje",
    imageUrl: "https://res.cloudinary.com/practicaldev/image/fetch/s--I_F_D4dy--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/0m2w34ggv98642iuaubw.jpeg",
    description: "JavaScript is a bit different from an OO language. Let's talk about 5 things that may confuse a JS beginner/OO developer.",
    notes: "Algunas notas para agregar"
  }

//   const knowledge = {
//     "title": "Semántica en HTML.",
//     "url": "https://fblind.github.io/es/blog/html-semantic",
//     "imageUrl": "https://fblind.github.io/images/articles/html-semantic_thumbnail.png",
//     "description": "HTML es un lenguaje simple para aprender, sin muchas complicaciones, pero hay algo muy importante que no siempre se toma tan en cuenta cuando se lo usa, la semántica.",
//     "notes": "En este articulo lalal\n"
// }

  return (
    <div>
      <img alt="" title="" src={knowledge.imageUrl} />
      <div className="article p-4">
        <h1 className="text-center text-2xl font-bold text-gray-900">{knowledge.title}</h1>
        <p className="text-sm text-indigo-600 text-center mb-6"><a href={knowledge.url}>Go to original</a></p>
        <ul>
          <li className="inline mr-2 text-sm text-gray-600"><span className="font-bold text-red-600">#</span>JavaScript</li>
          <li className="inline mr-2 text-sm text-gray-600"><span className="font-bold text-green-600">#</span>Tricks</li>
        </ul>
        <div className="mt-2">
          <h2 className="text-lg text-gray-900 font-bold">Description</h2>
          <p className="text-gray-900">{knowledge.description}</p>
          <hr className="mt-4"></hr>
        </div>
        <div className="mt-2">
          <h2 className="text-lg text-gray-900 font-bold">Notes</h2>
          <p className="text-gray-900">{knowledge.notes}</p>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  )
}

export default Knowledge