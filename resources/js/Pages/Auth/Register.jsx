import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import ValidationErrors from "@/Components/ValidationErrors";
import { Link, Head, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Sign Up
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                            <ValidationErrors errors={errors} />
                        </div>
                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <InputLabel
                                        forInput="name"
                                        value="Full Name"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-alerange"
                                        placeholder="Your fullname..."
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        forInput="email"
                                        value="Email Address"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-alerange"
                                        placeholder="Your Email Address"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        forInput="password"
                                        value="Password"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-alerange"
                                        placeholder="Your Password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        forInput="password_confirmation"
                                        value="Password Confirmation"
                                    />
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className="rounded-2xl bg-form-bg py-[13px] px-7 w-full focus:outline-none focus:ring-0 focus:border-2 focus:border-alerange"
                                        placeholder="Confirm your password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    variant="alerange"
                                >
                                    <span className="text-base font-semibold">
                                        Sign Up
                                    </span>
                                </PrimaryButton>

                                <Link href={route("login")}>
                                    <PrimaryButton
                                        type="button"
                                        variant="white"
                                    >
                                        <span className="text-base group-hover:text-black">
                                            Sign In to My Account
                                        </span>
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
