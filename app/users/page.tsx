import React from 'react'

interface User {
  id: number;//listing the properties of the user that we acquired from the json data
  name: string;
  email: string;
}
const UserPage = async() => {
    const res=await fetch('https://jsonplaceholder.typicode.com/users', {next: {revalidate: 10}}); //fetching the data from the API, in a periodic basis. 
    const users: User[]= await res.json();
  return(
    <main className="p-5 bg-slate-200 text-black rounded-lg">
      {/* Main container with padding, background color, text color, and rounded corners */}
      <h1 className="text-2xl font-bold mb-4">Users Details</h1>
      {/* Table container with overflow for responsiveness */}
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        {/* Table header */}
        <thead>
        <tr>
          <th className="py-2 px-4 bg-amber-950 text-white rounded-tl-lg">Name</th>
          {/* Table header cell for Name, with background and text color */}
          <th className="py-2 px-4 bg-amber-900 text-white rounded-tr-lg hover:bg-amber-900 hover:text-amber-200">Email</th>
          {/* Table header cell for Email */}
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id} className="even:bg-slate-100">
          {/* Table row, alternate rows have a different background */}
            <td className="py-2 px-4 border border-black-600">{user.name}</td>
          {/* Table cell for user name */}
          <td className="py-2 px-4 border border-black-600">{user.email}</td>
          {/* Table cell for user email */}
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}

export default UserPage