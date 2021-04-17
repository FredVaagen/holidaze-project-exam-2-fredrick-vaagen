import React from 'react'

function Something() {
    return (
        <div className="block">
            <h2 className="headline">Exploring Bergen</h2>
            <style global jsx>
        {`
            .headline {
                color: black;
                font-size: 30px;
                text-align: left;
                padding-top: 1rem;
                font-weight: bold;
                
            }

        `}
      </style>
        </div>
    )
}

export default Something
