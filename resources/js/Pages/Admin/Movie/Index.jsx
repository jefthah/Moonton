import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Index({ auth, movies }) {
    const { delete: destroy, put } = useForm();

    const { flash } = usePage().props;
    return (
        <Authenticated auth={auth}>
            <Head title="List of Movies" />
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
            <table className="table-fixed w-full text-center">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img
                                    src={`/storage/${movie.thumbnail}`}
                                    className="w-32 rounded-md"
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{Number(movie.rating).toFixed(1)}</td>
                            <td>
                                <Link
                                    href={route(
                                        "admin.dashboard.movie.edit",
                                        movie.id
                                    )}
                                >
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Edit
                                    </button>
                                </Link>
                            </td>
                            <td>
                                <div
                                    onClick={() => {
                                        movie.deleted_at ? put(route("admin.dashboard.movie.restore", movie.id)) : 
                                        destroy(
                                            route(
                                                "admin.dashboard.movie.destroy",
                                                movie.id
                                            )
                                        );
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        {movie.deleted_at ? "Restore" : "Delete"}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
