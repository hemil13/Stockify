import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './priceListManagement.css';

function PriceList() {
  const [productName, setProductName] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [price250g, setPrice250g] = useState('');
  const [price500g, setPrice500g] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [originalPriceListData, setOriginalPriceListData] = useState([]);
  const [priceListData, setPriceListData] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery ] = useState('');

  const sortByProductNameAsc = () => {
    setPriceListData([...priceListData].sort((a, b) => a.productName.localeCompare(b.productName)));
  };

  const sortByProductNameDesc = () => {
    setPriceListData([...priceListData].sort((a, b) => b.productName.localeCompare(a.productName)));
  };

  const sortByCategoryAsc = () => {
    setPriceListData([...priceListData].sort((a, b) => a.category.localeCompare(b.category)));
  };

  const sortByCategoryDesc = () => {
    setPriceListData([...priceListData].sort((a, b) => b.category.localeCompare(a.category)));
  };




  const handleSearchChange = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  if (query.trim() === '') {
    setPriceListData(originalPriceListData); // Reset to original data if search is empty
  } else {
    const filteredData = originalPriceListData.filter(item =>
      item.productName.toLowerCase().includes(query)
    );
    setPriceListData(filteredData);
  }
};





  // Fetch price data from backend
  const fetchPriceList = async () => {
  try {
    const response = await axios.get('https://stockify-sw2u.vercel.app/api/price/getprice');
    setOriginalPriceListData(response.data);
    setPriceListData(response.data); // Keep both states in sync
  } catch (error) {
    console.error('Error fetching price data:', error);
  }
};


  useEffect(() => {
    fetchPriceList();
  }, []);

  // Handle form submission (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newPriceData = {
      productName,
      category,
      pricePerKg,
      price250g,
      price500g,
      wholesalePrice,
      costPrice,
    };
  
    try {
      if (editingItem) {
        // If editing, send PUT request
        await axios.put(`https://stockify-sw2u.vercel.app/api/price/updateprice/${editingItem}`, newPriceData);
        setEditingItem(null); // Reset editing state after update
      } else {
        // If adding a new price, send POST request
        await axios.post('https://stockify-sw2u.vercel.app/api/price/addprice', newPriceData);
      }
  
      setProductName('');
      setCategory('');
      setPricePerKg('');
      setPrice250g('');
      setPrice500g('');
      setWholesalePrice('');
      setCostPrice('');
      fetchPriceList();
    } catch (error) {
      console.error('Error adding/updating price data:', error);
    }
  };
  

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://stockify-sw2u.vercel.app/api/price/deleteprice/${id}`);
      fetchPriceList();
    } catch (error) {
      console.error('Error deleting price data:', error);
    }
  };

  const handleEdit = (item) => {
    setProductName(item.productName);
    setCategory(item.category);
    setPricePerKg(item.pricePerKg);
    setPrice250g(item.price250g);
    setPrice500g(item.price500g);
    setWholesalePrice(item.wholesalePrice);
    setCostPrice(item.costPrice);
    setEditingItem(item._id); // Store the ID to update the correct item
  };
  

  return (
    <div className="price-list-management-container">
      {/* Price List Form */}
      <div className="price-list-form">
        <h2>Price List Management</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          <div className="dropdown-container">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" selected hidden disabled>--select--</option>
              <option value="Cat A">Cat A</option>
              <option value="Cat B">Cat B</option>
              <option value="Cat C">Cat C</option>
              <option value="Cat D">Cat D</option>
            </select>
          </div>
          <input type="number" placeholder="Price per Kg" value={pricePerKg} onChange={(e) => setPricePerKg(e.target.value)} required />
          <input type="number" placeholder="Price per 250g" value={price250g} onChange={(e) => setPrice250g(e.target.value)} required />
          <input type="number" placeholder="Price per 500g" value={price500g} onChange={(e) => setPrice500g(e.target.value)} required />
          <input type="number" placeholder="Wholesale Price" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} required />
          <input type="number" placeholder="Cost Price" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
          <button type="submit">{editingItem ? "Update Price" : "Add Price"}</button>

        </form>
      </div>


      <div className="search-container">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="sorting-buttons">
        <button onClick={sortByProductNameAsc}>Sort by Product Name (A-Z)</button>
        <button onClick={sortByProductNameDesc}>Sort by Product Name (Z-A)</button>
        <button onClick={sortByCategoryAsc}>Sort by Category (A-Z)</button>
        <button onClick={sortByCategoryDesc}>Sort by Category (Z-A)</button>
      </div>

      {/* Price List Table */}
      <div className="price-list-table">
        <h3>Price List</h3>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Price per Kg</th>
              <th>Price per 250g</th>
              <th>Price per 500g</th>
              <th>Wholesale Price</th>
              <th>Cost Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {priceListData.length > 0 ? (
              priceListData.map((item) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.pricePerKg}</td>
                  <td>{item.price250g}</td>
                  <td>{item.price500g}</td>
                  <td>{item.wholesalePrice}</td>
                  <td>{item.costPrice}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PriceList;
