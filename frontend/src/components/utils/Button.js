import { Button } from '@chakra-ui/react'

export default function TButton(props) {
    function handleClick(e) {
        e.preventDefault();
        if (props.onClick) {
            props.onClick(e);
        }
    }
    let darkClass = `
                    px-4
                    py-2
                    bg-gray-950
                    text-white
                    font-semibold
                    hover:bg-[#383838] 
                    rounded-md 
                    duration-200 
                    cursor-pointer 
                    ${props.className}`

    let lightClass = `
                    px-4 
                    py-2 
                    bg-white 
                    text-gray-700
                    font-semibold
                    hover:text-gray-900
                    border
                    border-gray-200 
                    rounded-md
                    hover:border-gray-600
                    duration-200 
                    cursor-pointer 
                    ${props.className}`
    return (
        <Button
            {...props}
            onClick={handleClick}
            className={props.theme === 'dark' ? darkClass : lightClass}
        >

        </Button>
    )
}
