export default function InputBox({ label, placeholder, onChange }) {
  return (
    <div className="pb-3">
      <div className="text-left font-semibold pl-3 pt-3 pb-.25">{label}</div>
      <input
        onChange={onChange}
        type="text"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder={placeholder}
      />
    </div>
  );
}
