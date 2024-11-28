interface RadioInputProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    disabled: boolean;
    id: string;
    value: string;
}

export const RadioInput = ({ onChange, id, value, checked, disabled }: RadioInputProps) => {
    return (
        <input
            type="radio"
            id={id}
            name="personType"
            value={value}
            checked={checked}
            onChange={onChange}
            className={`mr-2 appearance-none h-4 w-4 border border-gray-300 rounded-full 
                        ${checked ? 'bg-primary-500 border-primary-500' : 'bg-white'}
                        checked:bg-primary-500 focus:ring-primary-500 focus:ring-2 focus:ring-offset-0
                        transition duration-200 ease-in-out hover:border-primary-500`}
            disabled={disabled}
        />
    );
};
