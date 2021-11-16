<?php

namespace App\Http\Controllers\Api;

use App\Models\Address;
use App\Http\Controllers\Controller;
use App\Models\Bookable;
use App\Models\Booking;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'bookings' => 'required|array|min:1',
            'bookings.*.bookable_id' => 'required|exists:bookables,id',
            'bookings.*.from' => 'required|date|after_or_equal:today',
            'bookings.*.to' => 'required|date|after_or_equal:bookings.*.from',
            'customer.first_name' => 'required|min:2',
            'customer.last_name' => 'required|min:2',
            'customer.email' => 'required|email',
            'customer.street' => 'required|min:2',
            'customer.city' => 'required|min:2',
            'customer.country' => 'required|min:2',
            'customer.state' => 'required|min:2',
            'customer.zip' => 'required|min:2',
        ]);

        $data = array_merge($data, $request->validate([
            'bookings.*' => ['required', function($attribute, $value, $fail) {
                $bookable = Bookable::findOrFail($value['bookable_id']);

                if(!$bookable->availableFor($value['from'], $value['to'])) {
                    $fail($bookable->title . ' is not available for provided dates');
                }
            }]
        ]));

        $bookingsData = $data['bookings'];
        $customerData = $data['customer'];

        $bookings = collect($bookingsData)->map(function($bookingData) use ($customerData) {
            $bookable = Bookable::findOrFail($bookingData['bookable_id']);
            $booking = new Booking();
            $booking->from = $bookingData['from'];
            $booking->to = $bookingData['to'];
            $booking->price = $bookable->priceFor($booking->from, $booking->to)['total'];
            $booking->bookable()->associate($bookable);
            $booking->address()->associate(Address::create($customerData));
            $booking->save();

            return $booking;

        });

        return response()->json($bookings);
    }
}
