interface NumberInputProps {
    id: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: number;
    step?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
                                                     id,
                                                     label,
                                                     placeholder,
                                                     value,
                                                     onChange,
                                                     required = false,
                                                     min,
                                                     step,
                                                 }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
            {label}
        </label>
        <input
            type="number"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            step={step}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
            required={required}
        />
    </div>
);

export default NumberInput;
