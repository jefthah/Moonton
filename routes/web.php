<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/', 'prototype/login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('prototype')->name('prototype.')->group(function () {
    Route::get('/login', function (){
        return Inertia::render('Prototype/Login');
    })->name('login');
    Route::get('/register', function (){
        return Inertia::render('Prototype/Register');
    })->name('register');
    Route::get('/dashboard', function (){
        return Inertia::render('Prototype/Dashboard');
    })->name('dashboard');
    Route::get('/subscription', function (){
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('subscription');
    
});

require __DIR__.'/auth.php';
