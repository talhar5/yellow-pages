import { IoCheckmarkCircle } from 'react-icons/io5'
export default function PasswordGuide({ password, isPasswordTyping }) {
    // for password length
    let passwordCount = password.length >= 8
        ?
        <span className='text-gray-900'><IoCheckmarkCircle className='inline' /></span>
        :
        <span className='text-gray-400'><IoCheckmarkCircle className='inline' /></span>
    // if the password contains at least one numeric value
    let numericValue = /\d/.test(password)
        ?
        <span className='text-gray-900'><IoCheckmarkCircle className='inline' /></span>
        :
        <span className='text-gray-400'><IoCheckmarkCircle className='inline' /></span>
    // if the password contains at least one numeric value
    let upperAlphabet = /[A-Z]/.test(password)
        ?
        <span className='text-gray-900'><IoCheckmarkCircle className='inline' /></span>
        :
        <span className='text-gray-400'><IoCheckmarkCircle className='inline' /></span>
    return (
        <div className={`relative transition-width duration-200 opacity-0 ${isPasswordTyping ? "h-[60px] opacity-100" : "h-0"}`}>
            <div className={`text-gray-800 text-sm italic pt-1 absolute`}>
                <div className='' />
                <div className='flex flex-row'>
                    <div className='px-1'>{passwordCount} {" "}</div>
                    <div>8 characters minimum</div>
                </div>
                <div className='flex flex-row'>
                    <div className='px-1'>{upperAlphabet} {" "}</div>
                    <div>Must include a capital letter</div>
                </div>
                <div className='flex flex-row'>
                    <div className='px-1'>{numericValue} {" "}</div>
                    <div>Must include a number</div>
                </div>

            </div>
        </div>

    )
}
