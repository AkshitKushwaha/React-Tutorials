import ItemList from './ItemList';

const Content = ({items, handleCheck, handleDelete}) => {


    return (
        <main>
            {items.length ? (
                <ItemList
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete} 
                />
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content


// ...item means spread out the current items
// localStorage.setItem('shoppinglist', JSON.stringify(listItems)); this data is saved in the lpcal storage
// {{ marginTop: '2rem' }} one curly brace means its an expression anothewr brace means its a style
// {items, handleCheck, handleDelete} Through prop drilling 