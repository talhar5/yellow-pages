
export default function InputField(props) {
    let darkClass = `          
                    appearance-none
                    text-lg
                    p-3
                    border
                    rounded-md
                    w-full
                    placeholder:px-2
                    focus:border-gray-300 
                    focus:outline-none
                    ${props.className}`

    let lightClass = `          
                    appearance-none
                    text-lg
                    p-3
                    border
                    rounded-md
                    w-full
                    placeholder:px-2
                    focus:border-gray-400 
                    focus:outline-none
                    ${props.className}`
    return (
        <input
            {...props}
            className={props.theme === 'dark' ? darkClass : lightClass}
        />
    )
}
