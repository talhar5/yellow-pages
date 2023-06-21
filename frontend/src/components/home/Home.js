import NotesList from "../Notes/NotesList"
import SearchBar from "../searchBar/SearchBar"
import NoLogin from '../NoLogin'
import { useSelector } from "react-redux"

export default function Home() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    return (
        <>
            {
                isLoggedIn
                    ?
                    <div className=" mx-16 md:mx-6 sm:mx-6">
                        <SearchBar />
                        <NotesList />
                    </div> :
                    <NoLogin />
            }

        </>
    )
}
