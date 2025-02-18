// import React, { useState, useEffect } from 'react';
// import './stockManagement.css';
// import axios from 'axios';

// const StockManagement = () => {
//   const [shopName, setShopName] = useState('');
//   const [productName, setProductName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [stockData, setStockData] = useState([]);
//   const [editingStockId, setEditingStockId] = useState(null);


//   // Fetch stock data
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/stock/getstock')
//       .then(response => setStockData(response.data))
//       .catch(error => console.error(error));
//   }, []);





//   const handleEditStock = (stock) => {
//     setShopName(stock.shopName);
//     setProductName(stock.stockName);
//     setQuantity(stock.quantity);
//     setPrice(stock.price);
//     setEditingStockId(stock._id); 
//   };




//   const handleDeleteStock = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/stock/deletestock/${id}`);
  
//       // Update the stock data after deletion
//       setStockData(stockData.filter(stock => stock._id !== id));
//     } catch (error) {
//       console.error('Error deleting stock', error);
//     }
//   };

  

//   const handleAddStock = async (e) => {
//     e.preventDefault();
  
//     if (!shopName || !productName || !quantity || !price) {
//       alert('Please fill all the fields');
//       return;
//     }
  
//     try {
//       const stockData = { shopName, stockName: productName, quantity, price };
  
//       if (editingStockId) {
//         // Update existing stock item
//         await axios.put(`http://localhost:5000/api/stock/updatestock/${editingStockId}`, stockData);
//       } else {
//         // Add new stock item
//         await axios.post('http://localhost:5000/api/stock/addstock', stockData);
//       }
  
//       // Refresh stock data
//       const response = await axios.get('http://localhost:5000/api/stock/getstock');
//       setStockData(response.data);
  
//       // Clear form fields
//       setShopName('');
//       setProductName('');
//       setQuantity('');
//       setPrice('');
//       setEditingStockId(null); // Reset editing state
//     } catch (error) {
//       console.error('Error adding/updating stock', error);
//     }
//   };
  


//   return (
//     <div className="stock-management-container">
//       <form className="stock-form" onSubmit={handleAddStock}>
//         <h2>Add Stock</h2>
//         <div className="dropdown-container">
//           <select
//             value={shopName}
//             onChange={(e) => setShopName(e.target.value)}
//           >
//             <option value="" selected hidden disabled>--selct--</option>
//             <option value="Shop A">Shop A</option>
//             <option value="Shop B">Shop B</option>
//             <option value="Shop C">Shop C</option>
//             <option value="Shop D">Shop D</option>
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Total Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <button type="submit">
//           {editingStockId ? 'Update Stock' : 'Add Stock'}
//         </button>

//       </form>

//       <table className="stock-table">
//         <thead>
//           <tr>
//             <th>Shop Name</th>
//             <th>Product Name</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stockData.length > 0 ? (
//             stockData.map((stock, index) => (
//               <tr key={index}>
//                 <td>{stock.shopName}</td>
//                 <td>{stock.stockName}</td>
//                 <td>{stock.quantity}</td>
//                 <td>{stock.price}</td>
//                 <td>
//                   <button className="edit-button" onClick={() => handleEditStock(stock)}>
//                     Edit
//                   </button>
//                   <button 
//                     className="delete-button" 
//                     onClick={() => handleDeleteStock(stock._id)}
//                   >Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StockManagement;











import React, { useState, useEffect } from 'react';
import './stockManagement.css';
import axios from 'axios';

const StockManagement = () => {
  const [shopName, setShopName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [stockData, setStockData] = useState([]);
  const [editingStockId, setEditingStockId] = useState(null);
  const [filterShopName, setFilterShopName] = useState(''); // State for filter value

  // Fetch stock data
  useEffect(() => {
    axios.get('http://localhost:5000/api/stock/getstock')
      .then(response => setStockData(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEditStock = (stock) => {
    setShopName(stock.shopName);
    setProductName(stock.stockName);
    setQuantity(stock.quantity);
    setPrice(stock.price);
    setEditingStockId(stock._id);
  };

  const handleDeleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stock/deletestock/${id}`);
      setStockData(stockData.filter(stock => stock._id !== id));
    } catch (error) {
      console.error('Error deleting stock', error);
    }
  };

  const handleAddStock = async (e) => {
    e.preventDefault();

    if (!shopName || !productName || !quantity || !price) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const stockData = { shopName, stockName: productName, quantity, price };

      if (editingStockId) {
        await axios.put(`http://localhost:5000/api/stock/updatestock/${editingStockId}`, stockData);
      } else {
        await axios.post('http://localhost:5000/api/stock/addstock', stockData);
      }

      const response = await axios.get('http://localhost:5000/api/stock/getstock');
      setStockData(response.data);

      setShopName('');
      setProductName('');
      setQuantity('');
      setPrice('');
      setEditingStockId(null);
    } catch (error) {
      console.error('Error adding/updating stock', error);
    }
  };

  // Filter the stock data based on shop name
  const filteredStockData = filterShopName
    ? stockData.filter(stock => stock.shopName === filterShopName)
    : stockData;

  return (
    <div className="stock-management-container">
      <form className="stock-form" onSubmit={handleAddStock}>
        <h2>Add Stock</h2>
        <div className="dropdown-container">
          <select
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          >
            <option value="" selected hidden disabled>--select--</option>
            <option value="Shop A">Shop A</option>
            <option value="Shop B">Shop B</option>
            <option value="Shop C">Shop C</option>
            <option value="Shop D">Shop D</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">
          {editingStockId ? 'Update Stock' : 'Add Stock'}
        </button>
      </form>

      {/* Filter dropdown for shop name */}
      <div className="filter-container">
        <select
          value={filterShopName}
          onChange={(e) => setFilterShopName(e.target.value)}
        >
          <option value="">All Shops</option>
          <option value="Shop A">Shop A</option>
          <option value="Shop B">Shop B</option>
          <option value="Shop C">Shop C</option>
          <option value="Shop D">Shop D</option>
        </select>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredStockData.length > 0 ? (
            filteredStockData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.shopName}</td>
                <td>{stock.stockName}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditStock(stock)}>
                    Edit
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteStock(stock._id)}
                  >Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
