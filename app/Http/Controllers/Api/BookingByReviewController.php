<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingByReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $review_key
     * @return \Illuminate\Http\Response
     */
    public function __invoke($review_key, Request $request)
    {
        return Booking::findBookingByReviewKey($review_key) ?? abort(404);
    }
}
