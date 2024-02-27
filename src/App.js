import Header from './Header';
import AddItem from './AddItem';
import Content from'./Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


  function App() {

    const API_URL = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    
    const [newItem, setNewItem] = useState('');

    const [search, setSearch] = useState('');

    const [fetchError, setFetchError] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      
      const fetchItems = async ()=> {
        try {
          const response = await fetch(API_URL);
          if(!response.ok) throw Error('Failed to fetch data');
          const listItems = await response.json();
          setItems(listItems);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      setTimeout(()=> {
        (async ()=> await fetchItems())();
      }, 1000);
    }, [])

    const addItem = async (item)=> {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const myNewItem = {id, checked: false, item};
      const listItems = [...items, myNewItem];
      setItems(listItems);

      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewItem)
      };

      const result = await apiRequest(API_URL, postOptions);
      if (result) setFetchError(result);
    }
    
    const handleCheck = async (id) => {
    //console.log(`key: ${id}`)
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked})
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
    }
    
    const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);

      const deleteOptions = { method: 'DELETE'};
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
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

      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
        />}
      </main>

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

    useEffect(() => {
      console.log('load time')
    }, []) Explaination:- 

useEffect(() => {...}, []): The useEffect hook takes two arguments. The first argument is a function where you can put your side effect code. The second argument is an array of dependencies.

console.log('load time'): This is the side effect that will be run. In this case, it's just logging the string 'load time' to the console.

[]: This is the dependency array. When any of the values in this array change, the function in the first argument will be run again. In this case, the array is empty, which means the side effect will only run once after the component is first rendered (similar to componentDidMount in class components). If you wanted the effect to run every time the component re-renders, you would omit the second argument entirely.

useEffect is async in nature and runs after the component is rendered


*/

