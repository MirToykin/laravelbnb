<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookableReviewIndexResource;
use App\Models\Bookable;
use Illuminate\Http\Request;

class BookableReviewsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $bookable = Bookable::findOrFail($id);
//        if (!isset($bookable)) return response()->json([], 404);
        return BookableReviewIndexResource::collection($bookable->reviews()->latest()->get());
    }
}
