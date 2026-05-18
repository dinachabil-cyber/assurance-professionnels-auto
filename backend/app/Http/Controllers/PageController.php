<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
 

    
    public function confirmation(): View
    {
        return view('confirmation');
    }

    public function mentionsLegales(): View
    {
        return view('pages.mentions-legales');
    }

    public function politiqueConfidentialite(): View
    {
        return view('pages.politique-confidentialite');
    }
}