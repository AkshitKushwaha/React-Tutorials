import Header from './Header';
import AddItem from './AddItem';
import Content from'./Content';
import Footer from './Footer';
import { useState } from 'react';
import SearchItem from './SearchItem';


  function App() {

    const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
    
    const [newItem, setNewItem] = useState('');

    const [search, setSearch] = useState('');

    const setAndSaveItems = (newItems)=> {
      setItems(newItems);
      localStorage.setItem('shoppinglist', JSON.stringify(newItems));
    }

    const addItem = (item)=> {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = {id, checked: false, item};
      const listItems = [...items, myNewItem];
      setAndSaveItems(listItems);
    }
    
    const handleCheck = (id) => {
    //console.log(`key: ${id}`)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems);
    }
    
    const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
    }

    const handleSubmit = (e)=> {
      e.preventDefault();
      if (!newItem) return;
      addItem(newItem);
      setNewItem('');
    }
    
  return (
    <div className="App">

      <Header title="Grocery List"/>

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      <SearchItem
        search={search}
        setSearch={setSearch}
      />

      <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
               handleCheck={handleCheck}
               handleDelete={handleDelete}
      />

      <Footer length={items.length} />

    </div>
  );
}

export default App;

//NOTES:- 

//e means event object

/*

items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase())) explaination:-

items.filter(item => ...): This is using the filter method of the items array. The filter method creates a new array with all elements that pass the test implemented by the provided function. In this case, the function is a lambda (or arrow) function that takes an item as an argument.

(item.item).toLowerCase(): This is accessing the item property of the current item object in the array, converting it to lowercase. This is done to make the search case-insensitive.

.includes(search.toLowerCase()): This is checking if the lowercase item string includes the lowercase search string. The includes method determines whether one string may be found within another string, returning true or false as appropriate.

So, overall, this line of code is creating a new array of items that include the search term, ignoring case.


*/

