<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Middleware;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    private function activePlan()
    {
        $user = Auth::user();
        if (!$user) {
            return null;
        }

        $activePlan = $user->lastActiveUserSubscription;
        if (!$activePlan) {
            return null;
        }

        // Load relasi jika belum di-load
        $activePlan->load('subscriptionPlan');

        $startAt = $activePlan->created_at; // Gunakan created_at sebagai tanggal mulai
        $expiredDate = $activePlan->expired_date;
        
        // Hitung total hari dan sisa hari berbasis tanggal (tanpa pecahan jam)
        $startDay = Carbon::parse($startAt)->startOfDay();
        $expiredDay = Carbon::parse($expiredDate)->startOfDay();
        $today = Carbon::now()->startOfDay();

        // Total hari mengikuti durasi plan (konstan), bukan mengikuti perubahan expired_date manual
        $planMonths = (int) optional($activePlan->subscriptionPlan)->active_period_in_months ?? 0;
        $endByPlan = (clone $startDay)->addMonths($planMonths);
        $activeDays = max($startDay->diffInDays($endByPlan), 0);
        $remainingActiveDays = $today->lessThanOrEqualTo($expiredDay)
            ? $today->diffInDays($expiredDay)
            : 0;

        return [
            'name' => $activePlan->subscriptionPlan->name,
            // 'isPremium' => optional($activePlan->subscriptionPlan)->name === 'Premium',
            'activeDays' => (int) $activeDays,
            'remainingActiveDays' => (int) $remainingActiveDays,
            // Debug info
            'debug' => [
                'subscription_plan_name' => $activePlan->subscriptionPlan->name,
                'created_at' => $startAt->toDateString(),
                'expired_date' => $expiredDate->toDateString(),
                'now' => Carbon::now()->toDateString(),
            ]
        ];
        
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'activePlan' => $this->activePlan(),
            ],
        ];
    }
}
