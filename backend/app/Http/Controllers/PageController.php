<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
    public function welcome(): View
    {
        return view('welcome');
    }

    public function devis(): View
    {
        return view('devis');
    }

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