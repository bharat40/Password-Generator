import { useCallback, useEffect, useState, useRef } from "react";

const Generator = () => {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (symbolsAllowed) {
      str += "!@#$%^&*()_-+=|<,>?/";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, symbolsAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(Password);
    setCopy("✅Copied!");
    setTimeout(() => {
      setCopy("Copy");
    }, 2000);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, symbolsAllowed]);
  return (
    <>
      <div className="w-auto bg-gray-400 max-w-md p-4 m-4 rounded-md flex flex-col items-center gap-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={Password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="rounded-l-md p-2 text-violet-500 font-semibold outline-none"
          />
          <button
            className="px-4 py-1 bg-blue-600 text-white rounded-r-md shadow-xl active:bg-blue-700"
            onClick={copyPasswordToClipboard}
          >
            {copy}
          </button>
        </div>
        <div>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            className="cursor-pointer mx-2"
          />
          <label className="font-semibold">Length: {length}</label>
        </div>
        <div className="flex gap-7">
          <div>
            <input
              type="checkbox"
              className="cursor-pointer mx-2"
              onChange={() => {
                if (numbersAllowed == false) {
                  setNumbersAllowed(true);
                } else {
                  setNumbersAllowed(false);
                }
              }}
            />
            <label className="font-semibold">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              className="cursor-pointer mx-2"
              onChange={() => {
                if (symbolsAllowed == false) {
                  setSymbolsAllowed(true);
                } else {
                  setSymbolsAllowed(false);
                }
              }}
            />
            <label className="font-semibold">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generator;
