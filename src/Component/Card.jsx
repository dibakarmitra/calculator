import { useState } from 'react';
import { FaBackspace, FaEquals, FaPlus, FaMinus, FaTimes, FaDivide } from 'react-icons/fa';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberClick = (number) => {
    setDisplay(prevDisplay => 
      prevDisplay === '0' ? number.toString() : prevDisplay + number
    );
  };

  const handleOperatorClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const calculateResult = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentValue = parseFloat(display);
      let result;

      switch (operator) {
        case '+':
          result = previousValue + currentValue;
          break;
        case '-':
          result = previousValue - currentValue;
          break;
        case '*':
          result = previousValue * currentValue;
          break;
        case '/':
          result = previousValue / currentValue;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setPreviousValue(null);
      setOperator(null);
      setIsLoading(false);
    }, 300);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
  };

  const handleBackspace = () => {
    setDisplay(prevDisplay => 
      prevDisplay.length > 1 ? prevDisplay.slice(0, -1) : '0'
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-2 bg-blue-500 z-50"></div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all hover:scale-105">
          <div className="p-8">
            <div className="details space-y-3">
              <div className="display bg-gray-100 rounded-lg p-4 text-right text-3xl font-bold mb-6">
                {display}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button 
                  onClick={clearDisplay} 
                  className="bg-red-500 text-white rounded-lg p-4 col-span-2"
                >
                  Clear
                </button>
                <button 
                  onClick={handleBackspace} 
                  className="bg-gray-300 rounded-lg p-4"
                >
                  <FaBackspace />
                </button>
                <button 
                  onClick={() => handleOperatorClick('/')} 
                  className="bg-gray-300 rounded-lg p-4"
                >
                  <FaDivide />
                </button>

                {[7, 8, 9].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumberClick(num)} 
                    className="bg-blue-100 rounded-lg p-4"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={() => handleOperatorClick('*')} 
                  className="bg-gray-300 rounded-lg p-4"
                >
                  <FaTimes />
                </button>

                {[4, 5, 6].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumberClick(num)} 
                    className="bg-blue-100 rounded-lg p-4"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={() => handleOperatorClick('-')} 
                  className="bg-gray-300 rounded-lg p-4"
                >
                  <FaMinus />
                </button>

                {[1, 2, 3].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumberClick(num)} 
                    className="bg-blue-100 rounded-lg p-4"
                  >
                    {num}
                  </button>
                ))}
                <button 
                  onClick={() => handleOperatorClick('+')} 
                  className="bg-gray-300 rounded-lg p-4"
                >
                  <FaPlus />
                </button>

                <button 
                  onClick={() => handleNumberClick(0)} 
                  className="bg-blue-100 rounded-lg p-4 col-span-2"
                >
                  0
                </button>
                <button 
                  onClick={() => handleNumberClick('.')} 
                  className="bg-blue-100 rounded-lg p-4"
                >
                  .
                </button>
                <button 
                  onClick={calculateResult} 
                  className={`bg-blue-500 text-white font-semibold transition-colors duration-300 rounded-lg p-4
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Calculating...' : <FaEquals />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-blue-500 z-50"></div>
    </>
  );
};

Calculator.displayName = 'Calculator';
export default Calculator;