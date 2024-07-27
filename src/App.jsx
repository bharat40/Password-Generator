import Generator from "./Components/Generator";

function App() {
  return (
    <div className="bg-gray-900 w-full h-screen flex flex-col items-center gap-48">
      <h1 className="text-4xl text-white ">Password Generator</h1>
      <Generator />
    </div>
  );
}

export default App;
