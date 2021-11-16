<?php

use App\Models\Bookable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('bookables', 'Api\BookableController')->only(['index', 'show']);
Route::get('bookables/{bookable}/availability', 'Api\BookableAvailabilityController')->name('bookables.bookable.availability');
Route::get('bookables/{bookable}/price', 'Api\BookablePriceController')->name('bookables.bookable.price');
Route::get('bookables/{bookable}/reviews', 'Api\BookableReviewsController')->name('bookable.reviews.index');
Route::apiResource('reviews', 'Api\ReviewController')->only(['show', 'store']);
Route::get('booking-by-review/{review_key}', 'Api\BookingByReviewController')->name('booking.by-review.show');
Route::post('checkout', 'Api\CheckoutController')->name('checkout');
