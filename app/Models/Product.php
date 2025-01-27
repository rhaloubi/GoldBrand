<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'cost_price', // Added cost_price to fillable fields
        'size',
        'category',
        'markname',
        'stock_status',
        'discount',
        'gender',
        'quantity'
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function wishlist()
    {
        return $this->hasMany(Wishlist::class);
    }
}
