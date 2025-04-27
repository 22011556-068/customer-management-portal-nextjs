'use client'
import React from 'react'
import { useState } from 'react'
interface Customer {
    name: string;
    address: string;
    phone: string;
    email: string;
  }
 
const CustomerInput = () => {
 const[customers, setCustomers] = useState<Customer[]>([]);
 const [formatData, setFormatData] = useState({
    name:'',
    address:'',
    email:'',
    phone:'',

 });
 const [editIndex,setEditIndex] = useState<number | null>(null);
const[searchItem, setSearchItem] = useState<string>('');
 function addCustomer(e: React.FormEvent){
  e.preventDefault();
  if (!formatData.email.includes('@gmail.com') ) {
    alert('Enter a valid email!');
   
    return;
  }
  
  
    if(formatData.name && formatData.email && formatData.address && formatData.phone){
      if(editIndex !== null){
    const updatedIndex = [...customers];
    updatedIndex[editIndex] = formatData;
    setCustomers(updatedIndex);
    setEditIndex(null);
      }
      else{
        setCustomers([...customers,formatData]);
        setFormatData({ name: '', address: '', phone: '', email: '' });
      }
     
    }

  
 
  }
  function delCustomer(index:number){
    const newList = [...customers];
    newList.splice(index,1);
    setCustomers(newList);

    if(editIndex === index){
  setEditIndex(null);
  setFormatData({ name: '', address: '', phone: '', email: '' });
    }
  }
  const filteredCustomer = customers.filter(
    customer =>
  customer.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchItem.toLowerCase()) ||
    customer.phone.includes(searchItem) ||
    customer.address.toLowerCase().includes(searchItem.toLowerCase()) 
  )
function editCustomers(index:number){
   setFormatData(customers[index]);
   setEditIndex(index);
  }
  return (
    <>
   <div className="search-container">
  <input
    type="text"
    placeholder="🔎 Search customers..."
    value={searchItem}
    onChange={(e) => setSearchItem(e.target.value)}
    className="search-input"
  />
</div>
     <form onSubmit={addCustomer} >
        <div className='input-group'>
        <ul  id='user-input' >
<label htmlFor="name">Name:</label>
<input type="text"
value={formatData.name}
onChange={(e)=>setFormatData({...formatData,name:e.target.value})}
placeholder='Enter Your Name'
required
/>
</ul>
          
<ul id='user-input'  >
<label htmlFor="name">Email:</label>
<input type="text" 
value={formatData.email}
onChange={(e)=>setFormatData({...formatData,email:e.target.value})}
placeholder='abc@gmail.com...'
required
/>
</ul>
                
<ul id='user-input'  >
<label htmlFor="name">Phone:</label>
<input type="tel" 
value={formatData.phone}
onChange={(e) => {
  const onlyNumbers = e.target.value.replace(/\D/g, '');
  setFormatData({ ...formatData, phone: onlyNumbers });
}}
placeholder="03xxxxxxxx"
required
/>
</ul>
          
<ul id='user-input'  >
<label htmlFor="name">Address:</label>
<input type="text"
value={formatData.address}
onChange={(e)=>setFormatData({...formatData,address:e.target.value})}
placeholder='#streat #city'
required
/>
</ul>   
 </div>
    <button  className='btn'>
{editIndex !== null ?  'UpdateIndex' : 'Add Customers'}
    </button>
    </form>
  <ul>
  

  {filteredCustomer.map((customer, index) => (
          <ol key={index} className='todo'>
        <p>{customer.name}</p>
        <p>📧<span>{customer.email}</span></p>
         <p>📞<span>{customer.phone}</span></p>
         <p>📍<span>{customer.address}</span></p>
         <button onClick={()=>editCustomers(index)} className='dbtn'>Edit</button>
         <button onClick={()=>delCustomer(index)} className='dbtn'>Delete</button>
          </ol>
        ))}
  </ul>
    </>
   
  )
}

export default CustomerInput