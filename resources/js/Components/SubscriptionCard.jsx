import PrimaryButton from "./PrimaryButton";

export default function SubscriptionCard({
    id = undefined,
    name = "Basic",
    price = 299000,
    durationInMonths = 3,
    features = [],
    isPremium = false,
    onSelectSubscription,
}) {
    const formattedPrice = `IDR ${price.toLocaleString("id-ID")}`;
    
    return (
        <div className={`flex flex-col gap-[30px] py-[30px] px-7 outline outline-1 outline-[#F1F1F1] rounded-[26px] w-[300px] ${isPremium ? 'text-white bg-black' : 'text-black h-[max-content]'}`}>
            {/* Ornament Icon - Only for Premium */}
            {isPremium && (
                <div className="bg-alerange rounded-full p-[13px] max-w-max">
                    <img src="/icons/ic_star.svg" width="24" alt="" />
                </div>
            )}
            
            {/* Top Content: Name-Price */}
            <div>
                <div className="text-sm mb-2">{name}</div>
                <div className="text-[28px] font-bold">{formattedPrice}</div>
                <p className={`text-xs font-light ${isPremium ? 'text-[#767676]' : 'text-gray-1'}`}>
                    /{durationInMonths} months
                </p>
            </div>

            {/* Mid Content: Benefits */}
            <div className="flex flex-col gap-4">
                {features.map((feature, index) => (
                    <div
                        className="flex items-center gap-2"
                        key={`${index}-${id}-${feature}`}
                    >
                        {isPremium ? (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.4402 12.0001L10.8142 14.3731L15.5602 9.62708"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.7498 12.0001C2.7498 18.9371 5.0628 21.2501 11.9998 21.2501C18.9368 21.2501 21.2498 18.9371 21.2498 12.0001C21.2498 5.06312 18.9368 2.75012 11.9998 2.75012C5.0628 2.75012 2.7498 5.06312 2.7498 12.0001Z"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <img src="/icons/ic_tick.svg" alt="" />
                        )}
                        <span className="text-sm">{feature}</span>
                    </div>
                ))}
            </div>

            {/* Bottom: CTA Button */}
            <div>
                <PrimaryButton
                    className={`rounded-2xl py-[13px] text-center grid`}
                    type="button"
                    variant={isPremium ? 'alerange' : 'light'}
                    onClick={() =>
                        onSelectSubscription?.({
                            id,
                            name,
                            price,
                            durationInMonths,
                            features,
                            isPremium,
                        })
                    }
                >
                    <span className={`text-base ${isPremium ? 'font-semibold' : ''}`}>
                        {isPremium ? 'Subscribe Now' : `Start ${name}`}
                    </span>
                </PrimaryButton>
            </div>
        </div>
    );
}
