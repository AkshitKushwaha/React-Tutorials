import React from 'react'
import {useState} from 'react'

export default function Content() {

  /*

  const [name, setName] = useState('Akshit');
  const [count, setCount] = useState(0);

  const handleNameChange = ()=> {
    const names = ['A', 'B', 'C'];
    const int = Math.floor(Math.random() * 3);
    setName(names[int]);
  }

  const handleClick = ()=>{
    setCount(count + 1);
    console.log(count)
  }

  
  const handleClick2 = (name)=>{
    console.log(`${name} was clicked`)
  }

  const handleClick3 = (e)=>{
    console.log(e)
  }

      <main>

  
        <p onDoubleClick={handleClick}>
          Hello {name};
        </p>

        <button onClick={handleNameChange}>Change Name</button>
        <button onClick={handleClick}>Click me 2</button>
        <button onClick={(e)=> handleClick3(e)}>Click me 3</button>

    </main>

  */

const Content = ()=> {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
      id: 2,
      checked: false,
      item: "Item 2"
    },
    {
      id: 3,
      checked: false,
      item: "Item 3"
    }
    
  ]);

}

  return (
    <main>

    </main>

  )
}

//()=> is the anonymous function