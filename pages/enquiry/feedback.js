import React from 'react'
import { useRouter } from 'next/router'

function feedback() {
  const router = useRouter()

  const establishment = JSON.stringify(router.query)
  console.log(establishment);

  const name = establishment.replace(/[{}""]/g, "").slice(5);
  
  console.log(name);

  return (
    <div className="contact">
      <h1 className="headline">Thank you for booking {name} </h1> 
      <style jsx>
    {`
      .contact {
        height: 70vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .contact h1 {
      }

    `}
    </style>
    </div>
  )
}

export default feedback;

