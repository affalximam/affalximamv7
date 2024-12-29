<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'services';

    protected $fillable = [
        'id',
        'name',
        'icons',
        'description',
        'whatsapp',
        'telegram',
        'instagram',
    ];
}
