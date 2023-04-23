export default function InputField({
  onInput,
  placeholder,
  type = "text",
  maxlength = null,
}) {
  return (
    <div
      className={`flex items-center h-8 px-3 rounded-lg bg-gray-200 text-gray-800`}
    >
      <input
        className="outline-none text-sm w-full bg-transparent"
        type={type}
        maxlength={maxlength}
        placeholder={placeholder}
        onInput={onInput}
      />
    </div>
  );
}
