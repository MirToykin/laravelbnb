<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    public function bookings() {
        return $this->hasMany(Booking::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function availableFor($form, $to) {
        return 0 === $this->bookings()->betweenDates($form, $to);
    }

    public function priceFor($form, $to) {
        $days = Carbon::parse($form)->diffInDays(Carbon::parse($to)) + 1;
        $totalPrice = $days * $this->price;

        return [
                'total' => $totalPrice,
                'breakdown' => [
                    $this->price => $days
                ]
        ];
    }
}
