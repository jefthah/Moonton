export default function ValidationErrors({ errors }) {
    const messages = errors ? Object.values(errors).filter(Boolean) : [];

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="mb-4">
            <div className="font-medium text-red-600">Whoops! Something went wrong.</div>
            <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                {messages.map((message, idx) => (
                    <li key={idx}>{message}</li>
                ))}
            </ul>
        </div>
    );
}


