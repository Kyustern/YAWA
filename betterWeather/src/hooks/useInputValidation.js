import { useState } from 'react';

const useInputValidation = (verifierFunc, initialValue, defaultBool) => {

    const [currentValue, setCurrentValue] = useState(initialValue)
    const [isValid, setIsValid] = useState(defaultBool)

    const binding = {
        value: currentValue,
        onChange: e => { verifierFunc(e.target.value, setCurrentValue, setIsValid) }
    }

    return [
        isValid,
        binding,
        setCurrentValue,
        setIsValid
    ]
}

export default useInputValidation