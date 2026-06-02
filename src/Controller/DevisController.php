<?php

namespace App\Controller;

use App\Entity\Devi;
use App\Form\DeviType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DevisController extends AbstractController
{
    #[Route('/api/v1/devis', name: 'api_devi_store', methods: ['POST'])]
    public function store(Request $request, EntityManagerInterface $entityManager): Response
    {
        $devi = new Devi();
        $form = $this->createForm(DeviType::class, $devi);
        $form->submit($request->request->all());

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($devi);
            $entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Votre demande de devis a bien été enregistrée.',
                'data' => [
                    'id' => $devi->getId(),
                    'nom' => $devi->getNom(),
                    'prenom' => $devi->getPrenom(),
                    'email' => $devi->getEmail(),
                    'telephone' => $devi->getTelephone(),
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

    #[Route('/api/v1/devis/{id}', name: 'api_devi_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $entityManager): Response
    {
        $devi = $entityManager->getRepository(Devi::class)->find($id);

        if (!$devi) {
            return $this->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        return $this->json([
            'success' => true,
            'data' => [
                'id' => $devi->getId(),
                'nom' => $devi->getNom(),
                'prenom' => $devi->getPrenom(),
                'email' => $devi->getEmail(),
                'telephone' => $devi->getTelephone(),
            ],
        ]);
    }
}