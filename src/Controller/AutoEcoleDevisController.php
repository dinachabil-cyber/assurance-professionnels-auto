<?php

namespace App\Controller;

use App\Entity\AutoEcoleDevi;
use App\Form\AutoEcoleDeviType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class AutoEcoleDevisController extends AbstractController
{
    #[Route('/auto-ecole', name: 'app_auto_ecole')]
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $autoEcoleDevi = new AutoEcoleDevi();
        $form = $this->createForm(AutoEcoleDeviType::class, $autoEcoleDevi, [
            'action' => $this->generateUrl('api_auto_ecole_devi_store'),
        ]);

        return $this->render('autoecole/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/api/v1/auto-ecole-devis', name: 'api_auto_ecole_devi_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $autoEcoleDevi = new AutoEcoleDevi();
        $form = $this->createForm(AutoEcoleDeviType::class, $autoEcoleDevi);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($autoEcoleDevi);
            $entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande de devis auto-école a bien été enregistrée.',
                'data' => [
                    'id' => $autoEcoleDevi->getId(),
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