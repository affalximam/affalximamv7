<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'project';

    protected $fillable = [
        'id',
        'name',
        'images',
        'description',
        'preview_link',
        'github_link'
    ];
}
