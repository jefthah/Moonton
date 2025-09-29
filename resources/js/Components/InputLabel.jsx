export default function InputLabel({
    value,
    className = '',
    children,
    forInput,
    htmlFor,
    ...props
}) {
    return (
        <label
            {...props}
            htmlFor={htmlFor ?? forInput}
            className={
                `block text-sm font-medium text-gray-700 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
