<?php

namespace App\Controller;

use App\Entity\LoueurDevi;
use App\Form\LoueurDeviType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class LoueurDevisController extends AbstractController
{
    #[Route('/loueur-voiture', name: 'app_loueur')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $loueurDevi = new LoueurDevi();
        $form = $this->createForm(LoueurDeviType::class, $loueurDevi, [
            'action' => $this->generateUrl('api_loueur_devi_store'),
        ]);

        return $this->render('loueur/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/api/v1/loueur-devis', name: 'api_loueur_devi_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $loueurDevi = new LoueurDevi();
        $form = $this->createForm(LoueurDeviType::class, $loueurDevi);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($loueurDevi);
            $entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande de devis loueur a bien été enregistrée.',
                'data' => [
                    'id' => $loueurDevi->getId(),
                ],
            ], 201);
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return $this->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $errors,
        ], 422);
    }
}