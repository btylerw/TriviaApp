import React, {createContext} from "react";

export const UserContext = createContext({
    hasChoice: false, 
    setChoice: () => {},
  });

export function UsertProvider({children}) {
    const [hasChoice, setChoice] = useState(false); // Add this line
    return (
        <UserContext.Provider value={{hasChoice, setChoice}}>
            {children}
        </UserContext.Provider>
    )
}
