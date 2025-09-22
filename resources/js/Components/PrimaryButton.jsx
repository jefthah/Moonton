export default function PrimaryButton({
    className = '',
    disabled,
    children,
    variant = 'alerange',
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center rounded-2xl py-[13px] px-4 text-base font-semibold transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 w-full';
    
    const variantClasses = {
        alerange: 'bg-alerange text-white hover:bg-orange-600 focus:ring-alerange',
        white: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white group'
    };
    
    const disabledClasses = disabled ? 'opacity-25 cursor-not-allowed' : '';
    
    return (
        <button
            {...props}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
