// src/components/EmailList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DialogDemo from '@/pages/dialogue'

const EmailList: React.FC = () => {
  const [emailIds, setEmailIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<string[]>('http://127.0.0.1:5000/get_emails')
      .then((response) => {
        setEmailIds(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching emails:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="">
      <h1 className="font-bold">Email List</h1>
      <ul className="">
        {emailIds.map((id) => (
          <li key={id} className="mb-2">
            <DialogDemo emailId={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;


//   return (
//     <div className="p-4">
//       <div className="flex">
//         <div className="w-1/4">
//           {emails.map(email => (
//             <div key={email.id} className="mb-2">
//               <button
//                 className="w-full bg-gray-300 p-2 rounded"
//                 onClick={() => handleProcessClick(email.id)}>
//                 {email.id}
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="w-3/4">
//           {showDialog && (
//             <div className="p-4 bg-white shadow-md rounded">
//               <h2 className="text-xl font-bold mb-4">Email Details</h2>
//               <div className="mb-2">
//                 <label className="block mb-1">APAccountRef:</label>
//                 <input
//                   type="text"
//                   name="APAccountRef"
//                   value={emailDetails.APAccountRef || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-1">VendorRef:</label>
//                 <input
//                   type="text"
//                   name="VendorRef"
//                   value={emailDetails.VendorRef || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-1">ShipTo:</label>
//                 <input
//                   type="text"
//                   name="ShipTo"
//                   value={emailDetails.ShipTo || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//                 {!emailDetails.ShipTo && <span className="text-red-500 text-sm">! Missing Detail</span>}
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-1">TotalAmt:</label>
//                 <input
//                   type="text"
//                   name="TotalAmt"
//                   value={emailDetails.TotalAmt || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block mb-1">Line:</label>
//                 <input
//                   type="text"
//                   name="Line"
//                   value={emailDetails.Line || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <button
//                 className="bg-green-500 text-white p-2 rounded"
//                 onClick={handleSubmit}>
//                 Submit
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };