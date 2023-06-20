import { Button } from '@chakra-ui/react'

export default function TButton(props) {
    console.log(props.disabled)
    function handleClick(e) {
        e.preventDefault();
        if (props.onClick) {
            props.onClick(e);
        }
    }

    let commonStyles = `px-4
                        py-2
                        font-semibold
                        duration-200 
                        rounded-md
                        cursor-pointer 
                        disabled:cursor-default
                        ${props.className}
                        `;
    let darkClass = `  
                    bg-gray-950
                    text-white
                    hover:bg-[#383838]
                    disabled:bg-[#444444]
                    `

    let lightClass = `
                    bg-white 
                    text-gray-700
                    hover:text-gray-900
                    border
                    border-gray-200 
                    hover:border-gray-600
                    `
    return (
        <Button
            {...props}
            onClick={handleClick}
            className={props.theme === 'dark'
                ?
                `${commonStyles} ${darkClass}`
                :
                ` ${commonStyles} ${lightClass}`}
        >

        </Button>
    )
}
