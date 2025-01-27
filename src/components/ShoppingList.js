import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useState(() =>{
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
  }, [])

  function handleAddItem(newItem) {
    setItems((prevItems) => [... prevItems,newItem])
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }
    
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory} onCategoryChange={setSelectedCategory}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
