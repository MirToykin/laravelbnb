<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['id', 'content', 'rating'];

    public function bookable() {
        $this->belongsTo(Bookable::class);
    }

    public function booking() {
        $this->belongsTo(Booking::class);
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
