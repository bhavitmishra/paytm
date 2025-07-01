export default function Appbar() {
  return (
    <div className="flex justify-between items-center px-4 py-2 text-black shadow-md">
      <div className="text-lg font-semibold">Paytm App</div>

      <div className="flex items-center gap-2">
        <span>Hello </span>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-cyan-800 flex items-center justify-center font-bold">
          <button className="cursor-pointer">
            {localStorage.getItem("username")[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
