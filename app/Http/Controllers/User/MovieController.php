<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function show ($slug)
    {
        $movie = Movie::where('slug', $slug)->firstOrFail();
        return inertia('User/Dashboard/Movie/Show', [
            'movie' => $movie,
        ]);
    }
}
