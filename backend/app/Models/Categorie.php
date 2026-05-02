<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type'];

    public function kegiatans(): HasMany
    {
        return $this->hasMany(Kegiatan::class, 'categories_id');
    }

    public function prestasis(): HasMany
    {
        return $this->hasMany(Prestasi::class, 'categories_id');
    }
}
