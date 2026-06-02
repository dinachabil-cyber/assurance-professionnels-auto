<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConfirmationController extends AbstractController
{
    #[Route('/devis/{id}/confirmation', name: 'app_confirmation')]
    public function index(int $id): Response
    {
        return $this->render('confirmation/index.html.twig', [
            'id' => $id,
        ]);
    }
}