<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = "blog";

    protected $fillable = [
        'id',
        'title',
        'author',
        'thumbnail',
        'content',
        'created_at',
        'updated_at'
    ];
}
