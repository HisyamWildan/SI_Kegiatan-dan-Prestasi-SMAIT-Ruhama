<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        $adminId = DB::table('users')->insertGetId([
            'name' => 'Admin',
            'email' => 'admin123@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $guruId = DB::table('users')->insertGetId([
            'name' => 'Guru',
            'email' => 'guru123@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'guru',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $siswaId = DB::table('users')->insertGetId([
            'name' => 'Siswa',
            'email' => 'siswa123@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'siswa',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        // 2. Categories
        $categories = [
            ['name' => 'Keagamaan', 'type' => 'kegiatan'],
            ['name' => 'Leadership', 'type' => 'kegiatan'],
            ['name' => 'Seni dan Budaya', 'type' => 'kegiatan'],
            ['name' => 'Nasional', 'type' => 'kegiatan'],
            ['name' => 'Akademik', 'type' => 'prestasi'],
            ['name' => 'Non-Akademik', 'type' => 'prestasi'],
            ['name' => 'Hafalan Al-Qur’an', 'type' => 'prestasi'],
            ['name' => 'Organisasi Eksternal', 'type' => 'prestasi'],
        ];

        $categoryIds = [];
        foreach ($categories as $cat) {
            $id = DB::table('categories')->insertGetId(array_merge($cat, [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]));
            $categoryIds[$cat['name']] = $id;
        }

        // 3. Kegiatan
        DB::table('kegiatan')->insert([
            [
                'title' => 'Muharram',
                'date' => '2026-01-10',
                'location' => 'Aula SMAIT Ruhama Depok',
                'description' => 'Kegiatan tahun baru Islam yang diisi dengan tausyiah, santunan, dan lomba rangking 1.',
                'image' => null,
                'categories_id' => $categoryIds['Keagamaan'],
                'users_id' => $guruId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Leadership Camp Ruhama',
                'date' => '2026-02-15',
                'location' => 'Luar Sekolah',
                'description' => 'Kegiatan pembinaan kepemimpinan siswa untuk melatih rasa percaya diri.',
                'image' => null,
                'categories_id' => $categoryIds['Leadership'],
                'users_id' => $guruId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

        // 4. Prestasi
        DB::table('prestasi')->insert([
            [
                'title' => 'Hafalan Al-Qur’an 20 Juz',
                'student_name' => 'Muhammad Azhar Al Zayed',
                'class_name' => 'X',
                'achievement_level' => 'Sekolah',
                'date' => '2026-01-20',
                'location' => 'SMAIT Ruhama Depok',
                'description' => 'Pencapaian hafalan Al-Qur’an sebanyak 20 juz.',
                'image' => null,
                'status' => 'approved',
                'categories_id' => $categoryIds['Hafalan Al-Qur’an'],
                'users_id' => $guruId,
                'verified_by' => $guruId,
                'verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Bendahara FOSIT',
                'student_name' => 'Dimitri Putranto',
                'class_name' => 'XII',
                'achievement_level' => 'Organisasi Eksternal',
                'date' => '2026-02-05',
                'location' => 'Forum OSIS Sekolah Islam Terpadu',
                'description' => 'Siswa SMAIT Ruhama aktif dalam FOSIT.',
                'image' => null,
                'status' => 'pending',
                'categories_id' => $categoryIds['Organisasi Eksternal'],
                'users_id' => $siswaId,
                'verified_by' => null,
                'verified_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
