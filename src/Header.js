import React from 'react'

//Through de-structuring:-

export default function Header({ title }) {

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: "Default Title"
}


/*

OR

export default function Header(props) {

  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}

*/