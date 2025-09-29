import { Link } from "@inertiajs/react";
import SubscriptionDetail from "./SubscriptionDetail";
import { UserMenu, UserOthers } from "./MenuList";
import MenuItem from "./MenuItem";

export default function Sidebar({ auth }) {
    return (
        <>
            {/* START: Sidebar */}
            <aside className="fixed z-50 w-[300px] h-full">
                <div className="flex flex-col p-[30px] pr-0 border-r border-[#F1F1F1] overflow-y-auto h-full">
                    <a href="/">
                        <img src="/images/moonton.svg" alt="" />
                    </a>
                    <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                        {/* Menu */}
                        <div>
                            <div className="text-gray-1 text-sm mb-4">Menu</div>
                            {UserMenu.map((menu, index) => (
                                <MenuItem
                                    key={`${index}-${menu.text}`}
                                    link={menu.link}
                                    icon={menu.icon}
                                    text={menu.text}
                                    isActive={
                                        menu.link && route().current(menu.link)
                                    }
                                />
                            ))}
                        </div>
                        {/* ./Menu */}

                        {/* Others */}
                        <div>
                            <div className="text-gray-1 side-link mb-4">
                                Others
                            </div>
                            {UserOthers.map((menu, index) => (
                                <MenuItem
                                    key={`${index}-${menu.text}`}
                                    link={menu.link}
                                    icon={menu.icon}
                                    text={menu.text}
                                    isActive={
                                        menu.link && route().current(menu.link)
                                    }
                                    method={menu.method}
                                />
                            ))}
                        </div>
                        {/* ./Others */}

                        {/* Subscription details (hide on admin pages) */}
                        {!route().current('admin.*') && (() => {
                            const plan = auth?.activePlan || null;
                            const name = plan?.name || "Basic";
                            const activeDays = plan?.activeDays ?? 30;
                            const remainingActiveDays = plan?.remainingActiveDays ?? 0;

                            return (
                                <SubscriptionDetail
                                    name={name}
                                    isPremium={name === "Premium"}
                                    remainingActiveDays={remainingActiveDays}
                                    activeDays={activeDays}
                                />
                            );
                        })()}
                        {/* ./Subscription details */}
                    </div>
                </div>
            </aside>
            {/* END: Sidebar */}
        </>
    );
}
