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
                'name' => 'The Batman In Love',
                'slug' => 'the-batman-in-love',
                'category' => 'Romance • Action',
                'video_url' => 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Big Buck Bunny - Video yang reliable
                'thumbnail' => 'https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'rating' => 5,
                'is_featured' => true,
            ],
            [
                'name' => 'Spider-Man: No Way Home',
                'slug' => 'spider-man-no-way-home',
                'category' => 'Action • Adventure',
                'video_url' => 'https://www.youtube.com/watch?v=JfVOs4VSpmA', // Spider-Man Trailer
                'thumbnail' => 'https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'rating' => 4.8,
                'is_featured' => false,
            ],
            [
                'name' => 'The Matrix Resurrections',
                'slug' => 'the-matrix-resurrections',
                'category' => 'Sci-Fi • Action',
                'video_url' => 'https://www.youtube.com/watch?v=9ix7TUGVYIo', // Matrix Trailer
                'thumbnail' => 'https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'rating' => 4.5,
                'is_featured' => true,
            ]
        ];

        Movie::insert($movies);
    }
}
