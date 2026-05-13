<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Parametre;
use Illuminate\Http\Request;

class ParametreController extends Controller
{
    public function show(string $cle)
    {
        $parametre = Parametre::where('cle', $cle)->first();

        return response()->json([
            'success' => true,
            'data' => $parametre ? $parametre->valeur : null,
        ]);
    }

    public function update(string $cle, Request $request)
    {
        $request->validate([
            'valeur' => 'required',
            'type' => 'sometimes|in:string,integer,float,boolean,json',
        ]);

        $parametre = Parametre::updateOrCreate(
            ['cle' => $cle],
            [
                'valeur' => $request->input('valeur'),
                'type' => $request->input('type', 'string'),
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $parametre->valeur,
        ]);
    }
}