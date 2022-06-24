type FilterListProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
};

export default function FilterList({ name, label, options }: FilterListProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
        <option value="studio">Studio</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}
