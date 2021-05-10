import { useRouter } from 'next/router'

function feedback() {
  const router = useRouter()

  const establishment = JSON.stringify(router.query)
  console.log(establishment);

  const name = establishment.replace(/[{}""]/g, "").slice(5);
  
  console.log(name);

  return (
    <div className="contact">
      <p>Thank you for booking {name} </p> 
      <style jsx>
    {`
      .contact {
        height: 100vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 22px;
      }
      .contact p {
        
      }

    `}
    </style>
    </div>
  )
}

export default feedback;

