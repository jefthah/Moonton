import InputLabel from "@/Components/InputLabel";
import ValidationErrors from "@/Components/ValidationErrors";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.dashboard.movie.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - create movie" />
            <h1 className="text-xl">Insert New Movie</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit} encType="multipart/form-data">
                <InputLabel forInput="name" value="Name" />
                <TextInput
                    type="text"
                    name="name"
                    onChange={onHandleChange}
                    placeholder="Enter movie name"
                    className="w-full rounded-2xl border border-alerange focus:border-alerange focus:ring-0"
                    value={data.name}
                />
                <InputLabel
                    forInput="category"
                    value="Category"
                    className="mt-4"
                />
                <TextInput
                    type="text"
                    name="category"
                    onChange={onHandleChange}
                    placeholder="Enter movie category"
                    className="w-full rounded-2xl border border-alerange focus:border-alerange focus:ring-0"
                    value={data.category}
                />
                <InputLabel
                    forInput="video_url"
                    value="Video URL"
                    className="mt-4"
                />
                <TextInput
                    type="url"
                    name="video_url"
                    onChange={onHandleChange}
                    placeholder="Enter movie video URL"
                    className="w-full rounded-2xl border border-alerange focus:border-alerange focus:ring-0"
                    value={data.video_url}
                />
                <InputLabel forInput="thumbnail" value="Thumbnail" className="mt-4" />
                <TextInput
                    type="file"
                    name="thumbnail"
                    onChange={onHandleChange}
                    className="w-full rounded-2xl border border-alerange focus:border-alerange focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-alerange file:text-white hover:file:bg-orange-500"
                    placeholder="Upload movie thumbnail"
                />
                <InputLabel
                    forInput="rating"
                    value="Rating"
                    className="mt-4"
                />
                <TextInput
                    type="number"
                    name="rating"
                    onChange={onHandleChange}
                    placeholder="Enter movie rating"
                    className="w-full rounded-2xl border border-alerange focus:border-alerange focus:ring-0"
                    value={data.rating}
                />
                <div className="flex flex-row mt-4 items-center">
                <InputLabel
                    forInput="is_featured"
                    value="Is Featured"
                    className="mr-3 mt-1"
                />
                <Checkbox
                    name="is_featured"
                    onChange={(e) => setData("is_featured", e.target.checked)}
                    value={data.is_featured}
                />
                </div>
                <div className="mt-6">
                    <PrimaryButton type="submit" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Authenticated>
    );
}
