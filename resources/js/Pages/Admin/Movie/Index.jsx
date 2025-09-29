import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Authenticated";
import { Link, usePage } from "@inertiajs/react";

export default function Index({ auth }) {
    const { flash } = usePage().props;
    return (
        <Authenticated auth={auth}>
            <Link href={route("admin.dashboard.movie.create")}>
                <PrimaryButton type="button" className="w-40 mb-8">
                    Insert New Movie
                </PrimaryButton>
            </Link>
            {flash?.success && (
                <div className="mt-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
                    {flash.success}
                </div>
            )}
        </Authenticated>
    );
}
