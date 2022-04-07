import React from 'react'


const style={
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"50vh",
}

export default function DisplayMessage({message}) {
  return (
    <div style={style}>
        <h2 className='fw-600'>{message}</h2>
    </div>
  )
}
