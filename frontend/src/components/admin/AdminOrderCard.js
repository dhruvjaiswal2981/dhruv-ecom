import { useState } from 'react';

const AdminOrderCard = ({ order, onStatusUpdate }) => {
  const [status, setStatus] = useState(order.status);
  
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusUpdate(order.id, newStatus);
  };

  return (
    <li className="px-4 py-5 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Order #{order.id}
          </h3>
          <p className="text-sm text-gray-500">
            Customer: {order.User.name} • Total: ${order.totalAmount.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={handleStatusChange}
            className="block w-full rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
};

export default AdminOrderCard;