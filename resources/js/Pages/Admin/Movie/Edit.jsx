import InputLabel from "@/Components/InputLabel";
import ValidationErrors from "@/Components/ValidationErrors";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from "@inertiajs/react";
import { useState, useMemo } from "react";
import Checkbox from "@/Components/Checkbox";

export default function Create({ auth, movie }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        ...movie,
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const cacheBust = useMemo(() => {
        return movie?.updated_at ? new Date(movie.updated_at).getTime() : Date.now();
    }, [movie]);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );

        if (event.target.type === "file") {
            const file = event.target.files && event.target.files[0];
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
            } else {
                setPreviewUrl(null);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        transform((current) => {
            const payload = { ...current };
            if (!(payload.thumbnail instanceof File)) {
                delete payload.thumbnail;
            }
            return { ...payload, _method: "PUT" };
        });
        post(route("admin.dashboard.movie.update", movie.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl">Update Movie : {movie.name}</h1>
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
                {previewUrl ? (
                    <img src={previewUrl} alt={movie.name} className="w-32 rounded-md" />
                ) : (
                    <img src={`/storage/${movie.thumbnail}?v=${cacheBust}`} alt={movie.name} className="w-32 rounded-md" />
                )}
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
                    checked={!!data.is_featured}
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
