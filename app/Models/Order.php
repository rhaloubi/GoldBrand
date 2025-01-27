<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'total_price',
        'customer_name',
        'customer_email',
        'customer_address'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
