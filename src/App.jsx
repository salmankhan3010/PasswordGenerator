import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "012346789";
    if (charAllowed) str += "~`!@#$%^&*()-_+={}[]";

    for (let i = 1; i <= length; i++) {
      let passIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(passIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className=" w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className=" text-white text-center mt-4 mb-1 mx-4 text-xl rounded-lg">Random Password Generator</h1>
        <div className="flex shadow-md shadow-gray-600 rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0 text-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 justify-evenly">
          <div className="flex items-center gap-x-2 mb-3 ">
            <input
              type="range"
              min={6}
              max={80}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-lg">Length ({length})</label>
          </div>
          <div className="flex items-center gap-x-2 mb-3">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-lg">Number</label>
          </div>
          <div className="flex items-center gap-x-2 mb-3">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-lg">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
