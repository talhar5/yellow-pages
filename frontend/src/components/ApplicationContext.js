import { createContext, useContext, useState } from "react";


const LoginContext = createContext();
const ToggleLoginContext = createContext();
const NotesContext = createContext();
const UpdateNotesContext = createContext();
const UserDetailsContext = createContext();
const UpdateUserDetailsContext = createContext();

export function ContextProvider({ children }) {
    const [userDetails, setUserDetails] = useState({});

    const [isLogin, setIsLogin] = useState(() => {
        let token = localStorage.getItem("jwtToken");
        if (token) {
            return true
        }
        return false;
    });

    function toggleLogin() {
        setIsLogin(prev => !prev)
    }

    function updateUserDetails(newDetails) {
        setUserDetails(prev => {
            return { ...prev, ...newDetails }
        })
    }
    return (
        <UpdateUserDetailsContext.Provider value={updateUserDetails}>
            <UserDetailsContext.Provider value={userDetails}>
                <LoginContext.Provider value={isLogin}>
                    <ToggleLoginContext.Provider value={toggleLogin}>
                        {children}
                    </ToggleLoginContext.Provider>
                </LoginContext.Provider>
            </UserDetailsContext.Provider>
        </UpdateUserDetailsContext.Provider>
    )
}

export const useLoginContext = () => useContext(LoginContext)
export const useToggleLoginContext = () => useContext(ToggleLoginContext)
export const useNotes = () => useContext(NotesContext);
export const useUpdateNotes = () => useContext(UpdateNotesContext);
export const useUserDetails = () => useContext(UserDetailsContext);
export const useUpdateUserDetails = () => useContext(UpdateUserDetailsContext);