<?php

namespace App\Controller;

use App\Entity\Devi;
use App\Form\DeviType;
use App\Service\DevisService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(Request $request, DevisService $devisService): Response
    {
        $devi = new Devi();
        $form = $this->createForm(DeviType::class, $devi, [
            'action' => $this->generateUrl('app_devi_store'),
        ]);

        return $this->render('home/index.html.twig', [
            'form' => $form,
        ]);
    }
}