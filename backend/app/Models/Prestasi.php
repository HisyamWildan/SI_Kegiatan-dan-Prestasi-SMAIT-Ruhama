<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prestasi extends Model
{
    use HasFactory;

    protected $table = 'prestasi';

    protected $fillable = [
        'title',
        'student_name',
        'class_name',
        'achievement_level',
        'date',
        'location',
        'description',
        'image',
        'image2',
        'image3',
        'certificate',
        'status',
        'categories_id',
        'users_id',
        'verified_by',
        'verified_at',
        'rejection_message',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Categorie::class, 'categories_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
