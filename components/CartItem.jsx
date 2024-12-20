// import React from "react";

// const CartItem = ({ item, removeItem, updateQuantity }) => {
//   return (
//     <div className="flex items-center justify-between bg-white p-4 border rounded-lg shadow-md">
//       <div className="flex items-center space-x-4">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-16 h-16 object-cover rounded-md"
//         />
//         <div>
//           <h3 className="text-lg font-semibold">{item.name}</h3>
//           <p className="text-gray-600">Price: ${item.price}</p>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//           className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           -
//         </button>
//         <span>{item.quantity}</span>
//         <button
//           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//           className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//         >
//           +
//         </button>
//         <button
//           onClick={() => removeItem(item.id)}
//           className="text-red-500 hover:text-red-600"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartItem;
