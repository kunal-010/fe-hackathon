import { createContext } from 'react';
import Index from 'views/Index';

export const DocsContext = createContext({
    docs: [],
    setDocs: (doc) => {}
});