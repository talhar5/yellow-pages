import NotesList from "./NotesList"
import SearchBar from "./SearchBar"
import { useLoginContext } from "./ApplicationContext"
import NoLogin from './NoLogin'

export default function Home() {
    const isLogin = useLoginContext();
    return (
        <>
            {
                isLogin
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
