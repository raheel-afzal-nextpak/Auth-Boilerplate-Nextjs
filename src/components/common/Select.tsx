export const Select = ({
    options,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) => (
    <select {...props}>
        {options.map((option, index) => (
            <option
                key={index}
                value={option}
            >
                {option}
            </option>
        ))}
    </select>
)
