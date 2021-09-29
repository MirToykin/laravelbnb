<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['from', 'to'];

    public function bookable() {
        return $this->belongsTo(Bookable::class);
    }
}
