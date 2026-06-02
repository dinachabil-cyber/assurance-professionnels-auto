<?php

namespace App\Controller;

use App\Entity\GarageDevi;
use App\Form\GarageDeviType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class GarageDevisController extends AbstractController
{
    #[Route('/garage-automobile', name: 'app_garage')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $garageDevi = new GarageDevi();
        $form = $this->createForm(GarageDeviType::class, $garageDevi, [
            'action' => $this->generateUrl('api_garage_devi_store'),
        ]);

        return $this->render('garage/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/api/v1/garage-devis', name: 'api_garage_devi_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $garageDevi = new GarageDevi();
        $form = $this->createForm(GarageDeviType::class, $garageDevi);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($garageDevi);
            $entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande de devis garage a bien été enregistrée.',
                'data' => [
                    'id' => $garageDevi->getId(),
                    'nom' => $garageDevi->getNom(),
                    'prenom' => $garageDevi->getPrenom(),
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