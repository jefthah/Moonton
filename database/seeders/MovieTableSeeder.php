<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = [
            [
                'name' => 'Movie 1',
                'slug' => 'movie-1',
                'category' => 'category 1',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => 'https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'rating' => 5,
                'is_featured' => true,
            ],
            [
                'name' => 'Movie 2',
                'slug' => 'movie-2',
                'category' => 'category 2',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                'rating' => 4,
                'is_featured' => false,
            ],
            [
                'name' => 'Movie 3',
                'slug' => 'movie-3',
                'category' => 'category 3',
                'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'thumbnail' => 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                'rating' => 3,
                'is_featured' => false,
            ]
        ];

        Movie::insert($movies);
    }
}
