export default function SubscriptionDetail({name, isPremium, remainingActiveDays, activeDays }) {
    const totalDays = Number(activeDays) || 0;
    const remaining = Number(remainingActiveDays) || 0;
    // Progress menunjukkan sisa hari terhadap total hari; makin kecil saat mendekati expired
    const progressPercent = totalDays > 0 ? Math.min(Math.round((remaining / totalDays) * 100), 100) : 0;

    return (
        <>
            {/* Basic / Premium detail */}
            {!isPremium ? (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-white rounded-[25px] outline outline-1 outline-[#f1f1f1]">
                        <div className="text-black text-lg font-semibold mb-8">{name}</div>
                        <div className="text-black text-sm mb-2">{remainingActiveDays} of {activeDays} hari</div>
                        <div className="rounded-full w-full h-[6px] bg-[#f1f1f1]">
                            <div className="rounded-full h-full bg-alerange" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-auto pr-[30px]">
                    <div className="p-5 bg-black rounded-[25px]">
                        <img src="/icons/ic_star-rounded.svg" alt="" />
                        <div className="text-white text-lg font-semibold mt-4 mb-8">{name}</div>
                        <div className="text-white text-sm mb-2">{remainingActiveDays} of {activeDays} hari</div>
                        <div className="rounded-full w-full h-[6px] bg-[#333333]">
                            <div className="rounded-full h-full bg-alerange" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
