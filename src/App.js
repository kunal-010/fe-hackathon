import { EmailsContext } from 'Context/EmailsContext'
import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { DocsContext } from 'Context/DocsContext';



function App() {

    const [emails, setEmails] = useState([]);
    const [docs,setDocs] = useState([]);

    return (
      <DocsContext.Provider value={{docs,setDocs}}>
      <EmailsContext.Provider value={{emails,setEmails}}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AdminLayout />} />
          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EmailsContext.Provider>
  </DocsContext.Provider>
  )
}

export default App