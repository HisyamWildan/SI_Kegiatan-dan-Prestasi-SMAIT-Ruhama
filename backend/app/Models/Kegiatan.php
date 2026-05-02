<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatan';

    protected $fillable = [
        'title',
        'date',
        'location',
        'description',
        'image',
        'image2',
        'image3',
        'categories_id',
        'users_id',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categorie::class, 'categories_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
