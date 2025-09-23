import { useState, useRef } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Topbar() {
  const [dropdownOpen, setDropdown] = useState(false);
  const dropdownTarget = useRef();

  // PANGGIL HOOK DI DALAM KOMPONEN (BUKAN DI LUAR)
  const { auth } = usePage().props;
  const userName = auth?.user?.name ?? "User";

  const { post } = useForm({});
  const handleLogout = () => post(route("logout"));

  const triggerDropdown = () => {
    setDropdown(prev => {
      const next = !prev;
      if (dropdownTarget.current) {
        next
          ? dropdownTarget.current.classList.remove("hidden")
          : dropdownTarget.current.classList.add("hidden");
      }
      return next;
    });
  };

  return (
    <>
      <div className="flex justify-between items-center cursor-pointer">
        <input
          type="text"
          className="top-search"
          placeholder="Search movie, cast, genre"
          style={{ backgroundImage: "url('/icons/ic_search.svg')" }}
        />

        <div className="flex items-center gap-4">
          <span className="text-black text-sm font-medium">
            Welcome, {userName}
          </span>

          <div className="collapsible-dropdown flex flex-col gap-2 relative">
            <div
              className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
              onClick={triggerDropdown}
            >
              <img src="/images/avatar.png" className="rounded-full object-cover w-full" alt="" />
            </div>

            <div
              className="bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] hidden overflow-hidden"
              ref={dropdownTarget}
            >

              <Link href={route("prototype.dashboard")} className="transition-all hover:bg-sky-100 p-4">
                Dashboard
              </Link>

              <Link href={route("prototype.dashboard")} className="transition-all hover:bg-sky-100 p-4">
                Settings
              </Link>

              <button onClick={handleLogout} className="text-left transition-all hover:bg-sky-100 p-4">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}