import { createContext } from 'react';
import Index from 'views/Index';

export const EmailsContext = createContext({
    emails: [],
    setEmails: (email) => {}
});