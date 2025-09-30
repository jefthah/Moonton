<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use App\Models\Movie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;


class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::withTrashed()->orderBy('deleted_at')->get();
        return inertia('Admin/Movie/Index', [
            'movies' => $movies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Movie/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        /** @var Request $request */
        $data = $request->validated();
        if ($request->hasFile('thumbnail')) {
            /** @var UploadedFile $thumbnail */
            $thumbnail = $request->file('thumbnail');
            $data['thumbnail'] = $thumbnail->store('movies', 'public');
        }
        $data['slug'] = Str::slug($data['name']);
        $movie = Movie::create($data);

        return redirect()->route('admin.dashboard.movie.index')->with(['success' => 'Movie created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movie $movie)
    {
        return inertia('Admin/Movie/Edit', [
            'movie' => $movie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update $request, Movie $movie)
    {
        /** @var Request $request */
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            /** @var UploadedFile $thumbnail */
            $thumbnail = $request->file('thumbnail');

            if (!empty($movie->thumbnail) && Storage::disk('public')->exists($movie->thumbnail)) {
                Storage::disk('public')->delete($movie->thumbnail);
            }

            $data['thumbnail'] = $thumbnail->store('movies', 'public');
        }

        $data['slug'] = Str::slug($data['name']);

        $movie->update($data);

        return redirect()->route('admin.dashboard.movie.index')->with(['success' => 'Movie updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->delete();
        return redirect()->route('admin.dashboard.movie.index')->with(['success' => 'Movie deleted successfully']);
        return $movie;
    }

    public function restore($movie)
    {
        $model = Movie::withTrashed()->findOrFail($movie);
        $model->restore();
        return redirect()->route('admin.dashboard.movie.index')->with(['success' => 'Movie restored successfully']);
    }
}
