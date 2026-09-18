import { useEffect, useState } from "react";

const colors = {
  red: 'bg-red-500 animate-pulse',
  yellow: 'bg-yellow-500 animate-pulse',
  green: 'bg-green-500 animate-pulse'
}

const useTrafficLight = () => {

    const [light, setlight] = useState('red');
    const [countDown, setcountDown] = useState(5)

    // CountDown Effect
    useEffect(() => {
        if (countDown === 0) return;
        const intervalId = setInterval(() => {
            setcountDown((prev) => prev - 1)
        }, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, [countDown])

    useEffect(() => {
        if (countDown > 0) return;

        if (countDown === 0) {
            setcountDown(5);

            if (light === 'red') {
                setlight('green');
                return;
            }

            if (light === 'yellow') {
                setlight('red');
                return;
            }

            if (light === 'green') {
                setlight('yellow');
                return;
            }
        }

    }, [countDown, light])

    return {
        countDown,
        light,
        colors, 

        // computed
        percentage: (countDown/5) * 100,
        greenLight: light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
        redLight: light === 'red' ? colors.red : 'bg-gray-500',
    }
}

export default useTrafficLight