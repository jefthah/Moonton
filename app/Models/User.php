<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function getIsActiveAttribute()
    {
        $latest = $this->lastActiveUserSubscription;
        if (!$latest) {
            return false;
        }
        $dateNow = Carbon::now();
        $dateExpired = $latest->expired_date instanceof Carbon
            ? $latest->expired_date
            : Carbon::parse($latest->expired_date);
        return $dateNow->lessThanOrEqualTo($dateExpired);
    }

    public function lastActiveUserSubscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)
            ->where('payment_status', 'success')
            ->latest();
    }
}
